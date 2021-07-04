const express = require('express')

const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images')
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}.png`
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  },
})

const upload = multer({ storage })
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

router.post('/', upload.array('images'), async (req, res) => {
  const {
    name, price, description, unit, createdAt,
  } = req.body
  const images = req.files.map((item, index) => ({
    url: `http://192.168.43.24:8000/images/${item.filename}`,
    isThumbnail: index === 0,
  }))
  try {
    const product = new Product({
      name, price, description, unit, createdAt, images,
    })
    await product.save()
    res.status(200).json({
      data: {
        name, price, description, unit, createdAt, images,
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
