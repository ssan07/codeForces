const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        user:{ type: mongoose.Schema.Types.ObjectId,ref:"User"},
        problem:{type:mongoose.Schema.Types.ObjectId, ref:"Problem"},
        code:String,
        output:String,
        status:{
            type:String,
            enum: ["Accepted","Wrong Answer","Error"],
        },
    },
    { timestamps:true}
);

module.exports = mongoose.model("Submission",submissionSchema);