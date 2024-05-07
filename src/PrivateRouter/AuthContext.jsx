import { createContext, useContext,useEffect,useState } from "react";
import { account } from "../Appwrite/appwriteConfig";
import { ID } from "appwrite";
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    useEffect(()=>{
        checkUserStatus()
    })
    const loginUser = async(userInfo) => {
        try{
            let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password)
            let accountDetails = await account.get();
            setUser(accountDetails)
            return response;
        }catch(error){
            console.error(error)
            throw error;
        }
    }
    // Login with google 
    const LoginWithGoogle = async ()=>{
        try{
         account.createOAuth2Session(
            'google',
            'http://localhost:5173/',
            'http://localhost:5173/fail'
        )
        let accountDetails = await account.get(); 
        setUser(accountDetails);
        accountDetails.name
    }
        catch(error){
            throw error;
        }
    }

    // get the name and email of the user 
    const DetailUser = async ()=>{
        try{
        let accountDetails = await account.get(); 
        setUser(accountDetails);
        return {
            email : accountDetails.email,
            name : accountDetails.name,
        }
    }
        catch(error){
            throw error;
        }
    }
    

    const logoutUser =() =>{
        account.deleteSession('current')
        setUser(null)
        
    }
    const registerUser = async (userInfo) => {
        try {
          let response = await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
          await account.createEmailPasswordSession(userInfo.email, userInfo.password1);
          let accountDetails = await account.get();
          setUser(accountDetails);
          return response; 
        } catch (error) {
          console.error(error);
          throw error; 
        }
      };
      
    const checkUserStatus = async() =>{
        try{
            let accountDetails = await account.get();
            setUser(accountDetails)
        }catch(error){
            console.log("Check user Error",error)
        }
    }
    const contextData ={
        user,
        loginUser,
        logoutUser,
        registerUser,
        LoginWithGoogle,
        DetailUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
     )
}
export default AuthContext
export const useAuth = () => {return useContext(AuthContext)}