import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Welcome from './components/Welcome';

import Footer from './components/Footer';
import './App.css';

import UpdateProfile from './components/UpdateProfile';
import Axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest} render={(props) => {
      return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
    }}
  />;
}


function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }
  const [getuser,setuser]=useState([])
  Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
if(currentUser.id){
 
    Axios.get(`http:5000/api/user/get/${currentUser.id}`).then(res=>{
      
       setuser(res.data)
     }).catch(err=>{
       console.log(err)
     })
  
  
  
  
  
}


  

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route path="/signup" component={ Signup } />
          <Route 
            path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} 
          />
          
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} getall={getuser}/>
          <PrivateRoute path="/update" component={ UpdateProfile } user={currentUser} />
          <Route exact path="/" component={ Welcome } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
