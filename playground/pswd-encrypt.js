const bcrypt = require('bcrypt')

const pswd = 'secret12'

bcrypt.genSalt(10)
    .then(salt=>{
        console.log(salt)
        bcrypt.hash(pswd,salt)
            .then(encPswd=>console.log(encPswd))
    })