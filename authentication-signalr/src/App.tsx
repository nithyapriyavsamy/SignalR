import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './Landing/LandingPage';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Hello from './SignalRDemo/Hello';
import Timer from './TimerForHostedService/Timer';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" Component={LandingPage}/>
            <Route path="/register" Component={Register}/>
            <Route path="/login" Component={Login}/>
            <Route path="/hello" Component={Hello}/>
            <Route path="/timer" Component={Timer}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
