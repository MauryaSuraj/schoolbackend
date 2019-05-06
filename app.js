// handle resquets

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');

// connection for mongo db  here

mongoose.connect('mongodb+srv://surajmaurya:'+ process.env.MONGO_ATLAS_PW +'@node-shop-s8ng2.mongodb.net/test?retryWrites=true',{
  useNewUrlParser : true
});


// logger middleware
app.use(morgan('dev'));
// body parser
app.use(bodyParser.urlencoded({
  extended : false
}));
app.use(bodyParser.json());

//allow header access control here
// cors error are handle here
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorizarion"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE');
    return res.status(200).json({});
  }
  next();
});

//
// app.use((req, res) => {
//   res.status(200).json({
//     message : 'It works'
//   });
// });

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;
