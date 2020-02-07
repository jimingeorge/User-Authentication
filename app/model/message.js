const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    body:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Message = mongoose.model('Message',messageSchema)

module.exports = Message