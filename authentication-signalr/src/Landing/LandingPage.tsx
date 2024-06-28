import { useNavigate } from 'react-router-dom';
function LandingPage(){
    const navigate = useNavigate();
    const navToRegister=()=>{
        navigate("/register");
    }

    const navToLogin=()=>{
        navigate("/login");
    }

    return(
        <div>
            <br/><br/><button onClick={navToRegister}>Register</button> 
            <br/><br/><button onClick={navToLogin}>Login</button>
        </div>
    );
}
export default LandingPage;