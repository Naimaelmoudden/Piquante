const {createUser, loginUser} = require ("../controllers/user")

const express = require("express")
const authRouter = express.Router()

authRouter.post ("/signup", createUser)
authRouter .post("/login", loginUser)

module.exports = { authRouter }