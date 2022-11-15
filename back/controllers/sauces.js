

const mongoose = require("mongoose")
const {unlink}  = require("fs/promises")
//schema des produit//
const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  manufacturer: String,
  description: String,
  mainPepper: String,
  imageUrl: String,
  heat:  { type: Number, min: 1, max: 5 },
  likes: Number,
  dislikes: Number,
  usersLiked: [String],
  usersDisliked: [String]
})
const Product = mongoose.model("Product", productSchema)
//GET : Pour récupérer toutes les sauces de la base de données
function getSauces (req,res) { 
   Product.find({})
    .then((products) => res.send(products))
    .catch((error) => res.status(500).send(error))
}
//Pour récupérer les id dans l'url et suite fait une requête sur la base de données//
function getSauce(req,res){
  const { id } = req.params
  return Product.findById(id)
}
//Il recoit la reponse de getSauce de produit//
 function getSaucesId(req,res){
  getSauce(req, res)
  .then((product) => sendClientResponse(product, res))
  .catch((err) => res.status(500).send(err))
 }
  //Pour supprimer une sauce
function deleteSauces(req, res){
  //l'ordre de suppression du produit qu'il envoie à Mongo
  const { id }= req.params
  Product.findByIdAndDelete(id)
  .then((product ) => sendClientResponse(product, res ))
  .then((Object) => deleteImage(Object))
  .then((res) => console.log("FILE DELETED", res))
  .catch((err) => res.status(500).send({ message: err }))
}

function modifySauces(req, res){
 const {
  params: { id }
 } = req

const hasNewImage = req.file != null
const payload = createPayload(hasNewImage, req)

Product.findByIdAndUpdate(id, payload)
.then((dbResponse) => sendClientResponse(dbResponse, res))
.then((product) => deleteImage(product))
.then((res) => console.log("FILE DELETED", res))
.catch((err) => console.error("PROBLEM UPDATING", err))
}
function deleteImage(product){
  if (product == null) return
  console.log("DELETE IMAGE", product)
  const imageToDelete = product.imageUrl.split("/").at(-1)
  return unlink("images/" + imageToDelete)
}
function createPayload (hasNewImage, req){
  console.log("hasNewImage:", hasNewImage)
  if (!hasNewImage) return req.body
  const payload = JSON.parse(req.body.sauce)
  payload.imageUrl = createImageUrl(req, req.file.fileName)
  console.log("NOUVELLE IMAGE A GERER")
  console.log("voici le payload:", payload)
  return payload
}

function sendClientResponse(product, res){
  if (product == null) {
    console.log("NOTHING TO UPDATE")
    return res.status(404).send({ message: "Object not found in database" })
  }
  console.log("ALL GOOD, UPDATING:", product)
  return Promise.resolve(res.status(200).send(product)).then(() => product)
}

function createImageUrl(req, fileName){
  return req.protocol + "://" + req.get("host") + "/images/" + fileName
}

function createSauce(req, res){
  const { body, file } = req
  const { fileName } = file
  const sauce = JSON.parse(body.sauce)
  const { name, manufacturer, description, mainPepper, heat, userId } = sauce
  
  const product = new Product({
    userId:  userId,
    name: name,
    manufacturer:  manufacturer,
    description: description,
    mainPepper: mainPepper,
    imageUrl: createImageUrl(req, fileName),
    heat:heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  })
  product
  .save()
  .then((message) => {
    res.status(201).send({message: message})
    return console.log("produit enregistré", message)
  })
  .catch((err) => res.status(500).send(err))
}

function likeSauce(req, res) {
  const { like, userId } = req.body
  if (![1, -1, 0].includes(like)) return res.status(403).send({ message: "Invalid like value" })

  getSauce(req, res)
    .then((product) => updateVote(product, like, userId, res))
    .then((prod)=> prod.save())
    .then((object) => sendClientResponse( object, res))
    .catch((err) => res.status(500).send(err))

}
//like si il a 1 ou +/
function updateVote (product, like , userId, res) {
  if (like === 1 || like === -1) return incrementVote(product, userId, like)
  return resetVote(product, userId, res)   
}
function resetVote (product, userId, res ) {
  const { usersLiked, usersDisliked } = product
  if ([usersLiked, usersDisliked].every((arr) => arr.includes(userId)))
  return Promise.reject("user seems to have voted both ways")

  if (![usersLiked, usersDisliked].some((arr) => arr.includes(userId)))
  return Promise.reject("User seems to not have voted")

  if (usersLiked.includes(userId)) {
    --product.likes
    product.usersLiked = product.usersLiked.filter((id) => id !== userId)
  } else {
    --product.dislikes
    product.usersDisliked = product.usersDisliked.filter((id) => id !== userId)
  }
 
  return product
}
function incrementVote (product, userId, like){
  const { usersLiked, usersDisliked } = product

  const votersArray = like === 1 ? usersLiked : usersDisliked
  if (votersArray.includes(userId)) return product
  votersArray.push(userId)
  like === 1 ? ++product.likes : ++product.dislikes
  return product
}


module.exports = { getSauces, createSauce, getSaucesId, deleteSauces, modifySauces, likeSauce}