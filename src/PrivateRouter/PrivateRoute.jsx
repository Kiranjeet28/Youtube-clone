
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


const PrivateRoute = () => {
    const {user} = useAuth(); 
    console.log(user)
    return( user ? <Outlet/> : <Navigate to="/Sign"/>)
}
export default PrivateRoute