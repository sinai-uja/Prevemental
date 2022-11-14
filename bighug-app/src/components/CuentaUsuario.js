import React, { useState } from 'react'
import './css/general.css';
import { useNavigate, Navigate } from 'react-router-dom'
import Navbar from './Navbar';
import axios from 'axios';

//*TODO -- Configuración de la cuenta de los usuarios del supervisor --

const CuentaUsuario = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    //** -- Validación formulario --
    const Validation = (tipo) =>{

        var confirmacion1 = false;

        //** -- Email
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if(regEx.test(email) &&  email === localStorage.getItem("emailsupervisor")){
            confirmacion1 = true;
            setMessage("")
        }else{
            confirmacion1 = false;
            setMessage("El email no concuerda con el email de la cuenta")
        }

        if(confirmacion1){
            return true
        }else{
            return false
        }
    }

    //** -- Cambio de contrasenia
    const handleSubmit = (event) =>{
        event.preventDefault();
        const confirmPost = Validation();

        if(confirmPost){
            
            const token = localStorage.getItem("accesstoken")
            var auth = "Bearer " + token
            ////var url = "http://localhost:8000/users/" + localStorage.getItem("idusuario")
            var url = "http://localhost:5500/users/" + localStorage.getItem("idusuario")

            const config = {
                headers:{
                'Authorization': auth,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
                }
            };
    
            axios.delete(
                url,
                config
            ).then(console.log).catch(console.log);

            alert('Se ha eliminado la cuenta con exito')
            navigate('/dashboard')
        }
    }

    //** -- Redirección --
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)
    }

    // --- HTML --- //
    return (
        <div>
            <Navbar vista={"options"} nombre={"Cuenta usuario"}/>
            <div className="d-flex justify-content-center container py-2">
                <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-5 py-4" >
                        <form method='post' onSubmit={handleSubmit}>
                            <div className='d-flex justify-content-center'>
                                <div className='row col-11'>
                                    <input
                                        id="email"
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control" 
                                        placeholder="Email">
                                    </input>
                                    <div>
                                        <p className='error-message'>{message}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <button 
                                    type="submit" 
                                    className="btn btn-danger btn-lg button-red"
                                    >Eliminar cuenta
                                </button>
                            </div>
                        </form>
                    <div className='py-2'></div>
                </div>
            </div>
        </div>
    )
}

export default CuentaUsuario