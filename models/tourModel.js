const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },

    duration: {
      type: String,
      required: [true, 'A tour must have durations'],
    },

    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    priceDiscount: Number,

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },

    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      trim: true, // убирает все пробелы по краям
    },

    description: {
      type: String,
      required: [true, 'A tour must have a description'],
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, 'A tour must have a image on background'],
    },

    images: [String], // массив, в котором все элементы - строки

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// нужно исп только обычную функцию, т.к. нужен this
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
