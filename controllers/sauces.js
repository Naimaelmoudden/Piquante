
const jwt = require("jsonwebtoken")


function getSauces(req, res){

  const header = req.header("Authorization")
  if (header == null) return res.status(403).send({ message: "Invalid" })


const token = header.split(" ")[1]
if (token == null) return res.status(403).send({ message: "token null " })


jwt.verify(token, process.env.JWT_PASSWORD , (err,decoded)=>handelToken(err,decoded,res))


}

function handelToken (err,decoded,res){
  if (err) return res.status(403).send({ message: "Token invalid " + err })
  else{
    console.log ("le token est bon" , decoded)
    res.send ({message:[ "sauté1", "sauté2"]})
  }
}function createSauce(req, res){

}

module.exports = {getSauces, createSauce}