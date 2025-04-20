import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { DEFAULT_PORT } from "./configs/configs";
import loggingMiddleware from "./middlewares/loggingMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import logger from "./services/logger";
import getViewsController from "./controllers/getViewsController";
import healthCheckController from "./controllers/healthCheckController";

// Set up
dotenv.config();
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
