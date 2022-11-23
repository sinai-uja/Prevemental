import './css/general.css';
import './css/addusuario.css';
import { useNavigate, Navigate } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import red_social from './images/red-social.png'
import Navbar from './Navbar';

//*TODO -- Añadir red social a usuario --

const AddRedSocial = () => {

    const navigate = useNavigate();

    // Valor por defecto es twitter
    const [redsocial, setRedsocial] = useState("twitter");
    const token = localStorage.getItem("accesstoken")
    const userid = localStorage.getItem("idusuario")
    var auth = "Bearer "
    ////var url = "http://localhost:8000/users/"
    var url = "https://bighug.ujaen.es/api/users/"

    /**
    *? VALIDACION A LA ESPERA DE QUE HACER CON ESTA VISTA
    const confirmacion1 = false
    const confirmacion2 = false
    const Validation = () =>{
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if(regEx.test(email)){
            confirmacion1 = true;
            setMessage("")
        }else if (!regEx.test(email) && email !== ""){
            confirmacion1 = false;
            setMessage("El email no es valido")
        }else if (email === ""){
            confirmacion1 = false;
            setMessage("Este campo es obligatorio")
        }else{
            confirmacion1 = true;
            setMessage("")
        }
    }
    */

    useEffect(() => {
        auth = auth + token
        url = url + userid + "/social-networks/" + redsocial
        //console.log("Auth: " + auth)
        //console.log("Url: " + url)
    }, [redsocial]);

    //** -- Tratamiento cuando se envía formulario --
    const handleSubmit = (event) =>{
        event.preventDefault();

        const config = {
            headers:{
            'Authorization': auth,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
            }
        };

        const bodyParameters = {
            key: "value"
        };

        axios.post(
            url,
            bodyParameters,
            config
        )
        ////.then(console.log).catch(console.log);

        alert('Se ha registrado con exito')
        navigate('/perfilusuario')
    }

    //** -- Tratamiento recoger select --
    const handleChange = (e) => {
        setRedsocial(e.target.value)
    }

    // -- Redirección -- //
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)
    }

    return(
        <div>
            <Navbar vista = {"options"} nombre = {"Añadir red social"}/>
            <div className="container d-flex justify-content-center py-2">
                <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8" >
                    <div className='py-1'></div>
                    <form method='post' onSubmit={handleSubmit}>
                    <div className='d-flex'>
                        <div className='row justify-content-center py-3'>
                            <img src={red_social} className='img-add2' alt='img-redsocial'></img>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center py-2'>
                        <div className='row col-11'>
                                <select onChange={(e) => handleChange(e)} className='form-select form-select-lg mb-3'>
                                    <option defaultValue={"twitter"}>Twitter</option>
                                    <option value={"instagram"}>Instagram</option>
                                </select>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                                    <div className='row col-11'>
                                        <input
                                            id="email"
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Email">
                                        </input>
                                        <div>
                                            <p className='error-message'></p>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <div className='row col-11'>
                                        <input 
                                            type="password"
                                            className="form-control"
                                            placeholder="Contraseña">
                                        </input>
                                        <div>
                                            <p className='error-message'></p>
                                        </div>
                                    </div>
                                </div>

                    <div className='d-flex justify-content-center'>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg button-green"
                            value="Submit"
                            >Añadir red social
                        </button>
                    </div>

                    </form>
                    <div className='py-3'></div>
                </div>
            </div>
        </div>
    )
    

}

export default AddRedSocial