import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../API Service/ApiService";

function Register (){
const [userName,setUserName] = useState();
const [password,setPassword] = useState();
const [confirmPassword,setConfirmPassword] = useState();
const navigate = useNavigate();
const apiService = ApiService();

const handleUserNameChange = (event : any) => {
    setUserName(event.target.value);
};

const handlePasswordChange = (event : any) => {
    setPassword(event.target.value);
};

const handleConfirmPasswordChange = (event : any) => {
    setConfirmPassword(event.target.value);
};

const Register = () =>{
    if(password!=confirmPassword){
        alert("Passwords should match!!!")
    }
    const payload={
        "userName": userName,
        "password": password
      };
    apiService.RegisterApiService(payload)
    .then(data=>{
        alert("Register Successful!!!");
    })
    .catch(error=>{
        console.log("Error : ",error);
    });
};

const navToLogin=()=>{
    navigate("/login");
}

return(
    <div>
        <label> User Name   </label>
        <input type='text' onChange={handleUserNameChange}></input> <br/><br/>
        <label> Password  </label>
        <input type='password' onChange={handlePasswordChange}></input><br/><br/>
        <label> Confirm Password   </label>
        <input type='password' onChange={handleConfirmPasswordChange}></input><br/><br/>
        <button onClick={Register}> 
            Register
        </button><br/><br/>
        <p>Already have an account?</p><button onClick={navToLogin}>Login</button>
    </div>
);
}

export default Register;