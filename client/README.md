# Client


## Overview

The `client` directory contains the frontend code for the Wikipedia Analytics application. It is built using TypeScript and Tailwind CSS. The client handles the user interface, user interactions, and API communication with the server, utilizing libraries like Axios for HTTP requests and Chart.js for data visualization.


## Setup

1. **Install Node.js and NPM**: Ensure Node.js and NPM are installed.

2. **Install dependencies**: Run in the `client` directory:

```bash
npm install
```

3. **Run the prebuild commands**: Create the folders for static files:

```bash
npm run prebuild:js;
npm run prebuild:tailwind
```

4. **Build the project**: Compile and bundle the TypeScript code and Tailwind CSS:

```bash
npm run build:js;
npm run build:tailwind
# or for development
npm run build:js:dev;
npm run build:tailwind:dev
```

5. Open the ./client/index.html file in your web browser to view the application.


## Directory Structure

```
client/
├── assets/                 # Static assets
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


## Key Scripts

- `npm run build:js`: Builds the TypeScript code using TSUP.
- `npm run build:js:dev`: Builds the TypeScript code with watch mode for development.
- `npm run build:tailwind`: Compiles Tailwind CSS to `dist/styles/tailwind-output.css`.
- `npm run build:tailwind:dev`: Compiles Tailwind CSS with watch mode for development.
- `npm run prebuild:js`: Creates the `dist/js` directory for JavaScript output.
- `npm run prebuild:tailwind`: Creates the `dist/styles` directory for CSS output.


## Notes

- Tailwind CSS is configured in `styles/tailwind-input.css`, with output generated to `dist/styles/tailwind-output.css`.
- API requests are managed in `src/services/request.ts` using Axios, with caching in `src/services/cache.ts`.
- State management is handled in `src/state/store.ts`.
- Ensure the server is running (see `server/README.md`) for API connectivity.
- The `dist` directory is used for build outputs (`dist/js` for JavaScript, `dist/styles` for CSS).