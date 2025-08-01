# 🗄️ PostgreSQL Database Implementation Plan for JairoJobs

## 📋 **Project Overview**
This plan outlines the implementation of the PostgreSQL database structure for the JairoJobs platform based on the OpenAPI specification analysis.

## 🎯 **Objectives**
- Create a normalized, performant database schema
- Implement proper data validation and constraints
- Set up indexes for optimal query performance
- Ensure data integrity and referential integrity
- Support all API operations defined in the OpenAPI spec

---

## 📊 **Phase 1: Core Database Setup**

### ✅ **Task 1.1: Create Database and Extensions**
- [x] Create PostgreSQL database: `jairojobs`
- [x] Enable required extensions:
  - `uuid-ossp` (for UUID generation)
  - `pg_trgm` (for text search)
  - `btree_gin` (for GIN indexes)

### ✅ **Task 1.2: Create Enum Types**
- [x] Create `job_type` enum:
  ```sql
  CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');
  ```
- [x] Create `experience_level` enum:
  ```sql
  CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior');
  ```
- [x] Create `remote_option` enum:
  ```sql
  CREATE TYPE remote_option AS ENUM ('on-site', 'hybrid', 'remote');
  ```

### ✅ **Task 1.3: Update Existing Jobs Table Schema**
- [x] Analyze current `jobs` table schema vs OpenAPI specification
- [x] Identify differences in field names, types, and constraints
- [x] Create migration script to align with OpenAPI schema
- [x] Update field names to match OpenAPI spec:
  - `employment_type` → `type` (using job_type enum)
  - `location_type` → `remote_option` (using remote_option enum)
  - `salary_range` → `salary` (structured object)
  - `posted_date` → `posted_at`
  - `deadline` → `application_deadline`
  - `company_logo` → `company_logo_url`
- [x] Add missing fields from OpenAPI spec:
  - `company_id` (VARCHAR with pattern constraint)
  - `applicants` (INTEGER)
  - `featured` (BOOLEAN)
  - `active` (BOOLEAN)
  - `tags` (TEXT array)
- [x] Update data types to use enum types where applicable
- [x] Add proper constraints and validation rules
- [x] Test schema migration with sample data

### ✅ **Task 1.4: Setup Dockerfile for Express.js/Node.js Project**
- [x] Create Dockerfile for Node.js application
- [x] Configure multi-stage build for optimization
- [x] Set up proper Node.js version (LTS)
- [x] Configure environment variables for different stages
- [x] Add health check endpoint
- [x] Optimize for production deployment
- [x] Create .dockerignore file
- [x] Add Docker Compose for local development
- [x] Configure volume mounts for logs and uploads
- [x] Set up proper user permissions
- [x] Add Docker documentation

---

## 🏗️ **Phase 2: Main Tables Implementation**

### ✅ **Task 2.1: Create Jobs Table**
- [x] Create primary `jobs` table with all core fields
- [x] Implement proper constraints and validation
- [x] Add audit fields (created_at, updated_at)
- [x] Set up triggers for updated_at maintenance
- [x] Create migration script `001_create_job_table.sql` with complete schema

#### **Task 2.1.1: Fix Mock Data Schema Compliance**
- [x] Update job IDs to use proper UUID format (replace simple strings with UUIDs)
- [x] Update company IDs to use `comp-` prefix pattern (`^comp-[a-zA-Z0-9]+$`)
- [x] Convert company logo URLs from relative paths to HTTPS URLs
- [x] Verify all 23 mock job entries comply with OpenAPI schema validation

#### **Task 2.1.2: Create Migration Scripts for Mock Data**
- [x] Create migration directory structure (`migrations/`)
- [x] Create `002_insert_mock_jobs.sql` with INSERT statements for all 23 jobs
- [x] Handle special data types (UUID, JSONB salary, arrays for requirements/responsibilities/benefits/tags)
- [x] Create `003_verify_mock_data.sql` with validation queries
- [x] Test migration against local PostgreSQL instance
- [x] Verify data integrity and API compatibility

