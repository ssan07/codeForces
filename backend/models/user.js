const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    xp:{
        type:Number,
        default:0,
    },
    solvedProblems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
    },],
},{
    timestamps:true
});
module.exports=mongoose.model("User",userSchema);