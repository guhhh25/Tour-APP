const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  
  exports.checkId = (req, res,next,value) => {
    if(req.params.id * 1 > tours.length){
      return res.status(404).json({
        status:'fail',
        message:'Invalid ID'
      })
    }
    next()
  }

  exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
     return res.status(400).json({
        status:"failed",
        message:"invalid name or price :("
      })
    }
    next()
  }  
  exports.getAllTours = (req, res) => {
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
   
    const tour = tours.find((el) => el.id === id);
    if (tour.length === 0) return;
    res.status(200).json({
        data: {
          status: 'sucess',
          tour,
        },
      });
    } 
    
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