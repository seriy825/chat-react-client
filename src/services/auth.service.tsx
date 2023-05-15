import axios from "axios";
import { LoginUser } from "../types/LoginUser.type";
import { RegisterUser } from "../types/RegisterUser.type";

const apiUrl = process.env.REACT_APP_API_URL;

export const AuthService = {  
  async signIn (data:LoginUser) {    
    return await axios.post(apiUrl+'/auth/login',data);
  },
  async signUp (data:RegisterUser) {
    return await axios.post(apiUrl+'/auth/register',data);
  },
  async confirm (token:string) {
    return await axios.post(apiUrl+'/auth/confirmation',{token});
  }
}