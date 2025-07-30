-- Migration: Verify Mock Data Insertion
-- This script validates the mock data insertion and checks data integrity

-- 1. Count total jobs inserted
SELECT 
    'Total Jobs Count' as check_type,
    COUNT(*) as result,
    CASE 
        WHEN COUNT(*) = 23 THEN 'PASS'
        ELSE 'FAIL'
    END as status
FROM jobs;

-- 2. Verify UUID format compliance
SELECT 
    'UUID Format Compliance' as check_type,
    COUNT(*) as invalid_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid UUIDs'
    END as status
FROM jobs 
WHERE id::text !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';

-- 3. Check company ID pattern compliance
SELECT 
    'Company ID Pattern Compliance' as check_type,
    COUNT(*) as invalid_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid company IDs'
    END as status
FROM jobs 
WHERE company_id IS NOT NULL AND company_id !~ '^comp-[a-zA-Z0-9]+$';

-- 4. Validate enum values for job type
SELECT 
    'Job Type Enum Validation' as check_type,
    COUNT(*) as invalid_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid job types'
    END as status
FROM jobs 
WHERE type NOT IN ('full-time', 'part-time', 'contract', 'internship');

-- 5. Validate enum values for experience level
SELECT 
    'Experience Level Enum Validation' as check_type,
    COUNT(*) as invalid_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid experience levels'
    END as status
FROM jobs 
WHERE experience_level NOT IN ('entry', 'mid', 'senior');

-- 6. Validate enum values for remote option
SELECT 
    'Remote Option Enum Validation' as check_type,
    COUNT(*) as invalid_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid remote options'
    END as status
FROM jobs 
WHERE remote_option NOT IN ('on-site', 'hybrid', 'remote');

-- 7. Check salary JSONB structure
SELECT 
    'Salary JSONB Structure' as check_type,
    COUNT(*) as invalid_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid salary structures'
    END as status
FROM jobs 
WHERE salary IS NOT NULL AND (
    salary->>'min' IS NULL OR 
    salary->>'max' IS NULL OR 
    salary->>'currency' IS NULL OR 
    salary->>'period' IS NULL
);

-- 8. Verify array fields are not empty
SELECT 
    'Array Fields Validation' as check_type,
    COUNT(*) as empty_arrays,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' empty arrays'
    END as status
FROM jobs 
WHERE array_length(requirements, 1) IS NULL 
   OR array_length(responsibilities, 1) IS NULL 
   OR array_length(benefits, 1) IS NULL 
   OR array_length(tags, 1) IS NULL;

-- 9. Check date consistency (application deadline after posted date)
SELECT 
    'Date Consistency Check' as check_type,
    COUNT(*) as invalid_dates,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' invalid date relationships'
    END as status
FROM jobs 
WHERE application_deadline <= posted_at;

-- 10. Verify audit fields are set
SELECT 
    'Audit Fields Check' as check_type,
    COUNT(*) as missing_audit,
    CASE 
        WHEN COUNT(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found ' || COUNT(*) || ' missing audit fields'
    END as status
FROM jobs 
WHERE created_at IS NULL OR updated_at IS NULL;

-- 11. Summary report
DO $$
DECLARE
    total_jobs INTEGER;
    uuid_errors INTEGER;
    company_id_errors INTEGER;
    enum_errors INTEGER;
    salary_errors INTEGER;
    array_errors INTEGER;
    date_errors INTEGER;
    audit_errors INTEGER;
BEGIN
    -- Get counts
    SELECT COUNT(*) INTO total_jobs FROM jobs;
    
    SELECT COUNT(*) INTO uuid_errors 
    FROM jobs WHERE id::text !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
    
    SELECT COUNT(*) INTO company_id_errors 
    FROM jobs WHERE company_id IS NOT NULL AND company_id !~ '^comp-[a-zA-Z0-9]+$';
    
    SELECT COUNT(*) INTO enum_errors 
    FROM jobs WHERE type NOT IN ('full-time', 'part-time', 'contract', 'internship')
       OR experience_level NOT IN ('entry', 'mid', 'senior')
       OR remote_option NOT IN ('on-site', 'hybrid', 'remote');
    
    SELECT COUNT(*) INTO salary_errors 
    FROM jobs WHERE salary IS NOT NULL AND (
        salary->>'min' IS NULL OR salary->>'max' IS NULL OR 
        salary->>'currency' IS NULL OR salary->>'period' IS NULL
    );
    
    SELECT COUNT(*) INTO array_errors 
    FROM jobs WHERE array_length(requirements, 1) IS NULL 
       OR array_length(responsibilities, 1) IS NULL 
       OR array_length(benefits, 1) IS NULL 
       OR array_length(tags, 1) IS NULL;
    
    SELECT COUNT(*) INTO date_errors 
    FROM jobs WHERE application_deadline <= posted_at;
    
    SELECT COUNT(*) INTO audit_errors 
    FROM jobs WHERE created_at IS NULL OR updated_at IS NULL;
    
    -- Print summary
    RAISE NOTICE '=== MOCK DATA VERIFICATION SUMMARY ===';
    RAISE NOTICE 'Total jobs: %', total_jobs;
    RAISE NOTICE 'UUID errors: %', uuid_errors;
    RAISE NOTICE 'Company ID errors: %', company_id_errors;
    RAISE NOTICE 'Enum errors: %', enum_errors;
    RAISE NOTICE 'Salary errors: %', salary_errors;
    RAISE NOTICE 'Array errors: %', array_errors;
    RAISE NOTICE 'Date errors: %', date_errors;
    RAISE NOTICE 'Audit errors: %', audit_errors;
    
    IF uuid_errors = 0 AND company_id_errors = 0 AND enum_errors = 0 
       AND salary_errors = 0 AND array_errors = 0 AND date_errors = 0 
       AND audit_errors = 0 AND total_jobs = 23 THEN
        RAISE NOTICE '✅ ALL CHECKS PASSED - Mock data is valid and complete!';
    ELSE
        RAISE NOTICE '❌ SOME CHECKS FAILED - Please review the errors above';
    END IF;
END $$; 