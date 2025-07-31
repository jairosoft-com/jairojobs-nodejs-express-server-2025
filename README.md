# JairoJobs.com Job Portal API

## 🚀 **Project Overview**

This is a **Node.js Express server** for the JairoJobs.com job portal MVP, generated using the OpenAPI Generator. The project follows an **API-first approach** where the OpenAPI specification drives the implementation, ensuring consistency and type safety. The API currently uses mock data and is containerized with Docker for easy deployment.

## 📋 **Prerequisites**

### **Local Development**
- **Node.js** >= 10.6
- **NPM** >= 6.10.0
- **Java** 1.8+ (for OpenAPI Generator)

### **Docker Development**
- **Docker Engine** 20.10+
- **Docker Compose** 2.0+
- **At least 2GB RAM** and **10GB disk space**

## 🏗️ **Architecture & Design**

### **Layered Architecture**
```
HTTP Request → Express Middleware → OpenAPI Validator → Controller → Service (Mock Data) → Response
```

### **Key Design Principles**
- ✅ **Single Responsibility Principle**: Each module has a focused responsibility
- ✅ **Dependency Injection**: Services injected into controllers
- ✅ **Separation of Concerns**: Clear layers (router → controller → service)
- ✅ **API-First Design**: OpenAPI specification drives implementation
- ✅ **Type Safety**: Request validation against schema

## 📁 **Project Structure**

```
nodejs-express-server/
├── api/
│   └── openapi.yaml              # OpenAPI 3.0.3 specification
├── controllers/
│   ├── Controller.js             # Base controller with request/response handling
│   ├── JobsController.js         # Job-specific controller operations
│   └── index.js                  # Controller exports
├── services/
│   ├── Service.js                # Base service with response utilities
│   ├── JobsService.js            # Job business logic implementation
│   └── index.js                  # Service exports
├── utils/
│   └── openapiRouter.js          # Custom OpenAPI routing middleware
├── config.js                     # Application configuration
├── expressServer.js              # Express server setup and middleware
├── index.js                      # Application entry point
├── logger.js                     # Winston logging configuration
├── package.json                  # Dependencies and scripts
├── Dockerfile                    # Production Docker configuration
├── Dockerfile.dev                # Development Docker configuration
├── docker-compose.yml            # Full stack with API and PostgreSQL
├── docker-compose.override.yml   # Development overrides
├── .dockerignore                 # Docker build exclusions

└── DOCKER.md                     # Comprehensive Docker documentation
```

## 🔧 **Core Components**

### **1. OpenAPI Specification (`api/openapi.yaml`)**
- **Version**: 3.0.3 (downgraded from 3.1.0 for compatibility)
- **Security**: API Key authentication (`X-API-Key` header)
- **Endpoints**: 2 job-related endpoints
- **Schemas**: Comprehensive job data models

### **2. Express Server (`expressServer.js`)**
- **Middleware Chain**: CORS, body parsing, cookie parsing, OpenAPI validation
- **Static Routes**: `/hello`, `/openapi`, `/api-docs` (Swagger UI)
- **OpenAPI Integration**: `express-openapi-validator` middleware
- **Error Handling**: Centralized error middleware

### **3. Routing System**
- **OpenAPI-Driven**: Routes defined in specification
- **Automatic Validation**: Request validation against schema
- **Parameter Extraction**: Path, query, header, and body parameters
- **Type Safety**: Parameters extracted based on OpenAPI definitions

### **4. Controllers (`controllers/`)**
- **Thin Wrappers**: Delegate to base `Controller.js`
- **Parameter Processing**: Extract and validate request parameters
- **Response Handling**: Format and send HTTP responses
- **Error Management**: Centralized error handling

### **5. Services (`services/`)**
- **Business Logic**: Implementation of job operations
- **Data Models**: Comprehensive job data structures
- **Mock Data**: 23 realistic job listings
- **Search & Filter**: Query and location-based filtering
- **Pagination**: Proper page calculation and limits

## 🎯 **API Endpoints**

