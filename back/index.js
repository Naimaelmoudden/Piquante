
const { app, express } = require("./server")
const { saucesRouter } = require ("./routes.js/sauces.router")
const { authRouter } = require ("./routes.js/authRouter")
const port = 3000
const path = require ("path")
const bodyParser = require ("body-parser")

//conection database//
require("./mongo")

//middelware//
app.use(bodyParser.json())
app.use("/api/sauces", saucesRouter)
app.use("/api/auth", authRouter)

//routes//
 app.get("/",(req, res) => res.send ("firt"))

 //listen//
 app.use("/images", express.static(path.join(__dirname, "images")))
 app.listen(port, () => console.log("listening port" + port))


