const Message = require('../model/message')

module.exports.create = (req,res) =>{
    const body = req.body
    const message = new Message(body)
    
    //message.user = req.user

    message.save()
        .then((message)=>{
            res.send(message)
        })
        .catch(err=>res.send(err))
}

module.exports.list=(req,res)=>{
    Message.find({user:req.user})
        .then((data)=>{res.send(data)})
        .catch(err=>res.send(err))
}

module.exports.show = (req,res)=>{
    const id = req.params.id

    Message.findOne({_id:id})
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
}

module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Message.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true})
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
}

module.exports.destroy = (req,res)=>{
    const id = req.params.id
    Message.findOneAndDelete({_id:id,user:req.user._id})
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
}