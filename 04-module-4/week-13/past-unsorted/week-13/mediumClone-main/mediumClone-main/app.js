const express = require("express")
const cookieParser = require("cookie-parser")
const environment = require("./config")
const indexRouter = require("./routes/backend-routes/index")
const frontEndRouter = require("./routes/frontEndRoutes")
const usersRouter = require("./routes/backend-routes/users")
const followsRouter = require("./routes/backend-routes/follows")
const bookmarksRouter = require("./routes/backend-routes/bookmarks")
const likesRouter = require("./routes/backend-routes/likes")
const storiesRouter = require("./routes/backend-routes/stories")
const commentsRouter = require("./routes/backend-routes/comments")
const path = require("path");

const app = express()
app.use(express.json())
app.set("view engine", "pug")
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Dev dependencies
const morgan = require("morgan")
app.use(morgan("dev"))


// Backend Routes
// app.use("api/", indexRouter)
app.use(frontEndRouter)
app.use("/api/users", usersRouter)
app.use("/api/users", followsRouter)
app.use("/api", storiesRouter)
app.use("/api", commentsRouter)
app.use("/api", bookmarksRouter)
app.use("/api", likesRouter)
app.use(express.static(path.join(__dirname, "public")));


// 404 Catch unhandled requests
app.use((req, res, next) => {
  const err = new Error("404 We couldn't find that page.")
  err.title = "404 Not Found"
  err.status = 404
  next(err)
})

// Custom error handlers


// Generic fallback error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const isProductionEnv = environment === "production"

  const errorData = {
    title: err.title || "500 Server Error",
    message: err.message,
    stack: isProductionEnv ? null : err.stack,
    errors: err.errors || []
  }

  if(err.status === 404) res.render("notFound", errorData)

  else { res.json(errorData) }
});

module.exports = app
