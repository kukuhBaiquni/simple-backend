const express = require('express')

const router = express.Router()

const bcrypt = require('bcrypt')

const People = require('../model/people')

router.get('/', (req, res) => {
  res.send('hello')
})

router.post('/', async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 11)
    const dummy = new People({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password,
    })
    await dummy.save()
    const Data = await People.find({})
    res.status(200).json({
      data: Data,
      success: true,
    })
  } catch (error) {
    res.status(200).json({
      data: [],
      success: false,
      message: 'An error occured!',
    })
  }
})

router.post('/pass', async (req, res) => {
  const { password } = req.body
  const match = await bcrypt.compare(password, '$2b$11$i2BFeUtuntMJiFoKedcEaeDH2XPcEoertumFOjAWaFUQ9NCBlwuG2')
  res.status(200).json({ match })
})

module.exports = router
