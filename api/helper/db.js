const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/YOURDBname',{ useNewUrlParser: true });
    mongoose.connection.on('open', () => {
        console.log("MongoDB ok");
    });
    mongoose.connection.on('error', (error) => {
        console.log("MongoDB Error: " + error);
    });

    mongoose.Promise = global.Promise;
};