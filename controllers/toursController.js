const fs = require('fs');

let tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours
        }
    })
};

exports.getTour = (req, res) => {
    const id = req.params.id

    if (id < tours.length) {
        res.status(200).json({
            status: "success",
            data: {
                tour: tours[req.params.id]
            }
        })
    } else {
        res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
};

exports.addNewTour = (req, res) => {
    const tourId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({
        id: tourId
    }, req.body)

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201)
    });

    res.status(200).json({
        status: "success",
        data: {
            tour: newTour
        }
    });
};

exports.deleteTour = (req, res) => {
    const id = req.params.id

    if (id < tours.length) {
        res.status(204).json({
            status: "success",
            data: null
        })
    } else {
        res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
};