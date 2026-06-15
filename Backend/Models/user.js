const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone:String,
    DOB:String,
    gender:String,
    age:String,

role: {
    type: String,
    enum: ["admin", "passenger"],
    default: "passenger"
  }
   
})
const User = mongoose.model("User", userSchema)
module.exports = User