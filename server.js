const express = require('express');
const morgan = require('morgan');

const app = express();

////////////////////////
// Morgan middlewares
/////////////////////////

app.use(morgan('dev'));
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

const MongoClient = require('mongodb').MongoClient;

const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));

//////////////////////
// Route handlers
/////////////////////

app.use('/', require('./routes/index'));
app.use('/restaurants', require('./routes/restaurants'));
app.use('/users', require('./routes/users'));
app.use('/foods', require('./routes/foods'));

app.use((req, res, next) => {
  console.log('Hello from the middleware!👋');
  next();
});

app.use('/carts', require('./routes/carts'));
require('./routes');

//////////////////////
// Server start
/////////////////////

const port = 8000;
app.listen(port, () => {
  console.log(`We're live on port ${port}`);
});
