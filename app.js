const fs = require('fs');
const express = require('express');
const { rawListeners } = require('process');

const app = express();

//Middleware
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

//'API DATA AND FUNCTIONS TOUR'
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  if (!tours.length) return;

  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;
  try {
    const tour = tours.find((el) => el.id === id);
    if (tour.length === 0) return;
    res.status(200).json({
      data: {
        status: 'sucess',
        tour,
      },
    });
  } catch (error) {
    res.status(404).send({
      data: {
        status: 'Data not found',
      },
    });
  }
};

const newTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // add a ID to req.body object
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const editTourById = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: req.body,
    },
  });
};

const deleteTourById = (req, res) => {
  res.send({
    status: 'sucess',
    data: req.body,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', newTour);
// app.patch('/api/v1/tours/:id', editTourById)
// app.delete('/api/v1/tours/:id', deleteTourById)

//USER DATA AND FUNCTIONS////
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not defined!',
  });
};
const getUserById = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not defined!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not defined!',
  });
};
const EditUserById = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not defined!',
  });
};
const deleteUserById = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not defined!',
  });
};

//ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/')
.get(getAllTours)
.post(newTour);

tourRouter
  .route('/:id')
  .get(getTourById)
  .patch(editTourById)
  .delete(deleteTourById);

userRouter.route('/')
.get(getAllUsers)
.post(createUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .patch(EditUserById)
  .delete(deleteUserById);

/// PORT

const port = 2000;
app.listen(port, () => {
  console.log('func');
});
