// handle resquets

const express = require('express');
const app = express();

const productRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');
//
// app.use((req, res) => {
//   res.status(200).json({
//     message : 'It works'
//   });
// });

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

module.exports = app;
