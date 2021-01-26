const express = require('express');
const {
  getAllTours,
  addNewTour,
  getTour,
  deleteTour,
  updateTour,
} = require('../controllers/toursController');

const tourRouter = express.Router();

// tourRouter.param('id', checkId);
// tourRouter.param("id", checkBody);

tourRouter.route('/').get(getAllTours).post(addNewTour);

tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = tourRouter;
