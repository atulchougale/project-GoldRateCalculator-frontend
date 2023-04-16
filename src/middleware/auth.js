
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store"; 

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const ProtectRoute = ({ children }) => {
    const username = useAuthStore.getState().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;

}


    
  
   
  
    export const isAuthenticated = () => {
      // Check if token exists in local storage
      const token = localStorage.getItem("token");
    //   console.log(token)
      return !!token; // Return true if token exists, false otherwise
    };
  
  