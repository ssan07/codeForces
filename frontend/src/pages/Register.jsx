import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Register =()=>{
    const {register}=useAuth();
    const navigate=useNavigate();

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await register(username,email,password);
        navigate("/dashboard");
    };

    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)} />
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;