const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!')
      }
    }
  },
  ra: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate (value) {
      if (value.length !== 9) {
        throw new Error('RA must have 9 digits!')
      }
    }
  },
  borrowedBooks: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  }],
  banDate: Date
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student