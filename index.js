'use strict';

require('dotenv').config();

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production',
    TIMESHEET_ADMINS: process.env.TIMESHEET_ADMINS.split(','),
    FIREBASE_TIMESHEET_APIKEY: process.env.FIREBASE_TIMESHEET_APIKEY,
    FIREBASE_TIMESHEET_AUTHDOMAIN: process.env.FIREBASE_TIMESHEET_AUTHDOMAIN,
    FIREBASE_TIMESHEET_DATABASEURL: process.env.FIREBASE_TIMESHEET_DATABASEURL,
    FIREBASE_TIMESHEET_STORAGEBUCKET: process.env.FIREBASE_TIMESHEET_STORAGEBUCKET,
    FIREBASE_PUMP_APIKEY: process.env.FIREBASE_PUMP_APIKEY,
    FIREBASE_PUMP_AUTHDOMAIN: process.env.FIREBASE_PUMP_AUTHDOMAIN,
    FIREBASE_PUMP_DATABASEURL: process.env.FIREBASE_PUMP_DATABASEURL,
    FIREBASE_PUMP_PROJECTID: process.env.FIREBASE_PUMP_PROJECTID,
    FIREBASE_PUMP_STORAGEBUCKET: process.env.FIREBASE_PUMP_STORAGEBUCKET,
    FIREBASE_PUMP_MESSAGINGSENDERID: process.env.FIREBASE_PUMP_MESSAGINGSENDERID
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

app.get('/playground', function(req, res) {
    res.render('playground', {
        env: env
    });
});

app.get('/timesheet', function(req, res) {
    res.render('timesheet', {
        env: env
    });
});

app.get('/pump', function(req, res) {
    res.render('pump', {
        env: env
    });
});

app.get(/^\/.*(?!(playground|timesheet)).*$/, function(req, res) {
  res.render('index', {
    env: env
  });
});

var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}