### **GET /v1/jobs**
**Search and list jobs with pagination and filtering**

**Parameters:**
- `q` (optional): Search query for title, company, or description
- `location` (optional): Location filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

**Response Schema:** `SearchAndListJobsResponse200Json`
```json
{
  "jobs": [
    {
      "id": "1",
      "title": "Senior Full Stack Developer",
      "company": "TechCorp Solutions",
      "location": "San Francisco, CA",
      "type": "full-time",
      "remoteOption": "hybrid",
      "postedAt": "2025-01-15T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 23,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### **GET /v1/jobs/{jobId}**
**Get detailed information for a specific job**

**Parameters:**
- `jobId` (required): UUID format job identifier

**Response Schema:** `JobDetail`
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Senior Software Engineer - Backend",
  "company": "InnovateTech Inc.",
  "companyId": "comp-789",
  "companyLogo": "https://via.placeholder.com/200x80/28A745/FFFFFF?text=InnovateTech",
  "location": "Austin, TX",
  "type": "full-time",
  "experienceLevel": "senior",
  "remoteOption": "remote",
  "salary": {
    "min": 140000,
    "max": 200000,
    "currency": "USD",
    "period": "yearly"
  },
  "description": "Join our dynamic backend engineering team...",
  "requirements": [...],
  "responsibilities": [...],
  "benefits": [...],
  "tags": [...],
  "postedAt": "2025-07-20T14:30:00Z",
  "applicationDeadline": "2025-08-20T23:59:59Z",
  "applicants": 78,
  "featured": true,
  "active": true
}
```

## 🔐 **Security**

### **API Key Authentication**
- **Header**: `X-API-Key`
- **Required**: For all job endpoints
- **Validation**: OpenAPI validator middleware
- **Error Response**: 401 Unauthorized for missing/invalid keys

### **Input Validation**
- **OpenAPI Schema**: Request validation against specification
- **Parameter Types**: String, integer, date-time validation
- **Pattern Matching**: UUID format for job IDs
- **Length Limits**: Query parameters with max length constraints

## 📊 **Data Models**

### **Company Schema**
- `id`: Unique company identifier (pattern: comp-[a-zA-Z0-9]+)
- `name`: Company name
- `logo`: Company logo URL (URI format)
- `description`: Company description
- `website`: Company website (URI format)
- `industry`: Industry type
- `size`: Company size (startup, small, medium, large)
- `founded`: Founding year
- `headquarters`: Headquarters location
- `verified`: Verification status
- `featured`: Featured company status

### **JobSummary Schema**
- `id`: Unique identifier for the job
- `title`: The title of the job
- `company`: Company object (references Company schema with id, name, logo, etc.)
- `location`: The location of the job
- `type`: Employment type (full-time, part-time, contract, internship)
- `remoteOption`: Remote work option (on-site, hybrid, remote)
- `postedAt`: The date the job was posted (date-time format)

### **Job Schema** (Full job details)
- `id`: Unique identifier for the job
- `title`: The title of the job
- `company`: Company object (references Company schema with id, name, logo, etc.)
- `location`: The location of the job
- `type`: Employment type (full-time, part-time, contract, internship)
- `experienceLevel`: Required experience level (entry, mid, senior)
- `remoteOption`: Remote work option (on-site, hybrid, remote)
- `salary`: Salary information object (min, max, currency, period)
- `description`: The full description of the job
- `requirements`: List of requirements for the job (max 100 items)
- `responsibilities`: List of responsibilities for the job (max 100 items)
- `benefits`: List of benefits for the job (max 100 items)
- `tags`: List of tags for the job (max 100 items)
- `postedAt`: The date the job was posted (date-time format)
- `applicationDeadline`: The deadline for applying for the job (date-time format)
- `applicants`: The number of applicants for the job
- `featured`: Whether the job is featured or not
- `active`: Whether the job is active or not

### **JobDetail Schema** (extends Job schema)
JobDetail uses `allOf` to extend the Job schema, inheriting all Job fields and adding no additional fields. The JobDetail schema is essentially an alias for the Job schema with a different description and example.

