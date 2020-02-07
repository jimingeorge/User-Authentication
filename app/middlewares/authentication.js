//Route Middleware Function

const User  = require('../model/User')

const authenticateUser = function(req,res,next){
    const token = req.headers['x-auth']
    //const token = 123
    console.log(req.headers['x-auth'])
        User.findByToken(token)
            .then(user=>{
                if(user){
                    req.user = user//sending user data, to be used in next function
                    req.token = token
                    next()
                }else{
                    res.status('401').send({notice:'token not avilable'})
                }
                
            })
            .catch(err=>res.status('401').send(err))
}

module.exports = authenticateUser
