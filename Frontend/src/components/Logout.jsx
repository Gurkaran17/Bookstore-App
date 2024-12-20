import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast';

function Logout() {
    const[authUser, setAuthUser] = useAuth();
    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                user: null,
            });
            localStorage.removeItem("User");
            toast.success("Logout successfully");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
            window.location.reload();
        } catch (error) {
            toast.error("Error: " + error);
            setTimeout(() => {},3000)
        }
    };
  return (
    <div>
      <button className ="py-3 px-4 bg-red-500 text-white rounded-md cursor-pointer"
      onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout
