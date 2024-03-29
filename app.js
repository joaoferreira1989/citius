var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var citius = require('./routes/citius');
var importer = require('./routes/importer');
var admins = require('./routes/admins');
var processes = require('./routes/processes');
var accprocessadmin = require('./routes/accprocessadmin');
var processadmin = require('./routes/processadmin');
const {
  startDailyCron1,
  startDailyCron2,
  startDailyCron3,
  startDailyCron4,
  startWeeklyCron1,
  startWeeklyCron2,
  startWeeklyCron3,
  startWeeklyCron4,
  startMonthlyCron1,
  startMonthlyCron2,
  startMonthlyCron3,
  startMonthlyCron4,
  startMonthlyCron5,
  startMonthlyCron6,
  startMonthlyCron7,
  startMonthlyCron8,
  startMonthlyCron9,
  startMonthlyCron10,
  startMonthlyCron11,
  startMonthlyCron12
} = require('./routes/cron');

var app = express();

// start cron jobs
startDailyCron1();
startDailyCron2();
startDailyCron3();
startDailyCron4();
startWeeklyCron1();
startWeeklyCron2();
startWeeklyCron3();
startWeeklyCron4();
startMonthlyCron1();
startMonthlyCron2();
startMonthlyCron3();
startMonthlyCron4();
startMonthlyCron5();
startMonthlyCron6();
startMonthlyCron7();
startMonthlyCron8();
startMonthlyCron9();
startMonthlyCron10();
startMonthlyCron11();
startMonthlyCron12();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', index);
app.use('/citius', citius);
app.use('/importer', importer);
app.use('/admins', admins);
app.use('/processes', processes);
app.use('/accprocessadmin', accprocessadmin);
app.use('/processadmin', processadmin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