## 🚀 **Getting Started**

### **Option 1: Docker (Recommended)**

#### **Quick Start with Docker**
```bash
# Clone the repository
git clone <repository-url>
cd nodejs-express-server

# Start all services (API + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

#### **Development with Docker**
```bash
# Start with development profile (hot reload)
docker-compose --profile dev up -d

# View development logs
docker-compose logs -f api-dev

# Stop development services
docker-compose --profile dev down
```

#### **Docker Commands**
```bash
# Build production image
docker build -t jairojobs-api:latest .

# Build development image
docker build -f Dockerfile.dev -t jairojobs-api:dev .

# Run production container
docker run -p 4010:4010 jairojobs-api:latest

# Run with database
docker-compose up -d db
docker run --network jairojobs-network -p 4010:4010 jairojobs-api:latest
```

#### **Task Commands (Recommended)**
```bash
# Show all available tasks
task

# Start development environment
task up-dev

# View logs
task logs-dev

# Test API
task test

# Stop services
task down
```

### **Option 2: Local Development**

#### **1. Installation**
```bash
# Clone the repository
git clone <repository-url>
cd nodejs-express-server

# Install dependencies
npm install
```

#### **2. Configuration**
Edit `config.js` to customize:
- **Port**: Default 4010
- **File Upload Path**: Default `uploaded_files/`
- **API Base URL**: Default `http://localhost:4010`

#### **3. Running the Server**
```bash
# Start the server
npm start

# Or run directly
node index.js
```

### **4. Testing the API**
```bash
# Test basic connectivity
curl http://localhost:4010/hello

# List jobs (requires API key)
curl -H "X-API-Key: test-key" http://localhost:4010/v1/jobs

# Search jobs
curl -H "X-API-Key: test-key" "http://localhost:4010/v1/jobs?q=developer&location=San%20Francisco&page=1&limit=5"

# Get job details
curl -H "X-API-Key: test-key" "http://localhost:4010/v1/jobs/123e4567-e89b-12d3-a456-426614174000"
```

### **5. API Documentation**
- **Swagger UI**: http://localhost:4010/api-docs
- **OpenAPI Spec**: http://localhost:4010/openapi



## 🧪 **Testing**

### **Service Testing**
```bash
# Run service tests
node test-service.js
```

### **Docker Testing**
```bash
# Test Docker container health
docker-compose exec api curl http://localhost:4010/hello

# Test API endpoints in container
docker-compose exec api curl -H "X-API-Key: test-key" http://localhost:4010/v1/jobs
```

### **Manual Testing**
- **Search Functionality**: Test with various query parameters
- **Pagination**: Verify page limits and navigation
- **Filtering**: Test location-based filtering
- **Error Handling**: Test invalid requests and API keys
- **Docker Health**: Verify container health checks

## 📦 **Dependencies**

### **Production Dependencies**
- `express`: Web framework
- `express-openapi-validator`: OpenAPI validation middleware
- `js-yaml`: YAML parsing (v4.1.0)
- `swagger-ui-express`: API documentation UI
- `winston`: Logging framework
- `cors`: Cross-origin resource sharing
- `body-parser`: Request body parsing
- `cookie-parser`: Cookie parsing

### **Development Dependencies**
- `mocha`: Testing framework
- `chai`: Assertion library
- `eslint`: Code linting
- `eslint-config-airbnb-base`: Airbnb coding standards

## 🔧 **Recent Improvements**

### **Fixed Issues**
1. **OpenAPI Validation**: Resolved `"openapi.validator: args.apiDoc was invalid"` error
2. **js-yaml Compatibility**: Updated from deprecated `safeLoad` to `load` method
3. **OpenAPI Version**: Downgraded from 3.1.0 to 3.0.3 for better compatibility
4. **Routing Fields**: Added missing `x-openapi-router-controller` and `x-openapi-router-service` fields

