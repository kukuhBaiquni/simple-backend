const express = require('express')

const router = express.Router()
const Product = require('../model/product')

router.get('/:page', async (req, res) => {
  const page = req.params.page - 1 || 0
  const dataPerPage = 5
  const offset = +page * dataPerPage
  try {
    const count = await Product.find({}).countDocuments()
    const products = await Product.find({}).sort({ _id: -1 }).limit(dataPerPage).skip(offset)
    res.status(200).json({
      status: 'success',
      data: products,
      count,
      dataPerPage,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null,
    })
  }
})

router.post('/', async (req, res) => {
  const {
    name,
    price,
    description,
    unit,
    createdAt,
  } = req.body
  try {
    const product = new Product({
      name,
      price,
      description,
      unit,
      createdAt,
    })
    await product.save()
    res.status(200).json({
      data: {
        name,
        price,
        description,
        unit,
        createdAt,
      },
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null,
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const target = await Product.findById(id)
    if (target) {
      target.name = req.body.name
      target.description = req.body.description
      target.price = req.body.price
      await target.save()
      res.status(200).json({
        status: 'success',
        data: target,
      })
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Product not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null,
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const target = await Product.findOne({ _id: id })
    if (target) {
      await target.remove()
      res.status(200).json({
        status: 'success',
        data: target,
      })
    } else {
      res.status(200).json({
        status: 'error',
        data: null,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: null,
    })
  }
})

module.exports = router
