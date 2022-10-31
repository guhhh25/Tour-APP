const express = require('express')
const tourController = require('./../controllers/tourController')
const router = express.Router();



router.route('/')
.get(tourController.getAllTours)
.post(tourController.newTour)

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.editTourById)
  .delete(tourController.deleteTourById)

  module.exports = router;