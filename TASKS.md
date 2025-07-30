# 🚀 Task Commands for JairoJobs

This document provides quick reference for common Docker tasks using the Taskfile.yml.

## 📋 **Quick Start**

```bash
# Show all available tasks
task

# Start development environment
task up-dev

# View logs
task logs-dev

# Stop services
task down
```

## 🔧 **Available Tasks**

### **Build & Run**
- `task build` - Build production Docker image
- `task up` - Start all services (API + Database)
- `task up-dev` - Start development environment with hot reload
- `task down` - Stop all services

### **Logs & Monitoring**
- `task logs` - View API logs
- `task logs-dev` - View development logs
- `task status` - Show service status

### **Testing**
- `task test` - Test API endpoints
- `task test-all` - Test API endpoints

### **Development**
- `task shell` - Open shell in API container

### **Cleanup**
- `task clean` - Clean up Docker resources

## 🎯 **Common Workflows**

### **Development Workflow**
```bash
# Start development environment
task up-dev

# View logs
task logs-dev

# Test API
task test

# Stop when done
task down
```

### **Production Workflow**
```bash
# Build and start production
task build
task up

# Check status
task status

# View logs
task logs

# Stop services
task down
```



## 📊 **Task Variables**

The Taskfile uses these variables:
- `PROJECT_NAME`: jairojobs-api
- `DOCKER_IMAGE`: jairojobs-api
- `API_PORT`: 4010

## 🔍 **Troubleshooting**

### **Common Issues**
1. **Services not starting**: Run `task clean` then `task up-dev`
2. **Port conflicts**: Check if port 4010 is in use

### **Useful Commands**
```bash
# Rebuild everything
task clean && task build && task up-dev

# Check Docker status
docker ps

# View all logs
docker-compose logs -f
```

## 📚 **Additional Resources**

- **Docker Documentation**: See `DOCKER.md`
- **API Documentation**: http://localhost:4010/api-docs
- **OpenAPI Spec**: http://localhost:4010/openapi

---

**Last Updated**: January 27, 2025 