#### **Task 2.1.3: Create Company Schema in OpenAPI**
- [x] Add Company schema definition to `components.schemas` in `api/openapi.yaml`
- [x] Define required properties: id, name, logo, description, website, industry, size, founded, headquarters
- [x] Add optional properties: verified, featured
- [x] Update Job schema to reference Company instead of simple string
- [x] Convert mockCompanies data to match new schema format
- [x] Update company IDs to use `comp-` prefix pattern consistently
- [x] Test schema validation and ensure no OpenAPI linting errors

#### **Task 2.1.4: Refactor JobsService to Use External JSON Data**
- [x] Create `data/jobs.json` file with all job data
- [x] Update `JobsService.js` to read from JSON file instead of hardcoded array
- [x] Add proper error handling for file loading
- [x] Maintain backward compatibility with existing API structure

#### **Task 2.1.5: Refactor getJobDetails to Use External JSON Data**
- [x] Create `data/job-details.json` file with detailed job information
- [x] Update `getJobDetails` function to read from JSON file instead of hardcoded object
- [x] Add proper error handling and job lookup by ID
- [x] Implement 404 response for non-existent jobs

#### **Task 2.1.6: Add Pagination Examples to Documentation**
- [x] Add multiple pagination examples to README.md
- [x] Include default pagination (page=1, limit=10) example
- [x] Include custom pagination (page=2, limit=5) example
- [x] Add curl command examples for both scenarios
- [x] Document expected response structure for each example

#### **Task 2.1.7: Create Job Summaries and Update Service**

- [x] **Phase 1: Create `job-summaries.json` based on `JobSummary` schema**
  - [x] Analyze current `data/job-details.json` structure vs `JobSummary` schema
  - [x] Create `data/job-summaries.json` with only required fields: `id`, `title`, `company` (object), `location`, `type`, `remoteOption`, `postedAt`
  - [x] Transform company field from string to object with required fields (`id`, `name`, `verified`)
  - [x] Remove extra fields: `companyId`, `companyLogo`, `experienceLevel`, `salary`, `description`, `requirements`, `responsibilities`, `benefits`, `tags`, `applicationDeadline`, `applicants`, `featured`, `active`
  - [x] Validate data structure matches `JobSummary` schema exactly

- [x] **Phase 2: Update `searchAndListJobs` Service**
  - [x] Change file path from `data/jobs.json` to `data/job-summaries.json`
  - [x] Update search logic to search `job.company.name` instead of `job.company`
  - [x] Update filter logic for company name search
  - [x] Ensure returned data matches `JobSummary` schema
  - [x] Test with existing API calls and validate responses

- [x] **Phase 3: Data Structure Transformation**
  - [x] **Current `job-details.json` (Detailed)**:
    ```json
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Senior Full Stack Developer",
      "company": "TechCorp Solutions",  // ❌ String
      "companyId": "comp-001",         // ❌ Extra field
      "companyLogo": "...",            // ❌ Extra field
      "location": "San Francisco, CA",
      "type": "full-time",
      "experienceLevel": "senior",     // ❌ Extra field
      "remoteOption": "hybrid",
      "salary": {...},                 // ❌ Extra field
      "description": "...",            // ❌ Extra field
      "requirements": [...],           // ❌ Extra field
      "postedAt": "2025-01-15T00:00:00.000Z"
    }
    ```
  - [ ] **New `job-summaries.json` (Summary)**:
    ```json
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Senior Full Stack Developer",
      "company": {                     // ✅ Object
        "id": "comp-001",
        "name": "TechCorp Solutions",
        "logo": "https://...",
        "verified": true
      },
      "location": "San Francisco, CA",
      "type": "full-time",
      "remoteOption": "hybrid",
      "postedAt": "2025-01-15T00:00:00.000Z"
    }
    ```

