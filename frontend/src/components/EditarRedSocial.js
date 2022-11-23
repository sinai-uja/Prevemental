import React, { useState } from 'react'
import './css/general.css';
import { useNavigate, Navigate } from 'react-router-dom'
import Navbar from './Navbar';
import axios from 'axios';

//*TODO -- Configuracion de las redes sociales de cada usuario --

const EditarRedSocial = (props) => {

    // --- Variables --- //
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    const navigate = useNavigate();

    //** -- Validación formulario --
    const Validation = () =>{

        var confirmacion1 = false;

        //** -- Email --
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if(regEx.test(email) &&  (email === localStorage.getItem("emailsupervisor") )){
            confirmacion1 = true;
            setMessage2("")
        }else{
            confirmacion1 = false;
            setMessage2("El email no concuerda con el email de la cuenta")
        }

        if(confirmacion1){
            return true
        }else{
            return false
        }
    }

        //** -- Validación formulario --
        const Validation2 = () =>{

            var confirmacion1 = false;
    
            //** -- Email --
            const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
            if(regEx.test(email2) &&  (email2 === localStorage.getItem("emailsupervisor") )){
                confirmacion1 = true;
                setMessage2("")
            }else{
                confirmacion1 = false;
                setMessage2("El email no concuerda con el email de la cuenta")
            }
    
            if(confirmacion1){
                return true
            }else{
                return false
            }
        }

    //** -- Editar cuenta --
    const handleSubmit = (event) =>{
        event.preventDefault();
        const confirmPost = Validation();

        if(confirmPost){
            
            const token = localStorage.getItem("accesstoken")
            var auth = auth + token
            var url = 
            ////"http://localhost:8000/users/" 
            "https://bighug.ujaen.es/api/users/" 
            + localStorage.getItem('idusuario') 
            + '/social-networks/' 
            + localStorage.getItem('idredsocial')

            const config = {
                headers:{
                'Authorization': auth,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
                }
            };
    
            const jsonContent = {
                key: "key"
            };
    
            axios.put(
                url,
                jsonContent,
                config
            )
                ////).then(console.log).catch(console.log);

            alert('Se ha editado la cuenta con exito')
            navigate(-1)
        }
    }


    //** -- Eliminar cuenta de usuario --
    const handleSubmit2 = (event) =>{
        event.preventDefault();
        const confirmPost = Validation2();

        if(confirmPost){
            
            const token = localStorage.getItem("accesstoken")
            var auth = "Bearer " + token
            var url = 
            "https://bighug.ujaen.es/api/users/" 
            + localStorage.getItem('idusuario') 
            + '/social-networks/' 
            + localStorage.getItem('idredsocial')

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
            )
            ////).then(console.log).catch(console.log);

            alert('Se ha eliminado la cuenta con exito')
            navigate(-1)
        }
    }

    //** -- Redirección --
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)
    }

    // --- HTML --- //
    return (
        <div>
            <Navbar vista={"options"} nombre = {"Editar red social"}/>
            <div className='py-2'></div>
            <div className="d-flex justify-content-center container py-2">
                <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8" >
                    <div className='py-2'></div>
                        <form method='post' onSubmit={handleSubmit}>
                            <div className='d-flex justify-content-center'>
                                <div className='row col-11'>
                                    <input
                                        id="email"
                                        type="email" 
                                        name="email"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control" 
                                        placeholder="Email nuevo">
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
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Contraseña nueva">
                                    </input>
                                    <div>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center py-3'>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg button-green"
                                    >Modificar red social
                                </button>
                            </div>
                        </form>
                        <div className='py-2'></div>
                </div>
            </div>

            <div className="d-flex justify-content-center container">
                <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8" >
                    <div className='py-2'></div>
                        <form method='post' onSubmit={handleSubmit2}>
                            <div className='d-flex justify-content-center'>
                                <div className='row col-11'>
                                    <input
                                        id="email2"
                                        type="email" 
                                        name="email2"
                                        value={email2} 
                                        onChange={(e2) => setEmail2(e2.target.value)}
                                        className="form-control" 
                                        placeholder="Email supervisor">
                                    </input>
                                    <div>
                                        <p className='error-message'>{message2}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <button 
                                    type="submit" 
                                    className="btn btn-danger btn-lg button-red"
                                    >Eliminar red social
                                </button>
                            </div>
                        </form>
                    <div className='py-3'></div>
                </div>
            </div>
        </div>
    )
}

export default EditarRedSocial