const fs = require('fs');

let users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
    console.log(req.requestTime)

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        result: users.length,
        data: {
            users
        }
    })
};

exports.getUser = (req, res) => {
    const id = req.params.id

    if (id < users.length) {
        res.status(200).json({
            status: "success",
            data: {
                user: users[req.params.id]
            }
        })
    } else {
        res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
};

exports.addNewUser = (req, res) => {
    const userId = users[users.length - 1].id + 1
    const newUser = Object.assign({
        id: userId
    }, req.body)

    users.push(newUser);

    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
        res.status(201)
    });

    res.status(200).json({
        status: "success",
        data: {
            user: newUser
        }
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id

    if (id < users.length) {
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