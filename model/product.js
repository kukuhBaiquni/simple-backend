const mongoose = require('mongoose')

const { Schema } = mongoose

const product = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
  images: {
    type: Array,
    default: [
      {
        url: '',
        isThumbnail: false,
      },
    ],
    required: false,
  },
  unit: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Product', product)
