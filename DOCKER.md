# 🐳 Docker Setup for JairoJobs API (API-Only)

This document provides comprehensive instructions for running the JairoJobs API using Docker.

## 📋 **Prerequisites**

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 1GB of available RAM
- 5GB of available disk space

## 📊 **Current Architecture**

This Docker setup provides an **API-only** architecture with:
- **Production API**: Optimized for deployment
- **Development API**: Hot reload for development
- **Mock Data**: 23 realistic job listings
- **No Database Dependencies**: Simplified deployment

## 🚀 **Quick Start**

### **Production Environment**

```bash
# Build and start API service
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down
```

### **Development Environment**

```bash
# Start with development profile
docker-compose --profile dev up -d

# View logs for development
docker-compose logs -f api-dev

# Stop development services
docker-compose --profile dev down
```

## 🏗️ **Architecture**

### **Services**

1. **API Service** (`jairojobs-api`)
   - Express.js application
   - Port: 4010
   - Health check endpoint: `/hello`

2. **Development API Service** (`jairojobs-api-dev`)
   - Express.js application with hot reload
   - Port: 4011
   - Development environment with volume mounting

### **Volumes**

- `./logs`: Application logs
- `./uploaded_files`: File uploads
- `./`: Source code (development only)

## 🔧 **Configuration**

### **Environment Variables**

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `PORT` | `4010` | API server port |

## 📦 **Docker Images**

### **Production Image**
- **Base**: `node:18-alpine`
- **Size**: ~150MB
- **Security**: Non-root user
- **Optimization**: Multi-stage build

### **Development Image**
- **Base**: `node:18-alpine`
- **Size**: ~200MB
- **Features**: Hot reload, dev dependencies

## 🛠️ **Build Commands**

### **Production Build**

```bash
# Build production image
docker build -t jairojobs-api:latest .

# Build with specific target
docker build --target production -t jairojobs-api:prod .
```

### **Development Build**

```bash
# Build development image
docker build -f Dockerfile.dev -t jairojobs-api:dev .

# Build with builder target
docker build --target builder -t jairojobs-api:builder .
```

## 🧪 **Testing**

### **Health Checks**

```bash
# Check API health
curl http://localhost:4010/hello

# Check development API health
curl http://localhost:4011/hello
```

### **API Testing**

```bash
# Test API endpoints
curl -H "X-API-Key: test-key" http://localhost:4010/v1/jobs

# Test with parameters
curl -H "X-API-Key: test-key" "http://localhost:4010/v1/jobs?q=developer&page=1&limit=10"
```

## 🔍 **Monitoring**

### **Container Logs**

```bash
# View all logs
docker-compose logs

# Follow API logs
docker-compose logs -f api

# Follow development API logs
docker-compose logs -f api-dev
```

### **Container Status**

```bash
# Check container status
docker-compose ps

# Check resource usage
docker stats
```



## 🔧 **Troubleshooting**

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :4010
   
   # Stop conflicting service
   sudo kill -9 <PID>
   ```

2. **API Connection Issues**
   ```bash
   # Check API status
   curl http://localhost:4010/hello
   
   # Restart API service
   docker-compose restart api
   ```

3. **Permission Issues**
   ```bash
   # Fix volume permissions
   sudo chown -R $USER:$USER ./logs ./uploaded_files
   ```

### **Debug Commands**

```bash
# Enter API container
docker-compose exec api sh

# Enter development API container
docker-compose exec api-dev sh

# View container details
docker-compose exec api cat /etc/passwd
```

## 📊 **Performance**

### **Resource Requirements**

- **API Container**: 512MB RAM, 1 CPU
- **Development API Container**: 512MB RAM, 1 CPU
- **Total**: 1GB RAM, 2 CPU cores

### **Optimization Tips**

1. **Use Alpine Images**: Smaller footprint
2. **Multi-stage Builds**: Reduce final image size
3. **Volume Mounts**: Persistent data storage
4. **Health Checks**: Automatic container monitoring
5. **Development Hot Reload**: Source code mounting for faster development

## 🔒 **Security**

### **Security Features**

- Non-root user in containers
- Read-only filesystem where possible
- Health checks for monitoring
- Environment variable configuration
- Network isolation

### **Best Practices**

1. **Never run as root**
2. **Use specific image tags**
3. **Scan images for vulnerabilities**
4. **Keep base images updated**
5. **Use secrets for sensitive data**

## 📚 **Additional Resources**

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Express.js Docker Guide](https://expressjs.com/en/advanced/best-practices-performance.html)

## 🤝 **Support**

For Docker-related issues:
1. Check container logs: `docker-compose logs`
2. Verify configuration: `docker-compose config`
3. Restart services: `docker-compose restart`
4. Rebuild images: `docker-compose build --no-cache`
5. Test API health: `curl http://localhost:4010/hello` 