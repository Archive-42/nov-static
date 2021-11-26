const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { sessionSecret } = require('./config')
const { restoreUser } = require('./auth')
const path = require('path')

const rootRouter = require('./routes/root')
const userRouter = require('./routes/users')
const teamRouter = require('./routes/team')
const projectRouter = require('./routes/project')
const columnRouter = require('./routes/column')
const taskRouter = require('./routes/task')
const dataRouter = require('./routes/data')

// express configurations
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser(sessionSecret))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  name: 'asana-clone.sid',
  store: new (require('connect-pg-simple')(session))(),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,     // TODO: Add cookie security options
}))

app.use(restoreUser)
// routers
app.use(rootRouter)
app.use(userRouter)
app.use(teamRouter)
app.use(projectRouter)
app.use(columnRouter)
app.use(taskRouter)
app.use(dataRouter)

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.')
  err.status = 404
  next(err)
})

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err)
  }
  next(err)
})

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404)
    res.render('page-not-found', {
      title: 'Page Not Found',
    })
  } else {
    next(err)
  }
})

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const isProduction = process.env.NODE_ENV === 'production'
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  })
})


module.exports = app
