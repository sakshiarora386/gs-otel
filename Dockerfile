FROM node:22-alpine

# Install git, rsync and pnpm (git is required for some dependencies)
RUN apk add --no-cache git rsync
RUN npm install -g pnpm
RUN npm install -g @godspeedsystems/godspeed
RUN npm install -g run-script-os

WORKDIR /app

# Copy everything maintaining directory structure
COPY . .

# Install dependencies
RUN pnpm install

# Build the application
RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]