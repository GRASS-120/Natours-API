const express = require('express');
const {
    getAllTours,
    addNewTour,
    getTour,
    deleteTour
} = require('../controllers/toursController');

const tourRouter = express.Router();

tourRouter
    .route('/')
    .get(getAllTours)
    .post(addNewTour)

tourRouter
    .route('/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch((req, res) => {})

module.exports = tourRouter;