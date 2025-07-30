# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies
npm install

# Start the server
npm start

# Run with Docker (recommended)
docker-compose up -d          # Production mode
docker-compose --profile dev up -d  # Development mode with hot reload

# View logs
docker-compose logs -f api    # Production logs
docker-compose logs -f api-dev # Development logs

# Stop services
docker-compose down
```

### Testing
```bash
# Run service tests
node test-service.js

# Test API endpoints
curl -H "X-API-Key: test-key" http://localhost:4010/v1/jobs
curl -H "X-API-Key: test-key" http://localhost:4010/v1/jobs/123e4567-e89b-12d3-a456-426614174000
```

### PostgreSQL Tools (from .cursor/rules/pgtools.mdc)
- For read-only SQL queries: Use `postgresql-mcp` query tool
- For CRUD operations: Use `psql` command line tool

## Architecture

### API-First Design
This is an OpenAPI-driven Express.js server where the API specification (`api/openapi.yaml`) drives the implementation. The request flow is:

```
HTTP Request → Express Middleware → OpenAPI Validator → Controller → Service → Response
```

### Key Components

1. **OpenAPI Specification** (`api/openapi.yaml`):
   - Version 3.0.3 (downgraded from 3.1.0 for compatibility)
   - Defines all endpoints, schemas, and validations
   - Uses `x-openapi-router-controller` and `x-openapi-router-service` for routing

2. **Express Server** (`expressServer.js`):
   - Sets up middleware chain including CORS, body parsing, and OpenAPI validation
   - Uses `express-openapi-validator` for automatic request validation
   - Serves Swagger UI at `/api-docs`

3. **Controllers** (`controllers/`):
   - Thin wrappers that delegate to base `Controller.js`
   - Extract and validate request parameters
   - Pass control to services

4. **Services** (`services/`):
   - Contain business logic
   - Currently use mock data from `api/data.json`
   - Return properly formatted responses

5. **Routing** (`utils/openapiRouter.js`):
   - Custom middleware that routes requests based on OpenAPI specification
   - Maps OpenAPI operations to controller/service methods

### Data Flow
- Mock data is stored in `api/data.json` with 23 realistic job listings
- Services implement search, filtering, and pagination logic
- All responses follow OpenAPI schema definitions

### Security
- API Key authentication required (`X-API-Key` header)
- Input validation through OpenAPI schemas
- CORS enabled for cross-origin requests

## Important Implementation Details

1. **js-yaml Version**: Uses v4.1.0 with `load` method (not deprecated `safeLoad`)

2. **OpenAPI Routing**: Each endpoint must have:
   - `x-openapi-router-controller`: Controller name
   - `x-openapi-router-service`: Service name

3. **Docker Setup**:
   - Production: Multi-stage build, ~150MB image
   - Development: Volume mounting for hot reload
   - Database: PostgreSQL container included but not yet integrated

4. **Current Status**:
   - API-only with mock data
   - Database schema designed but not implemented
   - Ready for PostgreSQL integration (see `TODO.md` for plan)

## Common Pitfalls

1. **OpenAPI Validation Errors**: Ensure OpenAPI spec is valid 3.0.3 format
2. **Mock Data Schema**: Job IDs must be UUIDs, company IDs must match pattern `comp-[a-zA-Z0-9]+`
3. **Port Configuration**: Default port is 4010, configurable in `config.js`
4. **File Uploads**: Upload path is `uploaded_files/`, ensure directory exists

## ESLint Configuration

The project uses ESLint with Airbnb base configuration. The ESLint config is defined in `package.json`:

```json
"eslintConfig": {
  "env": {
    "node": true
  }
}
```

However, there's no npm script for running ESLint. To add linting:

```bash
npx eslint .
```