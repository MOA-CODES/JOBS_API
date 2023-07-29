const express = require('express')
const router = express.Router()

const {register, login, deleteAll} = require('../controllers/auth_C')

router.post('/register', register)
router.post('/login', login)
router.delete('/xTx',deleteAll )

module.exports = router