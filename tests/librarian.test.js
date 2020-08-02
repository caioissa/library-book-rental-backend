const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../src/app')
const Librarian = require('../src/models/librarian')
const { 
  setupDatabase,
  librarianOne,
  librarianOneId,
  librarianTwo,
  librarianTwoId
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a Librarian', async () => {
  body = {
    name: 'Isabella Bottini',
    email: 'isabottini@gmail.com',
    register: '321654'
  }
  const response = await request(app)
    .post('/librarians')
    .send(body)
    .expect(201)

  const librarian = await Librarian.findById(response.body._id)
  expect(librarian).not.toBeNull()
  expect(response.body).toMatchObject(body)
})

test('Should fail to create duplicate email', async () => {
  const response = await request(app)
    .post('/librarians')
    .send({
      name: 'João',
      email: 'caioissa96@gmail.com',
      register: '123412'
    })
    .expect(400)
})

test('Should fail to create duplicate register', async () => {
  const response = await request(app)
    .post('/librarians')
    .send({
      name: 'Jose',
      email: 'josezinho@gmail.com',
      register: '123456'
    })
    .expect(400)
})

test('Should fail to create invalid email', async () => {
  const response = await request(app)
    .post('/librarians')
    .send({
      name: 'Jose',
      email: 'josezinhogmail.com!jsk',
      register: '122315'
    })
    .expect(400)
})

test('Should fetch a Librarian that doesnt exist', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .get('/librarians/' + fakeId)
    .send()
    .expect(404)
})

test('Should fetch a Librarian that exists', async () => {
  const response = await request(app)
    .get('/librarians/' + librarianOneId)
    .send()
    .expect(200)

  const librarian = await Librarian.findById(response.body._id)
  expect(librarian).not.toBeNull()

  expect(librarian).toMatchObject(librarianOne)
})

test('Should fetch all Librarians', async () => {
  const response = await request(app)
    .get('/librarians')
    .send()
    .expect(200)

  const librarians = await Librarian.find({})

  expect(response.body.length).toEqual(librarians.length)
})