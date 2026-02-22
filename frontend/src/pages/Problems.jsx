import {useEffect,useState}from "react";
import api from "../api/axios";
import {Link} from "react-router-dom";

const Problems=()=>{
    const [problems,setProblems]=useState([]);
    const [filter,setFilter]=useState("all");
    const [solvedProblemsIds,setSolvedProblemIds]=useState([]);
    
    useEffect(()=>{
        const fetchData=async()=>{
            const {data:problemsData}=await api.get("/problems");
            setProblems(problemsData);

            const {data:submissions}=await api.get("/submissions/user");
            const solvedIds =submissions
                .filter((s)=>s.status ==="Accepted")
                .map((s)=>s.problem._id);
                setSolvedProblemIds(solvedIds);
        };
        fetchData();
    },[]);
    
        const filteredProblems = filter ==="all" ? problems : problems.filter((p)=>p.dificulty ===filter);

    return(
        <div>
            <h2>Problems</h2>
            <select onChange={(e)=>setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <ul>
                {filteredProblems.map((problem)=>(
                    <li key={problem._id} style={{marginBottom:"10px"}}>
                        <Link to={`/problem/${problem._id}`}>
                          {problem.title} ({problem.difficulty})
                        </Link>
                        {solvedProblemsIds.includes(problem._id)&&(
                            <span style={{color:"green",marginLeft:"10px"}}>✅ Solved</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Problems;