### **Enhanced Features**
1. **Comprehensive Job Data**: 23 realistic job listings with complete data
2. **Search & Filter**: Query-based and location-based filtering
3. **Pagination**: Proper page calculation with total pages
4. **Security**: API key authentication for all endpoints
5. **Error Handling**: Comprehensive error responses
6. **Data Validation**: Full OpenAPI schema compliance

### **Docker Infrastructure**
1. **Multi-stage Builds**: Optimized production images (~150MB)
2. **Development Environment**: Hot reload with volume mounting
3. **Database Integration**: PostgreSQL with auto-initialization
4. **Health Checks**: Automatic container monitoring
5. **Security**: Non-root user implementation
6. **Comprehensive Documentation**: Complete Docker setup guide

## 📈 **Performance & Scalability**

### **Current State**
- **Stateless Design**: Good for horizontal scaling
- **Modular Architecture**: Supports microservices migration
- **OpenAPI-First**: Enables API gateway integration
- **Mock Data**: 23 job listings for testing
- **Docker Ready**: Containerized deployment ready
- **API-Only**: No database dependencies, simplified deployment

### **Scalability Considerations**
- **Database Integration**: Can add PostgreSQL/MongoDB for persistent data
- **Caching**: Can add Redis for response caching
- **Load Balancing**: Stateless design supports multiple instances
- **API Gateway**: OpenAPI spec enables gateway integration
- **Container Orchestration**: Ready for Kubernetes deployment
- **Microservices**: Docker containers support service decomposition

## 🔮 **Future Enhancements**

### **Planned Improvements**
1. **Database Integration**: Add PostgreSQL/MongoDB for persistent data storage
2. **Authentication**: Implement JWT token validation
3. **Rate Limiting**: Add request throttling
4. **Caching**: Implement response caching
5. **Testing**: Add comprehensive unit and integration tests
6. **Monitoring**: Add application monitoring and metrics
7. **Documentation**: Enhanced API documentation
8. **CI/CD**: Automated testing and deployment pipeline
9. **Kubernetes**: Container orchestration deployment
10. **Service Mesh**: Istio or Linkerd integration

### **Security Enhancements**
1. **Input Sanitization**: Enhanced security validation
2. **Rate Limiting**: Prevent abuse
3. **CORS Configuration**: Proper cross-origin settings
4. **Security Headers**: Add security headers middleware

## 📝 **Development Guidelines**

### **Code Standards**
- **ESLint**: Airbnb coding standards
- **Modular Design**: Single responsibility principle
- **Error Handling**: Comprehensive error management
- **Logging**: Winston-based structured logging

### **API Development**
- **OpenAPI-First**: Define API in specification first
- **Schema Validation**: All requests validated against schema
- **Type Safety**: Parameters extracted based on OpenAPI definitions
- **Documentation**: Auto-generated Swagger UI documentation

### **Docker Development**
- **Multi-stage Builds**: Optimize image size and security
- **Non-root User**: Run containers as non-privileged user
- **Health Checks**: Implement container health monitoring
- **Volume Mounts**: Use volumes for persistent data
- **Environment Variables**: Configure via environment variables
- **Docker Compose**: Use for multi-service development

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** the coding standards
4. **Test** your changes thoroughly
5. **Submit** a pull request

## 📄 **License**

This project is licensed under the Unlicense - see the LICENSE file for details.

## 🆘 **Support**

For support and questions:
- **Email**: support@jairojobs.com
- **Documentation**: http://localhost:4010/api-docs
- **OpenAPI Spec**: http://localhost:4010/openapi
- **Docker Documentation**: See `DOCKER.md` for detailed Docker setup

## 🐳 **Docker Quick Reference**

### **Production Deployment**
```bash
# Start API services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### **Development Environment**
```bash
# Start with hot reload
docker-compose --profile dev up -d

# View development logs
docker-compose logs -f api-dev

# Rebuild and restart
docker-compose build --no-cache && docker-compose up -d
```



---

**Last Updated**: January 27, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready (API-only with mock data + Docker)
