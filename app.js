var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var cors = require("cors");

var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');

var app = express();

var mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(
    "mongodb://localhost/me-inc",
    { useUnifiedTopology: true },
    (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Database connected!");
        }
    }
);

app.use(bodyParser.json())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/product', productRouter);

module.exports = app;
