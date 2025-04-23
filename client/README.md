# Client


## Overview

The `client` directory contains the frontend code for the Wikipedia Analytics application. It is built using TypeScript and Tailwind CSS. The client handles the user interface, user interactions, and API communication with the server, utilizing libraries like Axios for HTTP requests and Chart.js for data visualization.


## Setup

1. **Install Node.js and NPM**: Ensure Node.js and NPM are installed.

2. **Install dependencies**: Run in the `client` directory:

```bash
npm install
```

3. Set up the environment variables in the .env file(you can find them in the .env.example file as well):
  
```
BASE_API_URL=your-api-url
```

3. **Build the project**: Compile and bundle the TypeScript code and Tailwind CSS:

```bash
npm run build
```

4. Open the ./dist/index.html file in your web browser to view the application.


## Directory Structure

```
client/
├── assets/                 # Static assets
├── src/                    # Source code
│   ├── components/         # UI components, DOM manipulation
│   ├── constants/          # Configuration and constants
│   ├── services/           # API and caching logic
│   ├── state/              # State management
│   ├── handlers/           # Functions for handling data
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
├── styles/                 # CSS styles
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tsup.config.ts          # TSUP configuration
```


## Key Scripts

- `npm run build`: Builds the project.
- `npm run prebuild`: Creates the `dist/js/` and `dist/css/` directories for the output.
- `npm run copy:static`: Copies `index.html` and `assests` to `dist` folder.
- `npm run build:js`: Builds the TypeScript code using TSUP.
- `npm run build:js:dev`: Builds the TypeScript code with watch mode for development.
- `npm run build:tailwind`: Compiles Tailwind CSS to `dist/styles/bundle.css`.
- `npm run build:tailwind:dev`: Compiles Tailwind CSS with watch mode for development.
- `npm run prebuild:tailwind`: Creates the `dist/styles` directory for CSS output.
- `npm run typecheck`: Implements TypeScript checking.


## Notes

- Tailwind CSS is configured in `styles/input.css`, with output generated to `dist/styles/bundle.css`.
- API requests are managed in `src/services/request.ts` using Axios, with caching in `src/services/cache.ts`.
- State management is handled in `src/state/store.ts`.
- Ensure the server is running (see `server/README.md`) for API connectivity.
- The `dist` directory is used for build outputs (`dist/js` for JavaScript, `dist/styles` for CSS).