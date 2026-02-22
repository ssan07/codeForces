// import {createContext,useContext,useState} from "react";
// import api from "../api/axios";
// import {AuthContext} from "./AuthContext";

// // const AuthContext =createContext();

// export const AuthProvider =({children})=>{
//     const [user,setUser]=useState(()=>{
//         const storedUser = localStorage.getItem("user");
//         return storedUser ? JSON.parse(storedUser) : null;
//     });

//     // useEffect(()=>{
//     //     const storedUser = JSON.parse(localStorage.getItem("user"));
//     //     if(storedUser){ setUser(storedUser);}
//     // },[]);

//     const login = async(email,password)=>{
//         const {data}=await api.post("/auth/login",{email,password});

//         setUser(data);
//         localStorage.setItem("user",JSON.stringify(data));
//     };
//     const register = async(username,email,password)=>{
//         const{data}=await api.post("/auth/register",{
//             username,
//             email,
//             password,
//         });
        
//         setUser(data);
//         localStorage.setItem("user",JSON.stringify(data));
//     };
//     const logout=()=>{
//         setUser(null);
//         localStorage.removeItem("user");
//     }
//     return(
//         <AuthContext.Provider value={{ user, login, register,logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // export const useAuth=()=> useContext(AuthContext);


import { createContext,useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
