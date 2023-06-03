require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const passport = require('passport');

require('./configs/database');
require('./models/users');

app.use(passport.initialize());

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// const path = require('path');

// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, 'dist')));

// // Serve JavaScript files with the appropriate Content-Type
// app.use('/api/product', express.static(path.join(__dirname, 'routes'), { setHeaders: setContentType }));
// app.use('/api/product', express.static(path.join(__dirname, 'models'), { setHeaders: setContentType }));

// function setContentType(res, filePath) {
//   if (path.extname(filePath) === '.js') {
//     res.setHeader('Content-Type', 'application/javascript;charset=utf-8');
//   }
// }



const AdminRoute = require('./routes/admin')
app.use('/api/admin', AdminRoute)

const usersRouter = require('./routes/users')
app.use('/api/user', usersRouter)

const productsRouter = require('./routes/products')
app.use('/api/product', productsRouter)

const cartRouter = require('./routes/cart')
app.use('/api/user', cartRouter)

const orderRouter = require('./routes/orders')
app.use('/api/user', orderRouter)

app.listen(3000, () => console.log('server started'))