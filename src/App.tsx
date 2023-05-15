import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { LoginPage } from './components/Auth/LoginPage';
import { Chats } from './components/Chat/Chats';
import { RegisterPage } from './components/Auth/RegisterPage';
import { Confirmation } from './components/Auth/Confirmation';
import jwtDecode from 'jwt-decode';
import { NotConfirmed } from './components/Auth/NotConfirmed';

interface UserJWT{
  emailVerified:boolean;
}

export const App = () => {  

  const [token,setToken] = useState(localStorage.getItem('user'));
  const [isRegistered,setRegistered] = useState(true);
  
  return (
    <div className="App">      
        <Router>
          <Routes>
            {              
              token 
              ? 
              <>
                {
                  (jwtDecode(token) as UserJWT)?.emailVerified
                  ?                                   
                  <Route path='/' key='/' element={<Chats token={token} setToken={setToken}/>}></Route>                  
                  :
                  <> 
                  <Route path='/' key='/' element={<NotConfirmed/>}></Route>                  
                  </>
                }                
                <Route path={'/auth/confirmation/'+token} element={<Confirmation token={token} setToken={setToken}/>}></Route>
              </>
              :
              <>
                {
                  isRegistered 
                  ?
                  <Route path='/' key='/' element={<LoginPage setRegistered={setRegistered} setToken={setToken}/>}></Route>
                  :
                  <Route path='/' key='/' element={<RegisterPage setRegistered={setRegistered} setToken={setToken}/>}></Route>
                }
              </>            
            }          
          </Routes>
        </Router>
    </div>
  );
};
