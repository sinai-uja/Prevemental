import React from 'react'
import { useState } from 'react';
import './css/general.css';
import './css/registrarlogin.css';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

//*TODO -- Vista para registrar al usuario supervisor --

const RegistrarSupervisor = () => {

    // --- VARIABLES --- //
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const navigate = useNavigate();

    //** -- Validación formulario --
    const Validation = () =>{

        var confirmacion1 = false;
        var confirmacion2 = false;
        var confirmacion3 = false;

        //** -- Email --
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
    }


    //** -- Tratamiento cuando se envía formulario --
    const handleSubmit = (event) =>{
        event.preventDefault();
        ////alert(`${email} ${password}`)

        const confirmPost = Validation();

        const jsonData = {
            "email": `${email}`,
            "password": `${password}`
        }

        if(confirmPost){
            //** -- Post a backend --
            ////fetch('http://localhost:8000/register',{
            fetch('https://bighug.ujaen.es/api/register',{
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(jsonData),
            })
            .then(function(response) {
                if(response.status === 400){
                    setMessage3("Este email ya existe")
                }else{
                    alert('Se ha registrado con exito')
                navigate('/')
                }
            })
        }else{
            //console.log("Hay algún error")
        }
    }


    // --- HTML --- //
    return (
        <div>
            <Navbar vista = {"iniciar-registrar"}/>
            <div className='container py-1'>
                <div className="d-flex justify-content-center py-4">
                    <div className="card text-dark mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8" >
                        <div className='py-2'></div>
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
                                    <div className='row col-11'>
                                        <input 
                                            type="password"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Contraseña"
                                            className="form-control">
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
                                            placeholder="Repetir contraseña"
                                            className="form-control">
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
                                        >Registrar
                                    </button>
                                </div>
                            </form>
                        <div className='py-3'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrarSupervisor