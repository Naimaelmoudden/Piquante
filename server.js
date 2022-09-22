const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.fz7efkg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>   {
    console.log('Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas');
    console.error(error);
  });

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
  })
  userSchema.plugin(uniqueValidator)
  const User = mongoose.model("User", userSchema)
  
module.exports = { mongoose, User }