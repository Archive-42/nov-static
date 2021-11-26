module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
  api: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://medayum.herokuapp.com',
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
}
