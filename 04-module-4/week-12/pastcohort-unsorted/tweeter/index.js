const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { User, Tweet } = require('./models');
const app = express();

const csrfProtection = csrf({ cookie: true });

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(cookieParser());
app.use(session({ secret: 'superSecret' }));
app.use(express.urlencoded({ extended: true }));

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.get('/', async (req, res, next) => {
  console.log(req.session);
  const tweets = await Tweet.findAll({ include: User, order: [['createdAt', 'DESC']] });
  res.render('index', { tweets, user: req.session.user });
});

app.get('/tweets/new', csrfProtection, async (req, res) => {
  const users = await User.findAll({});
  res.render('create-tweet', { users, csrfToken: req.csrfToken() });
});

app.post('/tweets', csrfProtection, async (req, res) => {
  const { body, userId } = req.body;
  await Tweet.create({ body, userId });
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

app.get('/login', csrfProtection, (req, res) => {
  res.render('login', { csrf: req.csrfToken() });
});

app.post(
  '/login',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const isPassword = await bcrypt.compare(password, user.hashedPassword);
    if (isPassword) {
      console.log(req.session);
      req.session.user = user;
      res.redirect('/');
    } else {
      res.render('login', { errors: ['invalid credentials'] });
    }
  })
);

app.get('/register', csrfProtection, (req, res) => {
  res.render('register', { csrf: req.csrfToken() });
});

app.post(
  '/register',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { password, email, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ email, username, hashedPassword });
    req.session.user = user;
    res.redirect('/');
  })
);

// const session = {
//   fuiehfierfreidf: {
//     cookie: {},
//     auth: {
//       userId: 9,
//     },
//   },
// };

// req.session = session['fuiehfierfreidf']

app.listen(5000, () => {
  console.log('listening on port 5000');
});
