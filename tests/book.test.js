const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../src/app')
const Book = require('../src/models/book')
const { 
  setupDatabase,
  bookOne,
  bookOneId,
  bookTwo,
  bookTwoId
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a Book', async () => {
  body = {
    title: 'Just do Something',
    author: 'Kevin DeYoung',
    ammount: 1
  }
  const response = await request(app)
    .post('/books')
    .send(body)
    .expect(201)

  const book = await Book.findById(response.body._id)
  expect(book).not.toBeNull()
  expect(response.body).toMatchObject(body)
})

test('Should fetch a Book that doesnt exist', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .get('/books/' + fakeId)
    .send()
    .expect(404)
})

test('Should fetch a Book that exists', async () => {
  const response = await request(app)
    .get('/books/' + bookOneId)
    .send()
    .expect(200)

  const book = await Book.findById(response.body._id)
  expect(book).not.toBeNull()

  expect(book).toMatchObject(bookOne)
})

test('Should fetch all Books', async () => {
  const response = await request(app)
    .get('/books')
    .send()
    .expect(200)

  const books = await Book.find({})

  expect(response.body.length).toEqual(books.length)
})

test('Should delete a Book that doesnt exist', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .delete('/books/' + fakeId)
    .send()
    .expect(404)
})

test('Should delete a Book that exists', async () => {
  const response = await request(app)
    .delete('/books/' + bookOneId)
    .send()
    .expect(200)

  expect(new mongoose.Types.ObjectId(response.body._id)).toEqual(bookOneId)

  const book = await Book.findById(response.body._id)
  expect(book).toBeNull()
})