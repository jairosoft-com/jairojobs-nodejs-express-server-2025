-- Migration: Add Foreign Key Constraint and Clean Up Company References
-- This script adds a foreign key constraint between jobs.company_id and companies.id
-- and cleans up invalid company_id references

-- Step 1: Update invalid company_id references to valid ones
-- Map invalid company_ids to valid companies based on company name similarity
UPDATE jobs 
SET company_id = 'comp-001' 
WHERE company_id IN ('comp-004', 'comp-005', 'comp-006', 'comp-007', 'comp-008') 
AND company LIKE '%TechCorp%';

UPDATE jobs 
SET company_id = 'comp-002' 
WHERE company_id IN ('comp-004', 'comp-005', 'comp-006', 'comp-007', 'comp-008') 
AND company LIKE '%StartupHub%';

UPDATE jobs 
SET company_id = 'comp-003' 
WHERE company_id IN ('comp-004', 'comp-005', 'comp-006', 'comp-007', 'comp-008') 
AND company LIKE '%Global%';

-- For remaining invalid references, set to comp-001 as default
UPDATE jobs 
SET company_id = 'comp-001' 
WHERE company_id IN ('comp-004', 'comp-005', 'comp-006', 'comp-007', 'comp-008');

-- Step 2: Add foreign key constraint
ALTER TABLE jobs 
ADD CONSTRAINT fk_jobs_company_id 
FOREIGN KEY (company_id) 
REFERENCES companies(id) 
ON DELETE RESTRICT 
ON UPDATE CASCADE;

-- Step 3: Verify the constraint was added successfully
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'jobs' 
  AND tc.constraint_name = 'fk_jobs_company_id';

-- Step 4: Verify all company_id references are valid
SELECT 
    'Foreign Key Validation' as check_type,
    COUNT(*) as total_jobs,
    COUNT(CASE WHEN c.id IS NOT NULL THEN 1 END) as valid_references,
    COUNT(CASE WHEN c.id IS NULL THEN 1 END) as invalid_references
FROM jobs j
LEFT JOIN companies c ON j.company_id = c.id
WHERE j.company_id IS NOT NULL; 