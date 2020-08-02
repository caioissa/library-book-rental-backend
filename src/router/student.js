const express = require('express');
const Student = require('../models/student')
const Book = require('../models/book')

const router = express.Router();

router.post('/students', async (req, res) => {
  const student = new Student(req.body)
  try {
    await student.save()
    res.status(201).send(student)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({})
    res.status(200).send(students)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).send()
    }
    res.status(200).send(student)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/students/rental/:id', async (req, res) => {
  try{
    if (!req.query.bookId) {
      return res.status(400).send({
        message: "Please provide a bookId"
      })
    }
    const student = await Student.findById(req.params.id)
    const book = await Book.findById(req.query.bookId)
    if (!student || !book) {
      return res.status(404).send()
    }

    if (book.ammount === 0) {
      return res.status(200).send({
        message: "The book is unavailable"
      })
    }

    book.ammount -= 1
    await book.save()
    student.borrowedBooks = student.borrowedBooks.concat(book)
    await student.save()

    res.status(200).send(student)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router;