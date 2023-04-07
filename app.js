var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载express-session，用来设置session值
var session        = require('client-sessions');
var cookieParase   = require('cookie-parser');
//加载系统日志模块
const winston        = require('winston');
const expressWinston = require('express-winston');
const url = require('url');

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(cookieParase('secret'));
app.use(cookieParser());


//allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});




// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: './logs/success.log'  //成功的日志记录在log/success.log
    })
  ]
}));


//console.log(__dirname);
//console.log(__dirname + '/uploads/pic/merchant');
//设置静态文件托管
//当用户访问的URL以/img开始，那么直接返回对应__dirname + '/uploads/pic'下文件
app.use('/smallmall',express.static(__dirname + '/uploads/pic/smallmall'));
/*
 * 划分接口模块
 * */
app.use('/api',require('./routes/Api'));
app.use('/smallmall',require('./routes/Smallmall'));
//记录错误的日志信息
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: './logs/error.log'   //失败的日志记录在log/success.log
    })
  ]
}));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.send({title: '404: API Not Found'});
});
app.post('*', function(req, res){
  res.send({title: '404: API Not Found'});
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
      result = {"status": -1};
      result["error"] = "SyntaxError!";
      return res.json(result);
  } else {
    next();
  }
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});
module.exports = app;
