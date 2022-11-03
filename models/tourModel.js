const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'a tour must have a name'] 
    },
    rating: Number,
    price: Number
  })
  
  const Tour = mongoose.model('Tour', tourSchema)



  module.exports = Tour