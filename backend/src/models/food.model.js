const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,      // ImageKit URL
        required: true
    },

    video: {
        type: String,      // ImageKit video URL
        required: true
    },

    description: {
        type: String
    },

    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodPartner',
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('food', foodSchema);
