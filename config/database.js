const mongoose = require('mongoose')

const setupDb=()=>{
    mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('connected to DB'))
    .catch(err=>console.log(err))
}

module.exports = setupDb
