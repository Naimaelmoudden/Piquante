const bodyParser = require("body-parser")
const express = require ("express")

const {
    getSauces,
    createSauce, 
    getSaucesId, 
    deleteSauces , 
    modifySauces,
    likeSauce,
} = require ("../controllers/sauces")
const {authenticationUser} = require ("../middelware/auth")
const { upload } = require ("../middelware/multer")
const saucesRouter = express.Router()

saucesRouter.use(bodyParser.json())
saucesRouter.use(authenticationUser)

saucesRouter.get("/",getSauces)
saucesRouter.post("/", upload.single ("image"), createSauce)
saucesRouter.get("/:id", getSaucesId)
saucesRouter.delete("/:id", deleteSauces)
saucesRouter.put("/:id", upload.single ("image"),modifySauces)
saucesRouter.post("/:id/like", likeSauce)

module.exports = { saucesRouter }

