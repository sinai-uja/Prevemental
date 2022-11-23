import React from 'react'
import '../css/general.css';
import '../css/navbar.css';
import logo from '../images/logo_v2.png'

//*TODO -- Base de la Navbar (Estilo) -- 

const NavbarMain = () => {

    // --- HTML --- //
    return (
        <div className='div-logo'>
            <img className='nav-img-logo' src={logo} alt='Prevemental'/>
        </div>
    )
}

export default NavbarMain