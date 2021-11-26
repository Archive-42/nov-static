const db = require('./db/models')

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  }
}


const logoutUser = (req, res) => {
  delete req.session.auth
}


const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login')
  }
  next()
}

// resource would be the item you're trying to edit: user, team, project, etc
// this is to prevent a user from editing something that doesn't belong to them
const checkPermissions = (resource, currentUser) => {
  if (resource.userId !== currentUser.id) {
    const err = new Error('Illegal operation.')
    err.status = 403 // Forbidden
    throw err
  }
}


const restoreUser = async (req, res, next) => {
  // Log the session object to the console
  // to assist with debugging.
  // console.log(req.session)

  if (req.session.auth) {
    const { userId } = req.session.auth

    if (!userId) { res.redirect('/users/login') }

    try {
      const user = await db.User.findByPk(userId)

      if (user) {
        res.locals.authenticated = true
        res.locals.user = user
        next()
      } else {
        res.locals.authenticated = false
        next()
      }
    } catch (err) {
      res.locals.authenticated = false
      next(err)
    }
  } else {
    res.locals.authenticated = false
    next()
  }
}


module.exports = {
  loginUser,
  restoreUser,
  logoutUser,
  requireAuth,
  checkPermissions,
}
