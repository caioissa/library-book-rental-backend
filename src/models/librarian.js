const mongoose = require('mongoose')
const validator = require('validator')

const librarianSchema = new mongoose.Schema({
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
  register: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
})

const Librarian = mongoose.model('Librarian', librarianSchema)

module.exports = Librarian