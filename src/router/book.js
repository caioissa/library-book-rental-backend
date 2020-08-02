const express = require('express')
const Book = require('../models/book')

const router = express.Router();

router.post('/books', async (req, res) => {
  const book = new Book(req.body)
  try {
    await book.save()
    res.status(201).send(book)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).send(books)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).send()
    }
    res.status(200).send(book)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
      return res.status(404).send()
    }
    res.status(200).send(book)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router