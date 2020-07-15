var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const http = require('http');

//const https = require ('https');

console.log(`ready.....`);

let URL = "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010";
/*
http.get("http://weather.livedoor.com/forecast/webservice/json/v1?city=130010", function(res) {
	let x="";
	res.setEncoding('utf8');
	res.on("data", function(chunk) {
		x+=chunk;
	}).on("end",function(){
		console.log(JSON.parse(x));
	});
});
*/
http.get(URL, function(res) {
	var body = '';
	res.setEncoding('utf8');
	
	res.on('data', function(chunk) {
		body += chunk;
	}).on("end",function(){
		res = JSON.parse(body);
		console.log(res.forecasts[0].telop);
		console.log(res.location["city"]);
	});
}).on('error', function(e) {
	console.log(e.message);
});










/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
*/