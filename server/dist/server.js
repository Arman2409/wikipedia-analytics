"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));

// constants/configs.ts
var WIKIPEDIA_API_URL = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia.org/all-access/all-agents";
var DEFAULT_TTL_IN_MINUTES = 120;
var DEFAULT_PORT = 3030;

// services/logger.ts
var import_chalk = __toESM(require("chalk"));
var Logger = class {
  getTimestamp() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  info(message) {
    const log = `[${import_chalk.default.gray(this.getTimestamp())}] ${import_chalk.default.green("INFO")}: ${message}`;
    console.log(log);
  }
  error(message, err) {
    const errorDetails = err ? `${message}, Error: ${err.message}` : message;
    const log = `[${import_chalk.default.gray(this.getTimestamp())}] ${import_chalk.default.redBright("ERROR")}: ${errorDetails}`;
    console.log(log);
  }
  warn(message) {
    const log = `[${import_chalk.default.gray(this.getTimestamp())}] ${import_chalk.default.yellowBright("WARN")}: ${message}`;
    console.log(log);
  }
  debug(message) {
    const log = `[${import_chalk.default.gray(this.getTimestamp())}] ${import_chalk.default.cyanBright("DEBUG")}: ${message}`;
    console.log(log);
  }
};
var logger_default = new Logger();

// middlewares/loggingMiddleware.ts
var loggingMiddleware = (req, _, next) => {
  const remoteAddr = req.ip || req.socket.remoteAddress || "-";
  const method = req.method;
  const url = req.originalUrl || req.url;
  const referrer = req.get("Referrer") || req.get("Referer") || "-";
  const userAgent = req.get("User-Agent") || "-";
  const logMessage = `"${method}" "${url}" "${remoteAddr}" "${referrer}" "${userAgent}"`;
  logger_default.info(logMessage);
  next();
};
var loggingMiddleware_default = loggingMiddleware;

// middlewares/notFoundMiddleware.ts
var notFoundMiddleware = (_, res) => {
  res.status(404 /* NOT_FOUND */).json({
    error: "Resource not found" /* RESOURCE_NOT_FOUND */
  });
};
var notFoundMiddleware_default = notFoundMiddleware;

// utils/typeGuards.ts
var isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};
var isPositiveInteger = (value) => {
  if (typeof value === "string") {
    const num = Number(value);
    return Number.isInteger(num) && num > 0;
  }
  return typeof value === "number" && Number.isInteger(value) && value > 0;
};

// controllers/utils/periods.ts
var periodsMap = /* @__PURE__ */ new Map([
  [30, "daily"],
  [90, "weekly"],
  [365, "monthly"]
]);

// controllers/utils/validation.ts
var handleGetViewsQueryValidation = (query, res) => {
  let { period, name } = { ...query };
  period = Number(period);
  if (!period || !name) {
    res.status(400 /* BAD_REQUEST */).json({
      error: "Missing query parameter: 'period' or 'name'" /* MISSING_GET_VIEWS_QUERY_PARAMS */
    });
    return;
  }
  if (!isPositiveInteger(period) || !isNonEmptyString(name)) {
    res.status(400 /* BAD_REQUEST */).json(
      { error: "Wrong query parameter type for 'period' or 'name'" /* WRONG_GET_VIEWS_QUERY_PARAMS */ }
    );
    return;
  }
  const granularity = periodsMap.get(period);
  if (!granularity) {
    res.status(400 /* BAD_REQUEST */).json(
      { error: `Period not allowed. Allowed periods are: ${Array.from(periodsMap.keys()).join(", ")}` }
    );
    return;
  }
  return { granularity, period, name };
};

// services/request.ts
var import_axios = __toESM(require("axios"));

