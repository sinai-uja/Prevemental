import React, { useState } from 'react'
import './css/general.css';
import { useNavigate, Navigate } from 'react-router-dom'
import Navbar from './Navbar';
import axios from 'axios';

//**TODO -- Configuración de la cuenta de supervisor --

const MiCuenta = () => {

    // --- Variables --- //
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const [message4, setMessage4] = useState("");
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.clear()
        navigate('/')
    }

    //** -- Validación formulario --
    const Validation = (tipo) =>{

        var confirmacion1 = false;
        var confirmacion2 = false;
        var confirmacion3 = false;

        if(tipo === "editar"){
            //** -- Email --
            const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
            if(regEx.test(email) &&  email === localStorage.getItem("emailsupervisor")){
                confirmacion1 = true;
                setMessage("")
            }else{
                confirmacion1 = false;
                setMessage("El email no concuerda con el email de la cuenta")
            }

            //** -- Contraseña --
            if (password === ""){
                confirmacion2 = false;
                setMessage2("Este campo es obligatorio")
            }else if(password.length < 8){
                confirmacion2 = false;
                setMessage2("La contraseña debe tener al menos 8 carácteres")
            }else{
                confirmacion2 = true;
                setMessage2("")
            }

            //** -- Repetir contraseña --
            if (password2 === ""){
                confirmacion3 = false;
                setMessage3("Este campo es obligatorio")
            }else if (password !== password2) {
                confirmacion3 = false;
                setMessage3("Las contraseñas no coinciden")
            }else{
                confirmacion3 = true;
                setMessage3("")
            }

            //** -- Enviar confirmacion de POST --
            if(email !== "" && password !== "" && password2 !== ""){
                if(confirmacion1 && confirmacion2 && confirmacion3){
                    return true
                }else{
                    return false
                }
            }return false

        }else if(tipo === "eliminar"){

            //** -- Email --
            const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
            if(regEx.test(email2) &&  email2 === localStorage.getItem("emailsupervisor")){
                confirmacion1 = true;
                setMessage4("")
            }else{
                confirmacion1 = false;
                setMessage4("El email no concuerda con el email de la cuenta")
            }

            //** -- Enviar confirmacion de POST --
            if(confirmacion1){
                return true
            }else{
                return false
            }
        }

    }

    //** -- Cambio de contrasenia --
    const handleSubmit_cambio = (event) =>{
        event.preventDefault();
        const confirmPost = Validation("editar");

        /**
        ** Aqui recibimos y tratamos la respuesta
        ** Hay que enviar el token y la contrasenia nueva
        */
        if(confirmPost){

            const token = localStorage.getItem("accesstoken")
            var auth = "Bearer " + token
            ////var url = "http://localhost:8000/supervisor/update"
            var url = "https://bighug.ujaen.es/api/supervisor/update"
            

            //console.log("Autorizacion: " + auth)
            //console.log("URL: " + url)

            const config = {
                headers:{
                'Authorization': auth,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
                }
            };
    
            const jsonContent = JSON.stringify({ password: password });
    
            axios.put(
                url,
                jsonContent,
                config
            )
            ////).then(console.log).catch(console.log);
            
            alert('Se ha modificado la contraseña con éxito')
            logout()
        }
    }

    //** -- Eliminacion de cuenta **
    const handleSubmit_eliminar = (event) =>{
        event.preventDefault();
        const confirmPost = Validation("eliminar");

        if(confirmPost){

            const token = localStorage.getItem("accesstoken")
            var auth = "Bearer " + token
            ////var url = "https://localhost:8000/supervisor"
            var url = "https://bighug.ujaen.es/api/supervisor"

            //console.log(auth)

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

            alert('Se ha eliminado su cuenta con exito')
            localStorage.clear()
            navigate("/")

        }
    }
    
    //** -- Redirección --
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)
    }
    

    // --- HTML --- //
    return (
        <div>
            <Navbar vista={"home"} nombre = {"Mi cuenta"}/>
            <div className='py-2'></div>
            <div className="d-flex justify-content-center container py-2">
                <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8 py-4" >
                        <form method='post' onSubmit={handleSubmit_cambio}>
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

                            <div className='d-flex justify-content-center py-1'>
                                <div className='row col-11'>
                                    <input 
                                        type="password"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Contraseña">
                                    </input>
                                    <div>
                                        <p className='error-message'>{message2}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <div className='row col-11'>
                                    <input 
                                        type="password"
                                        value={password2} 
                                        onChange={(e) => setPassword2(e.target.value)}
                                        className="form-control"
                                        placeholder="Repetir contraseña">
                                    </input>
                                    <div>
                                        <p className='error-message'>{message3}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg button-green"
                                    >Cambiar contraseña
                                </button>
                            </div>
                        </form>
                    <div className='py-2'></div>
                </div>
            </div>
            
            <div className="d-flex justify-content-center container">
                <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8 py-4" >
                        <form method='post' onSubmit={handleSubmit_eliminar}>
                            <div className='d-flex justify-content-center'>
                                <div className='row col-11'>
                                    <input
                                        id="email2"
                                        type="email" 
                                        value={email2} 
                                        onChange={(e) => setEmail2(e.target.value)}
                                        className="form-control" 
                                        placeholder="Confirmar email">
                                    </input>
                                    <div>
                                        <p className='error-message'>{message4}</p>
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

            <div className='d-flex container justify-content-center col-12 col-sm-8 col-md-8 col-lg-8 col-xl-2 py-2'>
                <button 
                    className="btn btn-primary btn-lg button-green"
                    onClick={logout}
                    >Cerrar sesión
                </button>
            </div>
            <div className='py-2'></div>

        </div>
        
    )
}

export default MiCuenta