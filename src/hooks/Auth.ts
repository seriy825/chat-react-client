import { LoginUser } from "../types/LoginUser.type";
import { RegisterUser } from "../types/RegisterUser.type";
import { AuthService } from "../services/auth.service";
import { Dispatch, SetStateAction, useCallback } from "react";

export const useAuth = (setToken:Dispatch<SetStateAction<string|null>>) => {    
   
    const signIn = useCallback(async (data:LoginUser) => {
        try {
            const authresult = await AuthService.signIn(data);
            setToken(authresult.data?.access_token);    
            localStorage.setItem('user',authresult.data?.access_token);
            return authresult;
        } catch (err:any) {
            return err.response;
        }
    },[setToken]);

    const signUp = useCallback( async (data:RegisterUser) => {
        try {        
            const authresult = await AuthService.signUp(data);
            setToken(authresult.data?.access_token);   
            localStorage.setItem('user',authresult.data?.access_token);    
            return authresult;        
        } catch (err:any) {
            return err.response;
        }
    },[setToken]);

    const signOut = () => {
        setToken(null);
    };

    return { signIn, signUp, signOut };
};