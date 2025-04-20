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

// configs/configs.ts
var WIKIPEDIA_API_URL = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia.org/all-access/all-agents";
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
  res.status(404 /* NOT_FOUND */).send({
    error: "Resource not found" /* RESOURCE_NOT_FOUND */
  });
};
var notFoundMiddleware_default = notFoundMiddleware;

// utils/type-guards.ts
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
    res.status(400 /* BAD_REQUEST */).send(
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
  const date = new Date(dateNumber);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
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
      if (granularity === "weekly") granularity = "daily";
      const url = `/${name}/${granularity}/${getFormattedDate(startDate)}/${getFormattedDate(currentDate)}`;
      const result = await this.axiosInstance.get(url);
      return result.data;
    } catch (err) {
      return null;
    }
  }
};
var request_default = RequestHandler.getInstance();

// handlers/utils/helpers.ts
var formatTimestamp = (timestamp, granularity) => {
  const date = new Date(Number(`${timestamp.slice(0, 8)}0000`));
  if (granularity === "daily") {
    return String(date.getDate());
  } else if (granularity === "weekly") {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } else if (granularity === "monthly") {
    return date.getMonth().toLocaleString();
  }
  throw new Error(`Unsupported granularity: ${granularity}`);
};
var transformPageViews = (data, period) => {
  const granularity = periodsMap.get(period);
  if (!granularity) {
    throw new Error(`Invalid period: ${period}`);
  }
  if (granularity === "weekly") {
    const weeklyMap = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const date = new Date(Number(`${item.timestamp.slice(0, 8)}0000`));
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const label = startOfWeek.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      const currentViews = weeklyMap.get(label) || 0;
      weeklyMap.set(label, currentViews + item.views);
    });
    return {
      labels: [...weeklyMap.keys()],
      views: [...weeklyMap.values()]
    };
  }
  const labels = [];
  const views = [];
  data.forEach((item) => {
    labels.push(formatTimestamp(item.timestamp, granularity));
    views.push(item.views);
  });
  return {
    labels,
    views
  };
};

// handlers/getViewsHandler.ts
var getViewsHandler = async (validationResult, res) => {
  try {
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
var getViewsHandler_default = getViewsHandler;

// controllers/getViewsController.ts
var getViewsController = async (req, res) => {
  try {
    const validationResult = handleGetViewsQueryValidation(req.query, res);
    if (!validationResult) {
      return;
    }
    getViewsHandler_default(validationResult, res);
  } catch (err) {
    console.warn(`${"Failed to retrieve page views" /* FAILED_TO_GET_VIEWS */}: ${err}`);
    res.status(500 /* INTERNAL_SERVER_ERROR */).send("Failed to retrieve page views" /* FAILED_TO_GET_VIEWS */);
  }
};
var getViewsController_default = getViewsController;

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use((0, import_cors.default)({
  origin: "*"
}));
app.use(loggingMiddleware_default);
app.get("/", (_, res) => {
  res.send("Server running!");
});
app.get("/get_views", getViewsController_default);
app.use(notFoundMiddleware_default);
var port = process.env.PORT || DEFAULT_PORT;
app.listen(port, () => {
  logger_default.info(`Server listening to port: ${port}`);
});
//# sourceMappingURL=server.js.map