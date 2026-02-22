const express =require("express");
const Problem = require("../models/Problem");
const {protect} =require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",protect,async(req,res)=>{
    try{
        const problems=await Problem.find().select("-expectedOutput");
        res.json(problems);
    }catch(error){
        res.status(500).json({message:"Error fetching problems"});
    }
});

router.get("/:id",protect,async(req,res)=>{
    try{
        const problem=await Problem.findById(req.params.id).select("-expectedOutput");
        if(!problem) return res.status(404).json({message:"Not found"});

        res.json(problem);
    }catch(error){
        res.status(500).json({message:"Error fetching problem"});
    }
});
module.exports=router;