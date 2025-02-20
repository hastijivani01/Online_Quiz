// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// const cors = require('cors')
// var app = express();

// app.use(cors())



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var questionsRouter = require('./routes/questions')
// var userRouter = require('./routes/user')



// const { default: mongoose } = require('mongoose');
// const { error } = require('console'); 

// mongoose.connect('mongodb://localhost:27017/quiz_play')
// .then((res) => {
//   console.log("Connection SuccessFully!");
  
// })
// .catch((Error) => {
//   console.log(Error);
  
// })


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/user', userRouter)
// app.use('/question', questionsRouter)



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user')
const questionsRouter = require('./routes/questions');

mongoose
  .connect('mongodb://localhost:27017/quiz_play')
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter)
app.use('/question', questionsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
