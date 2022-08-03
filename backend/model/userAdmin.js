const mongoose = require("mongoose"); 

const userAdmin = new mongoose.Schema({
    username: {type:String},
    password: {type:String}
})

module.exports = mongoose.model("user_admin", userAdmin);

