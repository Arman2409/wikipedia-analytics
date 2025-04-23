# Server


## Overview

The `server` directory contains the backend code for the application. It is built using TypeScript, Express.js, Redis. The server provides API endpoints for the client, manages data, and handles requests.


## Setup

1. **Install Node.js and NPM**: Ensure Node.js and NPM aren installed. 

2. **Install Dependencies**: Run in the `server` directory:

```bash
npm install
```

3. Set up the environment variables(you can find them in the .env.example file as well):
  
```
PORT=<your-port>
REDIS_URL=<your-redis-url>
```

4. **Build the Project**: Compile the code:

```bash
npm run build
# or for development
npm run build:dev
```

5. **Start the Server**: Run the production server:

```bash
npm run start
# or for development
npm run start:dev
```

## Directory Structure

```
server/
├── constants/              # Configuration and response constants
├── controllers/            # Request handlers
│   ├── utils/              # Controller utilities
├── middlewares/            # Middleware for request processing
├── models/                 # Data models and logic
│   ├── utils/              # Model utilities
├── services/               # Business logic
│   ├── utils/              # Service utilities
├── types/                  # TypeScript types
├── crons/                  # Cron jobs
├── utils/                  # General utilities
├── server.ts               # Server entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tsup.config.ts          # TSUP configuration
```


## Key Scripts

- `npm run build`: Builds the TypeScript code using TSUP.
- `npm run build:dev`: Builds the TypeScript code with watch mode for development.
- `npm run start`: Starts the server.
- `npm run start:dev`: Starts the server with watch mode for development.
- `npm run typecheck`: Implements TypeScript checking.


## Notes

- The server entry point is `server.ts`, which sets up routes and middleware.
- API endpoints are defined in `controllers/` (e.g., `getViewsController.ts`).
- Middleware for logging and 404 handling is in `middlewares/`.
- Caching is implemented in `services/cache.ts`.
- Set required environment variables (e.g., port, API keys) in a `.env` file.
