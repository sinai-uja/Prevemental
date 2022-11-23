import React from 'react'
import '../css/general.css';
import '../css/navbar.css';
import logout from '../images/logout.png'
import { useNavigate } from 'react-router-dom'

//*TODO -- Botón para cerrar sesión --

const LogOut = () => {

    const navigate = useNavigate();

    const log = () => {
        localStorage.clear()
        navigate('/')
    }
            
    // --- HTML --- //
    return (
        <img className='nav-img-setting' src={logout} onClick={log} alt='logout'/>
    )
}

export default LogOut