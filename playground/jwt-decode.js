const jwt = require('jsonwebtoken')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM3ZmVlNTkyOTNhODEzYjcxYWEyNWUiLCJ1c2VybmFtZSI6InVzZXIyIiwiY3JlYXRlZEF0IjoxNTgwNzI5Njk0NDkzLCJpYXQiOjE1ODA3Mjk2OTR9.4JIFGHMo4JORx0Pk3J7lvL38elfHi8kpIfbib__28bg'

console.log(jwt.verify(token,'jwt@123'));
