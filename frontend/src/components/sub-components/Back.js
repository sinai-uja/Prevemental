import React from 'react'
import '../css/general.css';
import '../css/navbar.css';
import back from '../images/flechaizquierda.png'
import { useNavigate } from 'react-router-dom'

//*TODO -- Botón para volver hacia atrás --

const Back = (props) => {

    const navigate = useNavigate();

    const redirect = () => {
        if(props.vista === "perfilusuario"){
            navigate("/dashboard")
        }else if (props.vista === "addredsocial"){
            navigate("/perfilusuario")
        }else{
            navigate(-1)
        }
    }

    // --- HTML --- //
    if(props.vista === "perfilusuario" || props.vista === "addusuario" || props.vista === "addredsocial"){
        return (
            <div className='navbar-brand'>
                <img className='nav-img-home' src={back}  onClick={redirect} alt='back'/>
                <p className='text-nav'>{props.nombre}</p>
            </div>
        )
    }else{
        return (
            <div className='navbar-brand'>
                <img className='nav-img-home' src={back}  onClick={redirect} alt='back'/>
                <p className='text-nav'>Modificar</p>
            </div>
        )
    }
}

export default Back