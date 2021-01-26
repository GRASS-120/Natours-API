const Tour = require('../models/tourModel');

exports.addNewTour = async (req, res) => {
  // const newTour = newTour({})
  // newTour.save()

  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Cock-up',
      message: 'Invalid data sent!',
    });
  }

  // const tours = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  // );

  // const tourId = tours[tours.length - 1].id + 1;
  // const newTour = {
  //   id: tourId,
  //   ...req.body,
  // };

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(201);
  //   }
  // );
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Cock-up',
      message: 'Some error!',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Cock-up',
      message: 'Invalid ID!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Cock-up',
      message: 'Invalid ID!',
    });
  }
};

exports.updateTour = async (req, res) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // возвращает обновленный докумнт
    runValidators: true,
  });

  try {
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Cock-up',
      message: 'Invalid ID!',
    });
  }
};

// exports.checkId = (req, res, next, val) => {
//   console.log(`id is ${val}`);
//   const id = val;

//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if ('name' in req.body) {
//     console.log('good');
//   } else {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Empty body',
//     });
//   }
//   next();
// };
