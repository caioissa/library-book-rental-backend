const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../src/app')
const Student = require('../src/models/student')
const Book = require('../src/models/book')
const { 
  setupDatabase,
  studentOne,
  studentOneId,
  studentTwo,
  studentTwoId,
  bookOne,
  bookOneId,
  bookTwo,
  bookTwoId,
  bookThree,
  bookThreeId
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should successfully rent a book', async () => {
  const response = await request(app)
    .post('/students/rental/' + studentOneId + '?bookId=' + bookOneId)
    .expect(200)

  const student = await Student.findById(response.body._id)
  const bookId = student.borrowedBooks.slice(-1)[0]._id
  const book = await Book.findById(bookId)

  expect(book.ammount).toEqual(bookOne.ammount - 1)
})

test('Should fail to rent an unavailable book', async () => {
  const response = await request(app)
    .post('/students/rental/' + studentOneId + '?bookId=' + bookTwoId)
    .expect(200)

  expect(response.body).toMatchObject({
    message: "The book is unavailable"
  })
})

test('Should fail to rent a book that doesnt exist', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .post('/students/rental/' + studentOneId + '?bookId=' + fakeId)
    .expect(404)
})

test('Should fail to rent a book for a Student that doenst exist', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .post('/students/rental/' + fakeId + '?bookId=' + bookTwoId)
    .expect(404)
})

test('Should fail to rent a book without query string', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .post('/students/rental/' + fakeId)
    .expect(400)
  
  expect(response.body).toMatchObject({
    message: "Please provide a bookId"
  })
})

test('Should rent two books', async () => {
  const response = await request(app)
    .post('/students/rental/' + studentOneId + '?bookId=' + bookOneId)
    .expect(200)
  
  const response2 = await request(app)
    .post('/students/rental/' + studentOneId + '?bookId=' + bookThreeId)
    .expect(200)

  const student = await Student.findById(response2.body._id)
  const bookId1 = student.borrowedBooks[0]._id
  const bookId2 = student.borrowedBooks[1]._id

  const book1 = await Book.findById(bookId1)
  const book2 = await Book.findById(bookId2)

  expect(book1.ammount).toEqual(bookOne.ammount - 1)
  expect(book2.ammount).toEqual(bookThree.ammount - 1)
  expect(student.borrowedBooks.length).toEqual(2)
})