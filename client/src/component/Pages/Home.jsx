import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5001/vault/users/logout', null, {
                withCredentials: true,
            });

            console.log(response);

            if (response.status === 200) {
                toast.success("Successfully logout")

                localStorage.removeItem('Token');
                localStorage.removeItem('Role');
                localStorage.removeItem('loggedIn');
                
                setTimeout(() => {
                    navigate('/login')
                }, 500);

                
            }

        } catch (error) {
            toast.error("Logout failed")
            console.log("Error : ", error)
        }
    }
  return (
    <button onClick={handleLogout} className="text-3xl font-bold underline">
      Logout
    </button>
  )
}

export default Home