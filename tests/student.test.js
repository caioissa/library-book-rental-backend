const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../src/app')
const Student = require('../src/models/student')
const { 
  setupDatabase,
  studentOne,
  studentOneId,
  studentTwo,
  studentTwoId 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a Student', async () => {
  body = {
    name: 'Isabella Bottini',
    email: 'isabottini@gmail.com',
    ra: '201610001'
  }
  const response = await request(app)
    .post('/students')
    .send(body)
    .expect(201)

  const student = await Student.findById(response.body._id)
  expect(student).not.toBeNull()
  expect(response.body).toMatchObject(body)
})

test('Should fail to create duplicate email', async () => {
  const response = await request(app)
    .post('/students')
    .send({
      name: 'João',
      email: 'caioissa96@gmail.com',
      ra: '123412345'
    })
    .expect(400)
})

test('Should fail to create duplicate ra', async () => {
  const response = await request(app)
    .post('/students')
    .send({
      name: 'Jose',
      email: 'josezinho@gmail.com',
      ra: '201820002'
    })
    .expect(400)
})

test('Should fail to create invalid email', async () => {
  const response = await request(app)
    .post('/students')
    .send({
      name: 'Jose',
      email: 'josezinhogmail.com!jsk',
      ra: '201820002'
    })
    .expect(400)
})

test('Should fail to create invalid ra', async () => {
  const response = await request(app)
    .post('/students')
    .send({
      name: 'Jose',
      email: 'josezinho@gmail.com',
      ra: '2018202'
    })
    .expect(400)
})

test('Should fetch a Student that doesnt exist', async () => {
  const fakeId = new mongoose.Types.ObjectId()
  const response = await request(app)
    .get('/students/' + fakeId)
    .send()
    .expect(404)
})

test('Should fetch a Student that exists', async () => {
  const response = await request(app)
    .get('/students/' + studentOneId)
    .send()
    .expect(200)

  const student = await Student.findById(response.body._id)
  expect(student).not.toBeNull()

  expect(student).toMatchObject(studentOne)
})

test('Should fetch all Students', async () => {
  const response = await request(app)
    .get('/students')
    .send()
    .expect(200)

  const students = await Student.find({})

  expect(response.body.length).toEqual(students.length)
})