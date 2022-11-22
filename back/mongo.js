const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
// Connexion à la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.kr0ci94.mongodb.net/?retryWrites=true&w=majority`,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>   {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((error) => {
    console.log('Connexion à MongoDB échouée ');
    console.error(error);
  });

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
  })
  userSchema.plugin(uniqueValidator)
  const User = mongoose.model("User", userSchema)
  
module.exports = { mongoose, User }