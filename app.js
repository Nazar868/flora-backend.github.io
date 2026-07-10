const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger/swagger.json");
const bouquetsRouter = require("./routes/bouquetsRouter");
const errorHandler = require("./middlewares/errorHandler");
const HttpError = require("./helpers/HttpError");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Serve uploaded photos statically
app.use("/public", express.static(path.resolve(__dirname, "public")));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/bouquets", bouquetsRouter);

// 404 for unknown routes
app.use((req, res, next) => {
  next(new HttpError(404, "Not found"));
});

// Centralized error handler — must be last
app.use(errorHandler);

module.exports = app;
