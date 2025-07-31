-- Migration: Create Jobs Table
-- Description: Creates the jobs table with all required fields, constraints, indexes, and triggers
-- Based on OpenAPI specification for Job schema
-- Author: JairoJobs Team
-- Date: 2025-01-27

-- Enable required extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create enum types if they don't exist
DO $$ BEGIN
    CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE remote_option AS ENUM ('on-site', 'hybrid', 'remote');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Core job information
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    
    -- Company information (keeping both for backward compatibility)
    company VARCHAR(255) NOT NULL,
    company_id VARCHAR(50),
    company_logo_url TEXT,
    
    -- Location and type
    location VARCHAR(255),
    type job_type,
    experience_level experience_level,
    remote_option remote_option,
    
    -- Salary information (JSONB for flexibility)
    salary JSONB,
    
    -- Arrays for requirements, responsibilities, benefits, and tags
    requirements TEXT[],
    responsibilities TEXT[],
    benefits TEXT[],
    tags TEXT[],
    
    -- Timestamps
    posted_at TIMESTAMP WITH TIME ZONE,
    application_deadline TIMESTAMP WITH TIME ZONE,
    
    -- Status and metrics
    applicants INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    
    -- Audit fields
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add constraints
ALTER TABLE jobs 
    ADD CONSTRAINT chk_jobs_company_id_pattern 
    CHECK (company_id IS NULL OR company_id ~ '^comp-[a-zA-Z0-9]+$'),
    
    ADD CONSTRAINT chk_jobs_salary_valid 
    CHECK (salary IS NULL OR (
        salary ? 'min' AND 
        salary ? 'max' AND 
        salary ? 'currency' AND 
        salary ? 'period' AND
        (salary->>'min')::numeric <= (salary->>'max')::numeric
    )),
    
    ADD CONSTRAINT chk_jobs_deadline_valid 
    CHECK (application_deadline IS NULL OR posted_at IS NULL OR application_deadline > posted_at),
    
    ADD CONSTRAINT chk_jobs_applicants_non_negative 
    CHECK (applicants >= 0);

-- Add foreign key constraint to companies table if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'companies') THEN
        ALTER TABLE jobs 
        ADD CONSTRAINT fk_jobs_company_id 
        FOREIGN KEY (company_id) REFERENCES companies(id) 
        ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);
CREATE INDEX IF NOT EXISTS idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX IF NOT EXISTS idx_jobs_remote_option ON jobs(remote_option);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(active);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_jobs_active_type_location ON jobs(active, type, location);
CREATE INDEX IF NOT EXISTS idx_jobs_featured_active_posted ON jobs(featured, active, posted_at);
CREATE INDEX IF NOT EXISTS idx_jobs_company_active ON jobs(company_id, active);

-- GIN indexes for arrays and JSONB
CREATE INDEX IF NOT EXISTS idx_jobs_requirements_gin ON jobs USING GIN(requirements);
CREATE INDEX IF NOT EXISTS idx_jobs_responsibilities_gin ON jobs USING GIN(responsibilities);
CREATE INDEX IF NOT EXISTS idx_jobs_benefits_gin ON jobs USING GIN(benefits);
CREATE INDEX IF NOT EXISTS idx_jobs_tags_gin ON jobs USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_jobs_salary_gin ON jobs USING GIN(salary);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_jobs_title_description_gin ON jobs USING GIN(
    to_tsvector('english', title || ' ' || COALESCE(description, ''))
);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_jobs_updated_at();

-- Add comments for documentation
COMMENT ON TABLE jobs IS 'Stores job listings with all required fields from OpenAPI specification';
COMMENT ON COLUMN jobs.id IS 'Unique identifier for the job (UUID)';
COMMENT ON COLUMN jobs.title IS 'The title of the job';
COMMENT ON COLUMN jobs.description IS 'The full description of the job';
COMMENT ON COLUMN jobs.company IS 'The name of the company posting the job (for backward compatibility)';
COMMENT ON COLUMN jobs.company_id IS 'Unique identifier for the company (pattern: comp-[a-zA-Z0-9]+)';
COMMENT ON COLUMN jobs.company_logo_url IS 'URL to the company logo';
COMMENT ON COLUMN jobs.location IS 'The location of the job';
COMMENT ON COLUMN jobs.type IS 'The type of employment (full-time, part-time, contract, internship)';
COMMENT ON COLUMN jobs.experience_level IS 'The required experience level (entry, mid, senior)';
COMMENT ON COLUMN jobs.remote_option IS 'The remote work option (on-site, hybrid, remote)';
COMMENT ON COLUMN jobs.salary IS 'Salary information as JSONB with min, max, currency, period';
COMMENT ON COLUMN jobs.requirements IS 'Array of requirements for the job';
COMMENT ON COLUMN jobs.responsibilities IS 'Array of responsibilities for the job';
COMMENT ON COLUMN jobs.benefits IS 'Array of benefits for the job';
COMMENT ON COLUMN jobs.tags IS 'Array of tags for the job';
COMMENT ON COLUMN jobs.posted_at IS 'The date the job was posted';
COMMENT ON COLUMN jobs.application_deadline IS 'The deadline for applying for the job';
COMMENT ON COLUMN jobs.applicants IS 'The number of applicants for the job';
COMMENT ON COLUMN jobs.featured IS 'Whether the job is featured or not';
COMMENT ON COLUMN jobs.active IS 'Whether the job is active or not';
COMMENT ON COLUMN jobs.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN jobs.updated_at IS 'Timestamp when the record was last updated';

-- Verify the table was created successfully
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'jobs') THEN
        RAISE EXCEPTION 'Jobs table was not created successfully';
    END IF;
    
    RAISE NOTICE 'Jobs table created successfully with all required fields, constraints, indexes, and triggers';
END $$; 