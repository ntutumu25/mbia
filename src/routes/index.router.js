const express = require('express')
const router = express.Router()
const {home} = require('../controllers/index.controller')
const {isAuthenticated} = require("../helpers/helpers")

router.get('/',home)


module.exports = router