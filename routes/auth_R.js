const express = require('express')
const router = express.Router()

const {register, login, deleteAll, getAllUsers} = require('../controllers/auth_C')

router.post('/register', register)
router.post('/login', login)
router.delete('/xTx',deleteAll )
router.get('/xGx',getAllUsers )


module.exports = router