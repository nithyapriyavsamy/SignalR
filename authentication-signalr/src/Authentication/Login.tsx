import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../API Service/ApiService";

function Login (){
    const [userName,setUserName] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const apiService = ApiService();

    const handleUserNameChange = (event : any) => {
        setUserName(event.target.value);
    };
    
    const handlePasswordChange = (event : any) => {
        setPassword(event.target.value);
    };

    const navToRegister=()=>{
        navigate("/register");
    }

    const handleLogin=()=>{
        const payload={
            "userName": userName,
            "password": password,
            "token": ""
          }
          apiService.LoginApiService(payload)
          .then(data => {
            alert("login success");
            localStorage.setItem("token",data.token);
            navigate("/hello");
          })
          .catch(error => {
            console.error('Login Error:', error);
          });
    };
    
    return(
        <div>
            <label> User Name</label>
            <input type='text' onChange={handleUserNameChange}></input> <br/><br/>
            <label> Password</label>
            <input type='password' onChange={handlePasswordChange}></input><br/><br/>
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account?</p><button onClick={navToRegister}>Register</button>
        </div>
    );
    }
    
    export default Login;