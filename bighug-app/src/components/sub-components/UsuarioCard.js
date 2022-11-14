import React from 'react'
import '../css/general.css';
import '../css/dashboard.css';
import { useNavigate } from 'react-router-dom'

//*TODO -- Cartas de usuario para el Dashboard --

const UsuarioCard = (props) => {

    const navigate = useNavigate();

    //*? Guardar el id del usuario para obtener los datos del mismo en backend

    function ir_perfil_usuario(){
        localStorage.setItem("idusuario", props.usuarioid);
        localStorage.setItem("nombreusuario", props.name);
        redirect()
    }

    //** -- Funcion de redireccion --
    function redirect(){
        navigate('/perfilusuario')
    }

    // --- HTML --- //
    return (
        <div className="col"  onClick={ir_perfil_usuario}>
            <img src={props.image} className="card-img" alt="placeholder"></img>
            <div>
                <h3 className="nombre-user">{props.name}</h3>
            </div>
        </div>
    )

}

export default UsuarioCard