const mongoose = require('mongoose')
const { Schema } = mongoose;

const product = new Schema ({
    name: {
        type: String,
        minLength: 3,
        maxlength: 5,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("Product", product);