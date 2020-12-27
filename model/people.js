const mongoose = require('mongoose')
const { Schema } = mongoose;

const people = new Schema ({
    firstName: {
        type: String,
        match: /^[a-zA-Z ]+$/,
        minLength: 3,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        match: /^[a-zA-Z ]+$/,
        minlength: 3,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    }
});

module.exports = mongoose.model("People", people);