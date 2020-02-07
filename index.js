const express = require ('express')
const setupDb=require('./config/database')
const {usersRouter} = require('./app/controller/UsersCntrl')
const router = require('./config/router')
const app = express()  
const port = 3020

setupDb()
app.use(express.json())
app.use('/users',usersRouter)
app.use('/',router)

app.listen(port,()=>{
    console.log('listening to',port)
})