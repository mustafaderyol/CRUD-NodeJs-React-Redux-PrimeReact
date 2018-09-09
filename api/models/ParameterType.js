const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParameterTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLenght: 1
    },
    createDate :{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('parameterType', ParameterTypeSchema);