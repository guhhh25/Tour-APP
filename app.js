const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});



// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', newTour);
// app.patch('/api/v1/tours/:id', editTourById)
// app.delete('/api/v1/tours/:id', deleteTourById)



//ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


/// PORT

module.exports = app

const port = 2000;
app.listen(port, () => {
  console.log('working...');
});