- [ ] **Phase 4: Code Changes Required**
  - [ ] **File: `services/JobsService.js`**
    ```javascript
    // Change line 72
    const jobsDataPath = path.join(__dirname, '..', 'data', 'job-summaries.json');
    
    // Update search logic (lines 85-89)
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.name.toLowerCase().includes(query) ||  // ✅ Updated
      job.location.toLowerCase().includes(query)
    );
    
    // Update location filter (lines 95-99)
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(locationQuery)
    );
    ```

- [x] **Phase 5: Testing Strategy**
  - [x] Verify `job-summaries.json` conforms to `JobSummary` schema
  - [x] Check all required fields are present
  - [x] Validate company object structure
  - [x] Test `/v1/jobs` endpoint with new data
  - [x] Test search functionality (`?q=developer`)
  - [x] Test location filtering (`?location=San Francisco`)
  - [x] Test pagination (`?page=1&limit=5`)
  - [x] Verify response matches `SearchAndListJobsResponse200Json` schema
  - [x] Check pagination object structure
  - [x] Validate company objects in job summaries

- [ ] **Phase 6: Rollback Plan**
  - [ ] Keep `data/job-details.json` for detailed job information
  - [ ] Keep `data/jobs.json` as backup
  - [ ] Update `getJobDetails` to use `job-details.json` (if needed)

#### **✅ Task 2.1.8: Fix Job Details Schema Compliance**
- [x] **Phase 1: Analyze Current Issues**
  - [x] **Company Field Mismatch**: `job-details.json` uses `"company": "TechCorp Solutions"` (string) but `JobDetail` schema expects `company` as a `Company` object
  - [x] **Extra Fields**: `companyId` and `companyLogo` should be part of the `company` object
  - [x] **Missing Required Fields**: Company object missing `verified` field
  - [x] **Schema Compliance**: Current structure matches `Job` schema but not `JobDetail` schema

- [x] **Phase 2: Data Structure Transformation**
  - [x] **Current `job-details.json` (Non-Compliant)**:
    ```json
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Senior Full Stack Developer",
      "company": "TechCorp Solutions",  // ❌ String
      "companyId": "comp-001",         // ❌ Extra field
      "companyLogo": "...",            // ❌ Extra field
      "location": "San Francisco, CA",
      "type": "full-time",
      "experienceLevel": "senior",
      "remoteOption": "hybrid",
      "salary": {...},
      "description": "...",
      "requirements": [...],
      "responsibilities": [...],
      "benefits": [...],
      "tags": [...],
      "postedAt": "2025-01-15T00:00:00.000Z",
      "applicationDeadline": "2025-02-15T23:59:59Z",
      "applicants": 42,
      "featured": true,
      "active": true
    }
    ```
  - [x] **New `job-details.json` (Compliant)**:
    ```json
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Senior Full Stack Developer",
      "company": {                     // ✅ Object
        "id": "comp-001",
        "name": "TechCorp Solutions",
        "logo": "https://via.placeholder.com/200x80/4A90E2/FFFFFF?text=TechCorp",
        "description": "Leading technology solutions provider...",
        "website": "https://techcorp.example.com",
        "industry": "technology",
        "size": "large",
        "founded": 2010,
        "headquarters": "San Francisco, CA",
        "verified": true,
        "featured": true
      },
      "location": "San Francisco, CA",
      "type": "full-time",
      "experienceLevel": "senior",
      "remoteOption": "hybrid",
      "salary": {...},
      "description": "...",
      "requirements": [...],
      "responsibilities": [...],
      "benefits": [...],
      "tags": [...],
      "postedAt": "2025-01-15T00:00:00.000Z",
      "applicationDeadline": "2025-02-15T23:59:59Z",
      "applicants": 42,
      "featured": true,
      "active": true
    }
    ```

