import { useNavigate } from 'react-router-dom';
import { AuthService } from "../../services/auth.service";
import {  useEffect } from 'react';

export const Confirmation = ( {token,setToken}:any) => {

  const navigate = useNavigate();
  useEffect(()=>{
    const getNewToken=async()=>{
      const newToken =  await AuthService.confirm(token);
      localStorage.setItem('user',newToken?.data?.access_token);
      setToken(newToken?.data?.access_token);
      navigate('/');
    }
    getNewToken();    
  });  
    
  return (<></>);

}