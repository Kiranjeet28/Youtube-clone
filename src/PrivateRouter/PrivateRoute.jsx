
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


const PrivateRoute = () => {
    const {user} = useAuth(); 
    return( user ? <Outlet/> : <Navigate to="/Sign"/>)
}
export default PrivateRoute