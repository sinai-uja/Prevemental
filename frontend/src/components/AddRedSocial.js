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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    const token = localStorage.getItem("accesstoken")
    const userid = localStorage.getItem("idusuario")
    var auth = "Bearer "
    ////var url = "http://localhost:8000/users/"
    var url = "https://bighug.ujaen.es/api/users/"


    const Validation = () =>{

        var confirmacion1 = false;
        var confirmacion2 = false;

        if(email === ""){
            setMessage("Este campo es obligatorio")
            confirmacion1 = false
        }else{
            setMessage("")
            confirmacion1 = true
        }

        if(password === ""){
            setMessage2("Este campo es obligatorio")
            confirmacion2 = false
        }else{
            setMessage2("")
            confirmacion2 = true
        }

        if(confirmacion1 && confirmacion2){
            return true
        }else{
            return false
        }

    }

    useEffect(() => {
        auth = auth + token
        ////url = url + userid + "/social-networks/" + redsocial
        url = url + userid + "/social-networks"
        //console.log("Auth: " + auth)
        //console.log("Url: " + url)
    }, [email, redsocial, password]);

    //** -- Tratamiento cuando se envía formulario --
    const handleSubmit = (event) =>{
        event.preventDefault();

        const confirmPost = Validation();

        if(confirmPost){
            const config = {
                headers:{
                'Authorization': auth,
                ////'Accept' : 'application/json',
                ////'Content-Type': 'application/json'
                }
            };

            const bodyParameters = {
                name: redsocial,
                email: email,
                password: password
            };

            axios.post(
                url,
                bodyParameters,
                config
            ).then(console.log).catch(console.log);

            alert('Se ha registrado con exito')
            navigate('/perfilusuario')
        }else{
            console.log("Hay algún error")
        }
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
                            <img src={red_social} className='img-add2'></img>
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
                                    <div className='row col-11'>
                                        <input 
                                            type="password"
                                            className="form-control"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Contraseña">
                                        </input>
                                        <div>
                                            <p className='error-message'>{message2}</p>
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