import React from 'react'

// add UserAuthContext
import { useUserAuth } from '../context/UserAuthContext';

// add router
import { useNavigate } from 'react-router-dom';

// add react-bootstrap
import { Button } from 'react-bootstrap';

function BackEnd() {

    const { logOut, user } = useUserAuth();

    const navigate = useNavigate();

    // logOut function
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <div>BackEnd</div>
            <Button onClick={handleLogout} variant='danger'>Logout</Button>
        </div>


    )
}

export default BackEnd