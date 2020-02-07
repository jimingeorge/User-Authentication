const jwt = require('jsonwebtoken')

const tokenData = {
    id:1,
    username:'user1',
    age:24
}

const token = jwt.sign(tokenData,'jwt@123')

console.log(token)