- [x] **Phase 3: Implementation Steps**
  - [x] Transform `company` field from string to object
  - [x] Move `companyId` to `company.id`
  - [x] Move `companyLogo` to `company.logo`
  - [x] Add missing company fields: `description`, `website`, `industry`, `size`, `founded`, `headquarters`, `verified`, `featured`
  - [x] Ensure all company objects have required fields: `id`, `name`, `verified`
  - [x] Validate data structure matches `JobDetail` schema exactly

- [x] **Phase 4: Update getJobDetails Service**
  - [x] Verify `getJobDetails` function works with new data structure
  - [x] Test job lookup by ID functionality
  - [x] Ensure 404 responses work correctly for non-existent jobs
  - [x] Validate response matches `JobDetail` schema

- [x] **Phase 5: Testing Strategy**
  - [x] Test `/v1/jobs/{jobId}` endpoint with valid job IDs
  - [x] Test with invalid job IDs (404 response)
  - [x] Verify company object structure in responses
  - [x] Validate all required fields are present
  - [x] Check enum values for `type`, `experienceLevel`, `remoteOption`
  - [x] Verify salary object structure
  - [x] Test array fields: `requirements`, `responsibilities`, `benefits`, `tags`

- [x] **Phase 6: Schema Validation**
  - [x] Verify `job-details.json` conforms to `JobDetail` schema
  - [x] Check all required fields are present
  - [x] Validate company object structure
  - [x] Ensure enum values are correct
  - [x] Verify data types match schema definitions

**✅ Task 2.1.8 COMPLETED - Summary:**
- ✅ Transformed `job-details.json` to match `JobDetail` schema exactly
- ✅ Company field now properly structured as objects with all required fields
- ✅ All job IDs updated to valid UUID format
- ✅ API responses now fully compliant with OpenAPI specification
- ✅ All 3 job entries successfully tested and validated
- ✅ 404 responses working correctly for non-existent jobs
- ✅ Enum values (`type`, `experienceLevel`, `remoteOption`) validated
- ✅ Array fields (`requirements`, `responsibilities`, `benefits`, `tags`) tested
- ✅ Salary object structure verified
- ✅ Company objects include all required fields: `id`, `name`, `verified`

### ✅ **Task 2.2: Create Related Tables**
- [ ] Create `job_requirements` table (one-to-many)
- [ ] Create `job_responsibilities` table (one-to-many)
- [ ] Create `job_benefits` table (one-to-many)
- [ ] Create `job_tags` table (one-to-many)

### ✅ **Task 2.3: Create Companies Table (Future Enhancement)**
- [x] Create `companies` table for company management
- [x] Add foreign key relationship to jobs table
- [ ] Implement company logo storage strategy

---

## 🔍 **Phase 3: Indexes and Performance**

### ✅ **Task 3.1: Primary Indexes**
- [ ] Create indexes on frequently queried fields:
  - `company_id`
  - `type`
  - `experience_level`
  - `remote_option`
  - `location`
  - `posted_at`
  - `active`
  - `featured`

### ✅ **Task 3.2: Composite Indexes**
- [ ] Create composite indexes for common query patterns:
  - `(active, type, location)`
  - `(featured, active, posted_at)`
  - `(company_id, active)`

### ✅ **Task 3.3: Full-Text Search Index**
- [ ] Create GIN index for full-text search on:
  - `title`
  - `company`
  - `description`

---

## 🔒 **Phase 4: Data Validation and Constraints**

### ✅ **Task 4.1: Check Constraints**
- [ ] Implement salary range validation (`salary_min <= salary_max`)
- [ ] Add deadline validation (`application_deadline > posted_at`)
- [ ] Validate company_id pattern (`comp-[a-zA-Z0-9]+`)
- [ ] Add URL format validation for company_logo_url

### ✅ **Task 4.2: Foreign Key Constraints**
- [ ] Add foreign key constraints for related tables
- [ ] Implement CASCADE delete rules where appropriate
- [ ] Add referential integrity checks

