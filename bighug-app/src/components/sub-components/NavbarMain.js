import React from 'react'
import '../css/general.css';
import logo from '../images/logo_v2.png'

//*TODO -- Base de la Navbar (Estilo) -- 

const NavbarMain = () => {

    // --- HTML --- //
    return (
        <div className='centrar'>
            <img className='nav-img-logo d-inline-block' src={logo} />
        </div>
    )
}

export default NavbarMain