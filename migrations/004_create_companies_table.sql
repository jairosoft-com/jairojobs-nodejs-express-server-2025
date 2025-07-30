-- Migration: Create Companies Table and Insert Mock Data
-- This script creates the companies table and inserts the mock companies data

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500),
    description TEXT,
    website VARCHAR(500),
    industry VARCHAR(100),
    size VARCHAR(20) CHECK (size IN ('startup', 'small', 'medium', 'large')),
    founded INTEGER,
    headquarters VARCHAR(255),
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to update updated_at column
CREATE TRIGGER update_companies_updated_at_column
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Clear existing data
DELETE FROM companies;

-- Insert mock companies data
INSERT INTO companies (
    id, name, logo, description, website, industry, size, founded, headquarters, verified, featured
) VALUES 
-- Company 1: TechCorp Solutions
(
    'comp-001',
    'TechCorp Solutions',
    'https://via.placeholder.com/200x80/4A90E2/FFFFFF?text=TechCorp',
    'Leading technology solutions provider specializing in cloud infrastructure and enterprise software.',
    'https://techcorp.example.com',
    'technology',
    'large',
    2010,
    'San Francisco, CA',
    true,
    true
),
-- Company 2: StartupHub
(
    'comp-002',
    'StartupHub',
    'https://via.placeholder.com/200x80/28A745/FFFFFF?text=StartupHub',
    'Fast-growing fintech startup revolutionizing digital payments.',
    'https://startuphub.example.com',
    'finance',
    'startup',
    2021,
    'New York, NY',
    true,
    false
),
-- Company 3: Global Health Systems
(
    'comp-003',
    'Global Health Systems',
    'https://via.placeholder.com/200x80/DC3545/FFFFFF?text=GlobalHealth',
    'Healthcare technology company improving patient care through innovative solutions.',
    'https://globalhealth.example.com',
    'healthcare',
    'medium',
    2015,
    'Boston, MA',
    true,
    false
);

-- Verify the data was inserted correctly
SELECT 
    'Companies Table Created and Populated' as status,
    COUNT(*) as total_companies,
    COUNT(CASE WHEN verified = true THEN 1 END) as verified_companies,
    COUNT(CASE WHEN featured = true THEN 1 END) as featured_companies
FROM companies; 