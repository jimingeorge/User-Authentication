const bcrypt = require('bcrypt')

const encrypted = '$2b$10$.wGX5swUav4azEba3/n3f.5BMD6Q4SdSicvZttrxHzyLsjEhJxqHm'

const pswd = 'secret123'

bcrypt.compare(pswd,encrypted)
    .then(function(result){
        console.log(result)
    })