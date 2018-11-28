var express = require('express'),
    cors = require('cors'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    services = require('./routes/services'),
    streams = require('./routes/streams')

require('./cron-tasks')

var app = express()

// enable cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())

app.use('/services/', services)

app.use('/streams/:videoId', streams)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

// db connection
mongoose.connect('mongodb://localhost/LaBanane')

module.exports = app
