const express = require('express')
const router = express.Router()
const messageCntrlr  = require('../app/controller/MessageCntrlr')
const authentication = require('../app/middlewares/authentication')

router.get('/message',authentication, messageCntrlr.list)
router.post('/message', authentication, messageCntrlr.create)
router.get('/message/:id', authentication, messageCntrlr.show)
router.put('/message/:id', authentication, messageCntrlr.update)
router.delete('/message/:id', authentication, messageCntrlr.destroy)

module.exports=router