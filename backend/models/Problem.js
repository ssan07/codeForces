const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    title:{ type:String,required:true},
    description:{type:String,required:true},
    input:{type:String},
    expectedOutput:{type:String,required:true},
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        default:"easy",
    },
});

module.exports = mongoose.model("Problem", problemSchema);