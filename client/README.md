# Client README

## Overview

The `client` directory contains the frontend code for the Wikipedia Analytics application. It is built using TypeScript and Tailwind CSS. The client handles the user interface, user interactions, and API communication with the server, utilizing libraries like Axios for HTTP requests and Chart.js for data visualization.

## Directory Structure

```
client/
├── assets/                 # Static assets (e.g., favicon, logo)
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── constants/          # Configuration and constants
│   ├── services/           # API and caching logic
│   ├── state/              # State management
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
├── styles/                 # CSS styles
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── tsup.config.ts          # TSUP configuration
```

## Setup

1. **Install Node.js and NPM**: Ensure Node.js is installed.

2. **Install Dependencies**: Run in the `client` directory:

   ```bash
   npm install
   ```

3. **Build the Project**: Compile and bundle the TypeScript code and Tailwind CSS:

   ```bash
   bun run build:js
   bun run build:tailwind
   // or for development
   bun run build:js:dev
   bun run build:tailwind:dev
   ```

4. Open the ./client/index.html file in your web browser to view the application."

## Key Scripts

- `bun run build:js`: Builds the TypeScript code using TSUP.
- `bun run build:js:dev`: Builds the TypeScript code with watch mode for development.
- `bun run build:tailwind`: Compiles Tailwind CSS to `dist/styles/tailwind-output.css`.
- `bun run build:tailwind:dev`: Compiles Tailwind CSS with watch mode for development.
- `bun run prebuild:js`: Creates the `dist/js` directory for JavaScript output.
- `bun run prebuild:tailwind`: Creates the `dist/styles` directory for CSS output.


## Notes

- Tailwind CSS is configured in `styles/tailwind-input.css`, with output generated to `dist/styles/tailwind-output.css`.
- API requests are managed in `src/services/request.ts` using Axios, with caching in `src/services/cache.ts`.
- State management is handled in `src/state/store.ts`.
- Ensure the server is running (see `server/README.md`) for API connectivity.
- The `dist` directory is used for build outputs (`dist/js` for JavaScript, `dist/styles` for CSS).