### ✅ **Task 4.3: Unique Constraints**
- [ ] Ensure job_id uniqueness in related tables
- [ ] Add unique constraints where needed

---

## 🛠️ **Phase 5: Database Functions and Triggers**

### ✅ **Task 5.1: Audit Triggers**
- [ ] Create trigger function for `updated_at` maintenance
- [ ] Implement trigger on `jobs` table
- [ ] Add audit logging if required

### ✅ **Task 5.2: Validation Functions**
- [ ] Create function to validate salary ranges
- [ ] Create function to validate deadlines
- [ ] Create function to validate company_id format

### ✅ **Task 5.3: Search Functions**
- [ ] Create full-text search function
- [ ] Create location-based search function
- [ ] Create filtered search function

---

## 📝 **Phase 6: Sample Data and Testing**

### ✅ **Task 6.1: Insert Sample Data**
- [ ] Create sample companies
- [ ] Insert sample jobs with all related data
- [ ] Add realistic test data matching OpenAPI examples
- [ ] Include edge cases and boundary conditions

### ✅ **Task 6.2: Query Testing**
- [ ] Test all API endpoint queries
- [ ] Verify pagination functionality
- [ ] Test search and filtering
- [ ] Validate performance with large datasets

---

## 🔄 **Phase 7: Integration with Node.js Application**

### ✅ **Task 7.1: Database Connection**
- [ ] Install PostgreSQL client for Node.js (`pg`)
- [ ] Create database connection configuration
- [ ] Implement connection pooling
- [ ] Add environment variable support

### ✅ **Task 7.2: Update Services Layer**
- [ ] Replace mock data in `JobsService.js` with database queries
- [ ] Implement proper error handling for database operations
- [ ] Add transaction support for complex operations
- [ ] Implement connection management

### ✅ **Task 7.3: Query Optimization**
- [ ] Optimize queries for performance
- [ ] Implement proper parameterized queries
- [ ] Add query logging for debugging
- [ ] Implement caching strategy if needed

---

## 🧪 **Phase 8: Testing and Validation**

### ✅ **Task 8.1: Unit Tests**
- [ ] Create database schema tests
- [ ] Test all constraints and validations
- [ ] Verify index performance
- [ ] Test data integrity rules

### ✅ **Task 8.2: Integration Tests**
- [ ] Test API endpoints with real database
- [ ] Verify all CRUD operations
- [ ] Test search and pagination
- [ ] Validate error handling

### ✅ **Task 8.3: Performance Tests**
- [ ] Load test with large datasets
- [ ] Monitor query performance
- [ ] Optimize slow queries
- [ ] Test concurrent access

---

## 📚 **Phase 9: Documentation and Maintenance**

### ✅ **Task 9.1: Database Documentation**
- [ ] Document all tables and relationships
- [ ] Create ERD diagram
- [ ] Document indexes and their purposes
- [ ] Create query examples

### ✅ **Task 9.2: Migration Scripts**
- [ ] Create database migration scripts
- [ ] Document upgrade procedures
- [ ] Create rollback scripts
- [ ] Version control database schema

### ✅ **Task 9.3: Monitoring and Maintenance**
- [ ] Set up database monitoring
- [ ] Create maintenance procedures
- [ ] Document backup strategies
- [ ] Plan for scaling

---

## 🚀 **Phase 10: Deployment and Production**

### ✅ **Task 10.1: Production Setup**
- [ ] Configure production database
- [ ] Set up proper security
- [ ] Configure backups
- [ ] Set up monitoring

### ✅ **Task 10.2: Environment Configuration**
- [ ] Create environment-specific configs
- [ ] Set up CI/CD for database changes
- [ ] Configure connection pooling for production
- [ ] Set up logging and monitoring

---

## 📋 **Detailed Implementation Checklist**

