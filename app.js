var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registrationRouter = require('./routes/registration');
// var siginRouter       = require('./routes/signin');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//hbs engine setup
// app.set('views', path.join(__dirname,'views'))
// app.set('view engine', 'hbs');

// ejs engine setup
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');



// app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
require('dotenv').config();

// app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/users',registrationRouter); 
// app.use('/login',siginRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 4500
app.listen(port,()=>console.log(`Server is running on port ${port}`));


module.exports = app;
