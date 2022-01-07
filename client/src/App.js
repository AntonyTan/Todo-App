import React, {Fragment, useState, useEffect} from "react";
import "./App.css"

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };
  const setReg = (bool) => {
    setShowRegister(bool);
  }

  const isAuth = async() => {
    try {
      if (localStorage.token === undefined){
        return;
      }
      const response = await fetch("/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      })
      const result = await response.json();

      (result===true ? setIsAuthenticated(true) : setIsAuthenticated(false));
    } catch (error) {
        console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (

    <div className = {!isAuthenticated ? 'auth-page' : 'dashboard'}>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      {!isAuthenticated ? 
      (!showRegister)? (<Login setAuth = {setAuth} setReg = {setReg}/>) : (<Register setAuth = {setAuth} setReg = {setReg}/>)
      :
      <Dashboard className = 'dashboard'setAuth = {setAuth} />
    }

    </div>
  );
}

export default App;
