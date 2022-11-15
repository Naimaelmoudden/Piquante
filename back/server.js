const dotenv = require("dotenv")
dotenv.config()
const express = require ("express")
const app = express()
const cors = require("cors")

// intergiciel cors pour créer des header//
app.use (cors())
app.use(express.json())

module.exports = {app, express}