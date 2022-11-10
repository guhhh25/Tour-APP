const fs = require('fs');
const Tour = require('./../models/tourModel');

//middleware to check ID, so he can use next / value
// exports.checkId = (req, res,next,value) => {
//   if(req.params.id * 1 > tours.length){
//     return res.status(404).json({
//       status:'fail',
//       message:'Invalid ID'
//     })
//   }
//   next()
// }

//middleware to check req body, so he can use next / value

// exports.checkBody = (req, res, next) => {
//   if(!req.body.name || !req.body.price){
//    return res.status(400).json({
//       status:"failed",
//       message:"invalid name or price :("
//     })
//   }
//   next()
// }

exports.getAllTours = async (req, res) => {
  try {
    //filtering
    const queryObj = {...req.query}
    const excludeFields = ['page', 'sort', 'limit', 'fields'] //parameters that need to be excluded
    excludeFields.forEach(el => delete queryObj[el]) 
    //filtering with operators
    let queryStr = JSON.stringify(queryObj)
    let newStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    let query = Tour.find(JSON.parse(newStr)) // if empty, find all
    
    //Sorting
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      console.log(sortBy)
      
      query = query.sort(sortBy)
      console.log(req.query.sort)
    }else{
      query = query.sort('-createdAt')
    }

    //fields limiting

    if(req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
    
      query = query.select(fields)
    }else{
      query = query.select('-__v')
    }


    // pagination
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)

    const tours = await query;
    res.status(200).json({
      status: 'sucess',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'sucess',
      data: {
        tour: tour,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.newTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'sucess',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editTourById = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // novo documento atualizado
      runValidators: true,
    });

    res.status(200).json({
      status: 'sucess',
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTourById = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id); // n precisa de variavel pq nao manda nada
    res.send({
      status: 'sucess',
      data: {
        message: 'tour deleted!',
      },
    });
  } catch (err) {
    console.log(err);
  }
};
