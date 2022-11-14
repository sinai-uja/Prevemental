import React from 'react'
import '../css/general.css';
import '../css/navbar.css';
import setting from '../images/setting.png'
import edit from '../images/editar.png'
import { useNavigate } from 'react-router-dom'

//*TODO -- Configuración del tipo de Navbar dependiendo de la vista --

const Settings = (props) => {

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/micuenta')
    }

    const redirect2 = () => {
        navigate('/cuentausuario')
    }

    const redirect3 = () => {
        localStorage.setItem("idredsocial", props.idred);
        navigate('/editarredsocial')
    }

    // --- HTML --- //
    if(props.tipo === "cuenta"){
        return (
            <img className='nav-img-setting' src={setting} onClick={redirect} />
        )
    }

    // Vista perfil usuario
    if(props.tipo === "usuario"){
        return (
            <img className='nav-img-setting' src={setting} onClick={redirect2} />
        )
    }

    if(props.tipo === "redsocial"){
        return (
            <img className='nav-img-edit' src={edit} onClick={redirect3} />
        )
    }
    
}

export default Settings