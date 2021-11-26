const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
const tweetsRouter = require("./routes/api/tweets");
const usersRouter = require("./routes/api/users");
const { environment } = require("./config");
const path = require("path");

const app = express();
// Set the pug view engine.
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/tweets", tweetsRouter);
app.use("/api/users", usersRouter);

app.use(express.static(path.join(__dirname, "public")));

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource not Found";
  err.status = 404;
  next(err);
});

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    // Add an errors property wtih all the different validation errors
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

// Error handler that returns the correct type of data
// based on the `Accept` header
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  const acceptHeader = req.get("Accept");
  console.log(acceptHeader);

  const errorData = {
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
    errors: err.errors || []
  }

  if (acceptHeader.startsWith('text/html')) {
    res.render('error-page', errorData)
  } else if (acceptHeader.startsWith('application/json')) {
    res.json(errorData);
  } else {
    res.send("Server Error");
  }
});

module.exports = app;