### **Database Creation**
- [x] Create database: `CREATE DATABASE jairojobs;`
- [x] Connect to database
- [x] Enable extensions: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
- [x] Enable extensions: `CREATE EXTENSION IF NOT EXISTS "pg_trgm";`
- [x] Enable extensions: `CREATE EXTENSION IF NOT EXISTS "btree_gin";`

### **Enum Types**
- [x] `CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');`
- [x] `CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior');`
- [x] `CREATE TYPE remote_option AS ENUM ('on-site', 'hybrid', 'remote');`

### **Main Tables**
- [ ] Create `jobs` table with all fields
- [ ] Create `job_requirements` table
- [ ] Create `job_responsibilities` table
- [ ] Create `job_benefits` table
- [ ] Create `job_tags` table

### **Indexes**
- [ ] Create single-column indexes
- [ ] Create composite indexes
- [ ] Create full-text search index
- [ ] Create GIN indexes for arrays

### **Constraints**
- [ ] Add check constraints
- [ ] Add foreign key constraints
- [ ] Add unique constraints
- [ ] Add not null constraints

### **Functions and Triggers**
- [ ] Create audit trigger function
- [ ] Create validation functions
- [ ] Create search functions
- [ ] Attach triggers to tables

### **Sample Data**
- [ ] Insert sample companies
- [ ] Insert sample jobs
- [ ] Insert related data (requirements, responsibilities, etc.)
- [ ] Verify data integrity

### **Node.js Integration**
- [ ] Install `pg` package
- [ ] Create database connection
- [ ] Update `JobsService.js`
- [ ] Test all endpoints

### **Docker Setup**
- [x] Create production Dockerfile with multi-stage build
- [x] Create development Dockerfile
- [x] Create .dockerignore file
- [x] Create docker-compose.yml for full stack
- [x] Create docker-compose.override.yml for development
- [x] Create database initialization script
- [x] Create comprehensive Docker documentation
- [x] Test Docker build successfully

---

## 🎯 **Success Criteria**

### **Functional Requirements**
- [ ] All API endpoints work with real database
- [ ] Search and filtering work correctly
- [ ] Pagination functions properly
- [ ] Data validation works as expected

### **Performance Requirements**
- [ ] Query response times < 100ms for simple queries
- [ ] Search queries < 500ms
- [ ] Support for 10,000+ job records
- [ ] Concurrent user support

### **Data Integrity**
- [ ] All constraints enforced
- [ ] No orphaned records
- [ ] Consistent data across tables
- [ ] Proper error handling

---

## 📅 **Timeline Estimate**

- **Phase 1-2**: 2-3 days (Core setup and tables)
- **Phase 3-4**: 1-2 days (Indexes and constraints)
- **Phase 5-6**: 2-3 days (Functions and sample data)
- **Phase 7-8**: 3-4 days (Integration and testing)
- **Phase 9-10**: 2-3 days (Documentation and deployment)

**Total Estimated Time**: 10-15 days

---

## 🚨 **Risk Mitigation**

### **Technical Risks**
- [ ] Database performance issues → Implement proper indexing strategy
- [ ] Data integrity problems → Add comprehensive constraints
- [ ] Connection pool exhaustion → Configure proper pooling
- [ ] Query optimization → Monitor and optimize slow queries

### **Operational Risks**
- [ ] Data loss → Implement backup strategy
- [ ] Downtime → Plan migration procedures
- [ ] Security issues → Implement proper access controls
- [ ] Scaling problems → Design for horizontal scaling

---

## 📞 **Next Steps**

1. **Immediate**: Review and approve this plan
2. **Week 1**: Execute Phase 1-3 (Database setup and tables)
3. **Week 2**: Execute Phase 4-6 (Constraints and sample data)
4. **Week 3**: Execute Phase 7-8 (Integration and testing)
5. **Week 4**: Execute Phase 9-10 (Documentation and deployment)

---

*Last Updated: 2025-01-27*
*Version: 1.0*
*Status: Planning Phase* 