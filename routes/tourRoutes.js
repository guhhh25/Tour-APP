const express = require('express')
const tourController = require('./../controllers/tourController')
const router = express.Router();


//compare if ID > tour.length before find 
router.param('id', tourController.checkId)

  


router.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.newTour)

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.editTourById)
  .delete(tourController.deleteTourById)

  module.exports = router;