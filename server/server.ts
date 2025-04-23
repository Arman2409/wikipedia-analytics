import express from "express";
import cors from "cors";

import "./crons/archiveCron";
import { DEFAULT_PORT } from "./constants/configs";
import logger from "./services/logger";
import loggingMiddleware from "./middlewares/loggingMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import getViewsController from "./controllers/getViewsController";
import healthCheckController from "./controllers/healthCheckController";


// Set up
const app = express();


// Middlewares
app.use(cors({ origin: '*' }))
app.use(loggingMiddleware);


// Routes
app.get("/", healthCheckController);
app.get("/get_views", getViewsController);


// Catch-all middleware
app.use(notFoundMiddleware);

// Start the server
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
    logger.info(`Server listening to port: ${port}`);
})
