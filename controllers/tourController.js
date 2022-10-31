const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

 exports.getAllTours = (req, res) => {
    if (!tours.length) return;
  
    res.status(200).json({
      status: 'sucess',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  };
  
exports.getTourById = (req, res) => {
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
          status: 'Data not founds',
        },
      });
    }
  };
  
  exports.newTour = (req, res) => {
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
  
  exports.editTourById = (req, res) => {
    res.status(200).json({
      status: 'sucess',
      data: {
        tour: req.body,
      },
    });
  };
  
  exports.deleteTourById = (req, res) => {
    res.send({
      status: 'sucess',
      data: req.body,
    });
  };