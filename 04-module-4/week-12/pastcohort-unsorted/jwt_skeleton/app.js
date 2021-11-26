const express = require('express');
const usersRouter = require('./routes/users');
const app = express();

app.use('/users', usersRouter);

app.listen(5000, () => console.log('app listening on port 5000'));
