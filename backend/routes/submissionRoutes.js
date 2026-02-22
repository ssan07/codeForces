const express = require("express");
const {protect}=require("../middleware/authMiddleware");
const Problem = require("../models/Problem");
const SubmissonSchema = require("../models/SubmissionSchema");

const router = express.Router();

router.get("/user",protect,async(req,res)=>{
    try{
        const submissions=await SubmissionSchema.find({user:req.user.id})
        .populate("problem","title difficulty")
        .sort({createdAt:-1});
        res.json(submissions);
    }catch(error){
        res.status(500).json({message:"Error fetching submissions"});
    }
});


router.post("/:problemId",protect,async (req,res)=>{
    try{
        const {code}=req.body;
        const {problemId}=req.params;

        const problem = await Problem.findById(problemId);
        if(!problem){
            return res.status(404).json({message:"Problem not found"});
        }
        let userOutput;

        try{
            userOutput=eval(code);
        }catch(err){
            userOutput="Error";
        }

        let status =
            userOutput?.toString().trim() ===
            problem.expectedOutput.trim()
            ?"Accepted"
            :"wrong Answer";
        
        const submission = await SubmissonSchema.create({
            user:req.user._id,
            problem:problemId,
            code,
            output:userOutput?.toString(),
            status,
        });

        res.json({ status,output:userOutput});
    }catch(error){
        res.status(500).json({message:"Submission error"});
    }
});


router.post("/:problemId", protect, async (req, res) => {
  try {
    const { code } = req.body;
    const { problemId } = req.params;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    let userOutput;
    try {
      userOutput = eval(code); // temporary JS execution
    } catch (err) {
      userOutput = "Error";
    }

    let status =
      userOutput?.toString().trim() === problem.expectedOutput.trim()
        ? "Accepted"
        : "Wrong Answer";

    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      code,
      output: userOutput?.toString(),
      status,
    });


    if (status === "Accepted") {
      let xpAward = 0;
      switch (problem.difficulty) {
        case "easy":
          xpAward = 10;
          break;
        case "medium":
          xpAward = 20;
          break;
        case "hard":
          xpAward = 50;
          break;
      }

      req.user.xp += xpAward;
      await req.user.save();
    }

    res.json({ status, output: userOutput, xp: req.user.xp });
  } catch (error) {
    res.status(500).json({ message: "Submission error" });
  }
});

module.exports=router;