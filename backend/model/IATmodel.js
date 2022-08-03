const mongoose = require("mongoose"); 

const IATmodel = new mongoose.Schema({
    runner: {type:String},
    target_pratice: {type:Array},
    target_test: {type:Array},
    attribute_pratice : {type:Array},
    attribute_test : {type:Array},
    d1:{type:Boolean},
    d2:{type:Boolean},
    d3:{type:Boolean},
    d4:{type:Boolean},
    d5:{type:Boolean},
    d6:{type:Boolean},
    d7:{type:Boolean}
})

module.exports = mongoose.model("IAT_model", IATmodel);

