import{useState} from "react";
import{useAuth} from "../context/AuthContext";
import{useNavigate} from "react-router-dom";

const Login=()=>{
    const { login }=useAuth();
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await login(email,password);
            navigate("/dashboard");
        } catch(error){
            console.error(error.response?.data?.message);
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit ={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;