# Command Cheat Sheet: Inventory Service Image Lifecycle

All commands run from the `inventory-service/` directory (the build context containing the `Dockerfile`).

## 1. Build the Image

The Docker CLI sends the build context to the Docker Engine daemon (`dockerd`) through its REST API; `dockerd` executes the Dockerfile and stores the resulting immutable image.

```bash
docker build -t inventory-service:v1 .
```

## 2. Run the Container

Run in detached mode (`-d`), mapping host port 3000 to container port 3000 (`-p host:container`).

```bash
docker run -d -p 3000:3000 inventory-service:v1
```

## 3. Push to Docker Hub

```bash
# Authenticate the Docker CLI with Docker Hub
docker login

# Tag the local image with the Docker Hub repository name
docker tag inventory-service:v1 shahdayman5252/inventory-service:v1

# Push the tagged image to the remote Docker Hub repository
docker push shahdayman5252/inventory-service:v1
```
