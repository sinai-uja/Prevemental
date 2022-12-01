import React from 'react'
import '../css/general.css';
import '../css/navbar.css';
import informacion from '../images/informacion.png'
import { useNavigate } from 'react-router-dom'

//*TODO -- Vista de la información de la privacidad de los datos tratados --

const InfoPrivacidad = () => {

    const navigate = useNavigate();

    function redirect(id_desplegable){
        localStorage.setItem("infored", "privacidad");
        navigate('/info')
    }

    // --- HTML --- //
    return (
        <div>
            <img className='nav-img-setting' src={informacion} onClick={redirect} />
        </div>
    )
}

export default InfoPrivacidad