// utils/helpers.ts
var getFormattedDate = (dateNumber) => {
  const date2 = new Date(dateNumber);
  const year = date2.getFullYear();
  const month = String(date2.getMonth() + 1).padStart(2, "0");
  const day = String(date2.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};
var safeParse = (input) => {
  try {
    return JSON.parse(input);
  } catch (_) {
    return input;
  }
};

// services/request.ts
var RequestHandler = class _RequestHandler {
  static instance = null;
  axiosInstance;
  constructor() {
    const requestBaseUrl = WIKIPEDIA_API_URL;
    this.axiosInstance = import_axios.default.create({
      baseURL: requestBaseUrl
    });
    console.log("Request class initialized with:", requestBaseUrl);
  }
  static getInstance() {
    if (!_RequestHandler.instance) {
      _RequestHandler.instance = new _RequestHandler();
    }
    return _RequestHandler.instance;
  }
  async getPageData(argsObj) {
    try {
      let { name, period, granularity } = { ...argsObj };
      const currentDate = Date.now();
      const startDate = currentDate - period * 24 * 60 * 60 * 1e3;
      console.log("curr", currentDate);
      console.log("start", startDate, new Date(startDate));
      if (granularity === "weekly") granularity = "daily";
      const url = `/${name}/${granularity}/${getFormattedDate(startDate)}/${getFormattedDate(currentDate)}`;
      console.log(url);
      const result = await this.axiosInstance.get(url);
      return result.data;
    } catch (err) {
      return null;
    }
  }
};
var request_default = RequestHandler.getInstance();

// services/cache.ts
var import_redis = require("redis");
var RedisClient = class _RedisClient {
  static instance;
  redisClient;
  constructor() {
    if (!this.redisClient) {
      try {
        const redisClient = (0, import_redis.createClient)({
          url: process.env.REDIS_URL
        });
        redisClient.connect().then(() => {
          logger_default.info("Connected to Redis");
        });
        this.redisClient = redisClient;
      } catch (err) {
        logger_default.error("Failed to connect to Redis", err);
      }
    }
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new _RedisClient();
    }
    return this.instance;
  }
  getStorageKey(key, identificator) {
    return key + (identificator ? `_${identificator}` : "");
  }
  async set(key, value, identificator, ttlInMinutes = DEFAULT_TTL_IN_MINUTES) {
    if (!this.redisClient) {
      logger_default.warn("Redis not connected!");
      return;
    }
    const storageKey = this.getStorageKey(key, identificator);
    try {
      await this.redisClient.set(
        storageKey,
        JSON.stringify(value),
        {
          EX: ttlInMinutes * 60 * 1e3
        }
      );
    } catch (err) {
      logger_default.error("Failed to set value in Redis", err);
    }
  }
  async get(key, identificator) {
    if (!this.redisClient) {
      logger_default.warn("Redis not connected!");
      return;
    }
    try {
      const storageKey = this.getStorageKey(key, identificator);
      const result = await this.redisClient.get(storageKey);
      if (!result) return;
      return safeParse(result);
    } catch (err) {
      logger_default.error("Failed to set value in Redis", err);
    }
  }
  async remove(key, identificator) {
    if (!this.redisClient) {
      console.warn("Redis not connected!");
      return;
    }
    const storageKey = this.getStorageKey(key, identificator);
    try {
      await this.redisClient.del(storageKey);
    } catch (err) {
      logger_default.error("Failed to set value in Redis", err);
    }
  }
  async disconnect() {
    if (this.redisClient) {
      try {
        await this.redisClient.disconnect();
      } catch (err) {
        logger_default.warn("Failed to disconnect");
      }
    } else {
      logger_default.warn("Redis not connected!");
    }
  }
};
var cache_default = RedisClient.getInstance();

// models/utils/helpers.ts
var formatTimestamp = (timestamp, granularity) => {
  console.log(timestamp);
  if (granularity === "daily") {
    const day = parseInt(timestamp.slice(6, 8), 10);
    return String(day);
  } else if (granularity === "weekly") {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } else if (granularity === "monthly") {
    const month = parseInt(timestamp.slice(4, 6), 10) - 1;
    console.log("monthly", month);
    return String(month);
  }
  throw new Error(`Unsupported granularity: ${granularity}`);
};
var transformPageViews = (data, period) => {
  console.log("here");
  const granularity = periodsMap.get(period);
  if (!granularity) {
    throw new Error(`Invalid period: ${period}`);
  }
  const labels = [];
  const views = [];
  if (granularity === "weekly") {
  }
  console.log({ granularity });
  data.forEach((item) => {
    labels.push(formatTimestamp(item.timestamp, granularity));
    views.push(item.views);
  });
  return {
    labels,
    views
  };
};

// models/getViewsModel.ts
var getViewsModel = async (validationResult, res) => {
  try {
    const { name, period } = { ...validationResult };
    const cachedResult = await cache_default.get(name, period);
    if (cachedResult) {
      res.status(200 /* OK */).json(cachedResult);
      return;
    }
    const result = await request_default.getPageData(validationResult);
    if (!result?.items) {
      res.status(404 /* NOT_FOUND */).json({
        error: "Resource not found" /* RESOURCE_NOT_FOUND */
      });
      return;
    }
    const data = transformPageViews(result.items, validationResult.period);
    res.status(200 /* OK */).json(data);
  } catch (err) {
    logger_default.error(`${"Failed to retrieve page views" /* FAILED_TO_GET_VIEWS */}: ${err}`);
    res.status(500 /* INTERNAL_SERVER_ERROR */).json({
      error: "Failed to retrieve page views" /* FAILED_TO_GET_VIEWS */
    });
  }
};
var getViewsModel_default = getViewsModel;

// controllers/getViewsController.ts
var getViewsController = async (req, res) => {
  try {
    const validationResult = handleGetViewsQueryValidation(req.query, res);
    if (!validationResult) {
      return;
    }
    getViewsModel_default(validationResult, res);
  } catch (err) {
    console.warn(`${"Failed to retrieve page views" /* FAILED_TO_GET_VIEWS */}: ${err}`);
    res.status(500 /* INTERNAL_SERVER_ERROR */).json({
      error: "Failed to retrieve page views" /* FAILED_TO_GET_VIEWS */
    });
  }
};
var getViewsController_default = getViewsController;

// controllers/healthCheckController.ts
var healthCheckController = (_, res) => {
  res.status(200 /* OK */).json({
    info: "Server running!"
  });
};
var healthCheckController_default = healthCheckController;

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use((0, import_cors.default)({ origin: "*" }));
app.use(loggingMiddleware_default);
app.get("/", healthCheckController_default);
app.get("/get_views", getViewsController_default);
app.use(notFoundMiddleware_default);
var port = process.env.PORT || DEFAULT_PORT;
app.listen(port, () => {
  logger_default.info(`Server listening to port: ${port}`);
});
//# sourceMappingURL=server.js.map