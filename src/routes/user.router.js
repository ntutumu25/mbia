const express = require('express')
const router = express.Router()
const {isAuthenticated} = require("../helpers/helpers")

const {
    registerForm, register, loginForm, login, logout, user, updateUser
} = require("../controllers/user.controller")
const {ListUser, userApi} = require("../controllers/admin.controller")



router.get("/auth/register", registerForm)
router.post("/auth/register", register)  
router.put("/users/update/:id", updateUser);

router.get("/auth/login", loginForm)
router.post("/auth/login", login)

router.get("/users/space",isAuthenticated ,user)

router.get("/auth/logout", logout)

router.get("/admin/list-users", isAuthenticated,ListUser)

router.get("/admin/apiUsers", userApi)

module.exports = router