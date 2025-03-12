// importing express
const express = require('express');
// import cors
const cors = require('cors');

// import morgan
const morgan = require('morgan');

// importing dotenv
const dotenv = require('dotenv');

// configure dotenv
dotenv.config();

// import routes
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

// import db
const dbConnection = require('./database/config');

// we are creating an instance of express
const app = express();

// Body parse for json data
app.use(express.json());

// allow cors
app.use(cors());

// use morgan only in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// morgan
// define a port
const port = process.env.PORT;

// define a hostname
const hostname = process.env.HOSTNAME;


// define root and functionalities
app.get('/', (req, res) => {
  res.send(`
    <h1 style="text-align: center;margin-top: 50px; color: powderBlue">Welcome to Job Portal App APIS</h1>
    `);
});

// routes
app.use('/v1', jobRoutes);
app.use('/v1', userRoutes);
app.use('/v1', authRoutes);

dbConnection();

// listen to the server
app.listen(port, async () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});