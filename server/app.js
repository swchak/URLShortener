const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nconf = require("nconf");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const urlMappingsRouter = require("./routes/urlMappings");
const config = require("./local.config.json");

const app = express();

nconf
  .env({ parseValues: true })
  .argv({ parseValues: true })
  .file({ file: config, parseValues: true });

const configJson = nconf.stores.file.file;
console.log(nconf.stores.file.file);

//Set up mongoose connection
const opts = {
  auto_reconnect: false,
  dbName: configJson.DB_NAME,
  user: configJson.DB_USERNAME,
  pass: configJson.DB_PASSWORD,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let db;
try {
  db = mongoose.connect(configJson.DB_HOST, opts);
} catch (err) {
  console.error.bind(console, "MongoDB connection error:");
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", urlMappingsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
