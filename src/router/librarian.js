const express = require('express');
const Librarian = require('../models/librarian')

const router = express.Router();

router.post('/librarians', async (req, res) => {
  const librarian = new Librarian(req.body)
  try {
    await librarian.save()
    res.status(201).send(librarian)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/librarians', async (req, res) => {
  try {
    const librarians = await Librarian.find()
    res.status(200).send(librarians)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/librarians/:id', async (req, res) => {
  try {
    const librarian = await Librarian.findById(req.params.id)
    if (!librarian) {
      return res.status(404).send()
    }
    res.status(200).send(librarian)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router