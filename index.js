
const dotenv = require("dotenv");
dotenv.config();
const express = require ("express")
const app = express()
const cors = require("cors")
const port = 3000
//conection database//
require ("./server")
//controleurs//
const {createUser, loginUser} = require ("./controllers/user")

const {getSauces,createSauce} = require ("./controllers/sauces")
// intergiciel cors pour créer des header//
app.use (cors())
app.use(express.json())

//routes//
app.post ("/api/auth/signup", createUser)
app.post("/api/auth/login", loginUser)
app.get("/api/sauces", getSauces)
app.post("/api/sauces", createSauce)
 app.get("/",(req, res) => res.send ("firt"))

 //listen//
 app.listen(port,() => console.log("listening port" + port))


