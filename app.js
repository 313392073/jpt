var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var bodyparser = require('body-parser');
var session = require('express-session');
var app = express();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const router = require('./routes/route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名 用它来对session cookie签名，防止篡改
  resave : true, //强制保存session即使它并没有变化
  saveUninitialized: true, // 是否保存未初始化的会话 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。
  // rolling:true, //是否按照原设定的 maxAge 值重设 session 同步到 cookie 中
  cookie : {
      maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
      // secure: false
  },
  token:null
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
