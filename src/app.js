const express = require('express')
require('./db/mongoose');

const app = express();
const librarianRouter = require('./router/librarian')
const bookRouter = require('./router/book')
const studentRouter = require('./router/student')

app.use(express.json());
app.use(bookRouter);
app.use(librarianRouter);
app.use(studentRouter);

module.exports = app