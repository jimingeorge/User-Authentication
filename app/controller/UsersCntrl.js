const express = require('express')
const router = express.Router()
const _ = require('lodash')
const User = require('../model/User')
const  authenticateUser  = require('../middlewares/authentication')


//localhost:3000/users/register
router.post('/register',(req,res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user=>{
            res.send(_.pick(user,['_id','name','email']))
            
        })
        .catch(err=>res.json(err))

})

router.post('/login',(req,res)=>{
    const body = req.body
    if(body.email){
        User.findByCredentialsEmail(body.email,body.password)
        .then(user=>{
            return user.generateToken(req)
            
        })
        .then(token=>{
            res.setHeader('x-auth',token).send({})
        })
        .catch(err=>res.send(err))
    }else if(body.username){
        User.findByCredentialsUsername(body.username,body.password)
        .then(user=>{
            return user.generateToken()
            
        })
        .then(token=>{
            res.setHeader('x-auth',token).send({})
        })
        .catch(err=>res.send(err))
    }
    

    // User.findOne({email:body.email})
    //     .then(user=>{
    //         if(!user){
    //             res.status('404').send('invalid email/password')
    //         }
    //         bcrypt.compare(body.password,user.password)
    //             .then(result=>{
    //                 if(result){
    //                     res.send(user)})
    //                 }
    //                 else{
    //                     res.send('invalid email/password')
    //                 }
    //             })
    //     })
    //     .catch(err=>res.json(err))

})

//localhost:3000/users/account
router.get('/account',authenticateUser,function(req,res){
    const {user} = req
    res.send(_.pick(user,['id','name','email']))
})

//localhost:3000/users/logout
router.delete('/logout',authenticateUser,(req,res)=>{
    const{user ,token } = req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
        .then(()=>res.send({
            notice:'successfully logged out'
        }))
        .catch(err=>res.send(err))
})

module.exports = {
    usersRouter : router
}