// app js - file entry aplikasi - routing dan middleware
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// added method override
const methodOverride = require("method-override");
// added express-session
const session = require("express-session");
// added connect-flash
const flash = require("connect-flash");

// define routers
var dashboardRouter = require("./app/dashboard/router");
var categoryRouter = require("./app/category/router");
var postRouter = require("./app/posts/router");
var usersRouter = require("./app/users/router");
// api player router
var playerRouter = require("./app/player/router");

var app = express();
var URL = "/api/v1";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// override method
app.use(methodOverride("_method"));

// use admin lte
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte"))
);

// router login
app.use("/", usersRouter);
// dashboard
app.use("/dashboard", dashboardRouter);
// router category
app.use("/category", categoryRouter);
app.use("/category/create", categoryRouter);
app.use("/category/edit/:id", categoryRouter);
app.use("/category/delete/:id", categoryRouter);
app.use("/category/delete-image/:id", categoryRouter);
// router post
app.use("/post", postRouter);
app.use("/post/create", postRouter);
app.use("/post/edit/:id", postRouter);
app.use("/post/status/:id", postRouter);
app.use("/post/delete/:id", postRouter);
// api
app.use(`${URL}/players`, playerRouter);

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
