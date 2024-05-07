import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../PrivateRouter/AuthContext';
function MainRL() {
    const { user, logoutUser,DetailUser } = useAuth();
    const navigate = useNavigate()

    const loginButton = () => {
        navigate('/Sign');
    };
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userDetails = await DetailUser();
          setEmail(userDetails.email);
          setName(userDetails.name);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserDetails();
    }, []);

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-red-300">
        <div className="text-center">
          {user ? (
            <div>
              <h1 className="text-white text-[10vh] font-mono font-bold mb-4">Welcome, {name}</h1>
              <p className="text-white text-lg mb-4">{email}</p>
              <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-6 rounded" onClick={logoutUser}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-white text-2xl font-bold mb-4">Login to access more features</h2>
              <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded" onClick={loginButton}>
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
      
      );
      
}

export default MainRL;
