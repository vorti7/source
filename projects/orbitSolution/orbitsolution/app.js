var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var class_chart = require('./routes/class_chart');
var class_management = require('./routes/class_management');
var student_management = require('./routes/student_management');
var contents_store = require('./routes/contents_store');
var my_documents = require('./routes/my_documents');
var task_quiz = require('./routes/task_quiz');
var study = require('./routes/study');
var work_dashboard = require('./routes/work_dashboard');
var register = require('./routes/register');
var show = require('./routes/show');
var pickShow = require('./routes/pickShow');
var pickRegister = require('./routes/pickRegister');
var postData = require('./routes/postData');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', my_documents);

app.use('/class_chart', class_chart);
app.use('/class_management', class_management);
app.use('/student_management', student_management);
app.use('/contents_store', contents_store);
app.use('/my_documents', my_documents);
app.use('/task_quiz', task_quiz);
app.use('/study', study);
app.use('/work_dashboard', work_dashboard);
app.use('/register', register);
app.use('/show', show);
app.use('/pickShow', pickShow);
app.use('/pickRegister', pickRegister);
app.use('/postData', postData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
