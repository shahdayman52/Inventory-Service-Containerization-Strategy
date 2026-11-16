# FROM: Start from the official Node.js image on the minimal Alpine Linux base.
# Alpine ships only essential OS packages, which shrinks image size (less bloat)
# and reduces the attack surface. Pinning the major version keeps builds reproducible.
FROM node:24-alpine

# WORKDIR: Set /usr/src/app as the working directory for all following instructions
# and for the running container. Docker creates the directory if it does not exist.
WORKDIR /usr/src/app

# COPY: Copy only the dependency manifests (package.json and package-lock.json if present) first.
# This layer changes only when dependencies change, so Docker can reuse the cached
# dependency layer below when only application source code is edited.
COPY package*.json ./

# RUN: Install production dependencies only (no devDependencies) to keep the image lean,
# then clear the npm cache so it is not stored in the image layer.
RUN npm install --omit=dev && npm cache clean --force

# COPY: Copy the remaining build context (application source code) into the image.
# --chown hands ownership to the unprivileged "node" user that the official image provides.
COPY --chown=node:node . .

# EXPOSE: Document that the service listens on port 3000 inside the container.
# (Publishing to the host is done at run time with -p 3000:3000.)
EXPOSE 3000

# USER: Switch from root to the built-in non-root "node" user so the application
# runs with least privilege; a compromised process cannot act as root in the container.
USER node

# CMD: Default command executed when the container starts. Exec (JSON array) form runs
# node directly as PID 1 (no intermediate shell) so it receives stop signals correctly.
CMD ["node", "server.js"]
