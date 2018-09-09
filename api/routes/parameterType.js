var express = require('express');
var router = express.Router();

//Models
const ParameterTypeModel = require('../models/ParameterType');

// getAll
router.get('/', function (req, res, next) {
    const promise = ParameterTypeModel.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// getById
router.get('/:id', function (req, res, next) {
    const promise = ParameterTypeModel.findById(req.params.id);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// getById
router.delete('/:id', function (req, res, next) {
    const promise = ParameterTypeModel.findByIdAndRemove(req.params.id);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// update
router.put('/:id', function (req, res, next) {
    const promise = ParameterTypeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// insert
router.post('/', function (req, res, next) {
    const company = new ParameterTypeModel(req.body);
    const promise = company.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;
