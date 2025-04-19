import express from "express";
import dotenv from "dotenv";

import loggingMiddleware from "./middlewares/loggingMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import logger from "./services/logger";
import { DEFAULT_PORT } from "./configs/configs";
import { getViewsController } from "./controllers/wikiControllers";

dotenv.config();

const app = express();

// Middlewares
app.use(loggingMiddleware);


// Routes
app.get("/", (_, res) => {
    res.send("Server running!")
});

app.get("/get_views", getViewsController);


// Catch-all middleware
app.use(notFoundMiddleware);


// Starting the server
const port = process.env.PORT || DEFAULT_PORT;

app.listen(port, () => {
    logger.info(`Server listening to port: ${port}`);
})
