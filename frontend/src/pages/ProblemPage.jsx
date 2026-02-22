import {useState,useEffect} from "react";
import Editor from "@monaco-editor/react";
import api from "../api/axios";
import {useParams} from "react-router-dom";

const ProblemPage = () => {
    const {id}=useParams();
    const [problem,setProblem]=useState(null);
    const [code,setCode]=useState("return 5;");
    const [result,setResult]=useState(null);

    useEffect(()=>{
        const fetchProblem =async()=>{
            const {data}=await api.get(`/problems/${id}`);
            setProblem(data);
        };
        fetchProblem();
    },[id]);

const handleSubmit = async () => {
  const { data } = await api.post(`/submissions/${id}`, { code });
  setResult(data);

  // update global user XP
  if (data.status === "Accepted") {
    setUser((prev) => ({ ...prev, xp: data.xp }));
  }
};

if(!problem) return <p>Loading...</p>
    return(
        <div>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>

            <Editor
                height="400px"
                width ="500px"
                defaultLanguage="javascript"
                value={code}
                onChange={(value)=> setCode(value)}
            />

            <button onClick={handleSubmit}>Submit</button>

            {result && (
                <div>
                    <h3>Status: {result.status}</h3>
                    <p>Output: {result.output}</p>
                </div>
            )}
        </div>
    )
}
export default ProblemPage;