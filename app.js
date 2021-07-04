const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const productRouter = require('./routes/product')

const app = express()

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(
  'mongodb://localhost/me-inc',
  { useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Database connected!')
    }
  },
)

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/v1/products', productRouter)

module.exports = app
