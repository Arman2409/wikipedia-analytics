# Wikipedia Analytics

## Overview

The Wikipedia Analytics is a web application that displays page view statistics for Wikipedia articles. It is a full stack app built with `TypeScript`, featuring a frontend built with `HTML`, `Tailwind CSS`, and `Chart.js`, and a backend powered by `Node.js`, `Express.js`, and `Redis`. The application fetches data from the `Wikimedia API`, visualizes it in grouped bar charts, and supports period-based filtering (e.g., 30, 90, 365 days) with frontend and backend caching for performance.


## Prerequisites

- **Node.js and NPM**: Required for running the app. Version 22 or higher recommended for Node.js.
- **Git**: For cloning and managing the repository.
- **Redis**: For server-side caching.


## Setup

1. **Clone the Repository**:

```bash
git clone https://github.com/Arman2409/wikipedia-analytics.git;
cd wikipedia-analytics
```

2. **Run locally**

Refer to the documentation in both the `client` and `server` directories to learn how to set up and run each component locally.


## Key Features

- **Data visualization**: Grouped bar charts display Wikipedia page view statistics, powered by Chart.js.
- **Period filters**: Users can select time periods (e.g., 30, 90, 365 days) for data analysis.
- **Wikipedia page Search**: Users can search for Wikipedia pages and choose from suggestions.
- **Frontend caching**: Reduces API calls by caching responses in the browser's local storage.
- **API integration**: Backend fetches data from the Wikimedia API.
- **Backend caching**: Reduces the number of requests to the internal API by caching data in a Redis database.
- **Validation and response handling**: The backend validates request data for various cases and sends appropriate status codes during request handling.

# Structure

Refer to the documentation in both the `client` and `server` directories to learn the structure of each component.You can list the structure of the project in terminal by this command:

```bash
chmod +x ./list_structure.sh;
./list_structure.sh
```