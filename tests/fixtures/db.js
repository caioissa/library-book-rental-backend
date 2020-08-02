const mongoose = require('mongoose')

const Student = require('../../src/models/student')
const Librarian = require('../../src/models/librarian')
const Book = require('../../src/models/book')

const studentOneId = new mongoose.Types.ObjectId()
const studentOne = {
  _id: studentOneId,
  name: 'Caio Issa',
  email: 'caioissa96@gmail.com',
  ra: '201820002'
}

const studentTwoId = new mongoose.Types.ObjectId()
const studentTwo = {
  _id: studentTwoId,
  name: 'Ygor Sansone',
  email: 'ygor.sansone@gmail.com',
  ra: '201810126'
}

const librarianOneId = new mongoose.Types.ObjectId()
const librarianOne = {
  _id: librarianOneId,
  name: 'Caio Issa',
  email: 'caioissa96@gmail.com',
  register: '123456'
}

const librarianTwoId = new mongoose.Types.ObjectId()
const librarianTwo = {
  _id: librarianTwoId,
  name: 'Ygor Sansone',
  email: 'ygor.sansone@gmail.com',
  register: '654321'
}

const bookOneId = new mongoose.Types.ObjectId()
const bookOne = {
  _id: bookOneId,
  title: 'O Senhor das Moscas',
  author: 'William Goulding',
  ammount: 5
}

const bookTwoId = new mongoose.Types.ObjectId()
const bookTwo = {
  _id: bookTwoId,
  title: 'Kingdom through Covenant',
  author: 'Peter Gentry',
  ammount: 0
}

const bookThreeId = new mongoose.Types.ObjectId()
const bookThree = {
  _id: bookThreeId,
  title: 'Desiring God',
  author: 'John Piper',
  ammount: 1
}

const setupDatabase = async () => {
  await Student.deleteMany({});
  await Librarian.deleteMany({});
  await Book.deleteMany({});

  await new Student(studentOne).save()
  await new Student(studentTwo).save()

  await new Librarian(librarianOne).save()
  await new Librarian(librarianTwo).save()

  await new Book(bookOne).save()
  await new Book(bookTwo).save()
  await new Book(bookThree).save()
}

module.exports = { 
  setupDatabase,
  studentOne,
  studentOneId,
  studentTwo,
  studentTwoId,
  librarianOne,
  librarianOneId,
  librarianTwo,
  librarianTwoId,
  bookOne,
  bookOneId,
  bookTwo,
  bookTwoId,
  bookThree,
  bookThreeId
}