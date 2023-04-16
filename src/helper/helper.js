import axios from "axios";
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

//** Make API */

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return "Cannot find Token";
    let decode = jwt_decode(token)
    // console.log(decode)
    return decode;
   
}

/** authenticate function */
export  const authenticate = async(username)=>{
    try {
        return await axios.post('/users/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export  const getUser= async({ username })=>{
    try {
        const { data } = await axios.get(`/users/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}


/** register user function */
export  const registerUser= async(credentials)=>{
    try {
        const { data : { message }, status } = await axios.post(`/users/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/users/registerMail', { username, userEmail : email, text : message})
        }

        return message;
    } catch (error) {
          return {error};
    }
}


/** login function */
export const verifyPassword= async({ username, password }) =>{
    try {
        if (username) {
            const { data } = await axios.post('/users/login', { username, password });
            return { data };
        }
    } catch (error) {
        return{error: "Password doesn't Match...!"};
    }
}


/** update user profile function */
export const updateUser = async(response)=> {
    try {
        const token = await localStorage.getItem('token');
        const { data } = await axios.put('/users/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return { data };
    } catch (error) {
        return{error: "Couldn't Update Profile...!"};
    }
}


/** generate OTP */
export const generateOTP = async(username) =>{
    try {
        // Make a GET request to generate an OTP with the provided username
        const { data: { code }, status } = await axios.get('/users/generateOTP', { params: { username } });

        // Send mail with the OTP if the request is successful
        if (status === 201) {
            const { data: { email } } = await getUser({ username });
            const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/users/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });
        }

        return code;
    } catch (error) {
        return {error};
    }
}


/** verify OTP */
export const verifyOTP= async({ username, code })=>{
    try {
       const { data, status } = await axios.get('/users/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return {error};
    }
}

/** reset password */
export const resetPassword=async ({ username, password })=>{
    try {
        const { data, status } = await axios.put('/users/resetPassword', { username, password });
        return { data, status};
    } catch (error) {
          return {error};
    }
}