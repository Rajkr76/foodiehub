const mongoose = require('mongoose');
const { describe } = require('node:test');
const { type } = require('os');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodPartner'
    }
})

const foodModel = mongoose.model('food',foodSchema);

module.exports = foodModel;