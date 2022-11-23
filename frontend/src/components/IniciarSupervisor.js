import React, { useState } from 'react'
import './css/general.css';
import './css/registrarlogin.css';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

//*TODO -- Formulario de inicio de sesión de la cuenta de supervisor --

const IniciarSupervisor = () => {

    // --- Variables --- //
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
    const [accesstoken, setaccesstoken] = useState(localStorage.getItem(localStorage.getItem("accesstoken")|| ""));
    const [idusuario, setidusuario] = useState(localStorage.getItem(localStorage.getItem("idusuario")|| ""));
    const [nombreusuario, setnombreusuario] = useState(localStorage.getItem(localStorage.getItem("nombreusuario")|| ""));
    const [emailsupervisor, setemailsupervisor] = useState(localStorage.getItem(localStorage.getItem("emailsupervisor")|| ""));
    const [idredsocial, setidredsocial] = useState(localStorage.getItem(localStorage.getItem("idredsocial")|| ""));
    const [infored, setInfored] = useState(localStorage.getItem(localStorage.getItem("infored")|| ""));
    const navigate = useNavigate();

    const loginPost = () => {

        const userForm = new FormData()
        userForm.append("username", `${email}`)
        userForm.append("password", `${password}`)

        ////fetch('http://localhost:8000/login',{
        fetch('https://bighug.ujaen.es/api/login',{
            method: 'POST',
            mode: 'cors',
            body: userForm,
        })
        .then(function(response) {
            if(response.status === 200){
                //console.log("Todo ok")
            }else{
                setMessage("El usuario o la contraseña son erróneos")
                throw new Error(response.status)
            }
            return response.json();
        })
        .then(function(parsedJson) {
            localStorage.setItem("accesstoken", parsedJson.access_token);
        })
        .then(function(response){
            setauthenticated(true)
            setemailsupervisor(email)
            localStorage.setItem("authenticated", true);
            localStorage.setItem("emailsupervisor", email);
            alert("Autentificación con éxito")
            navigate('/dashboard')
        })
    }

    //** -- Cuando loguea --
    const handleSubmit = (event) => {
        event.preventDefault()
        loginPost()
    }

    // --- HTML --- //
    return (
        <div>
            <Navbar vista = {"iniciar-registrar"}/>
            <div className='container py-1'>
                <div className="d-flex justify-content-center py-4">
                    <div className="card text-dark mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8" >
                        <div className='py-1'></div>
                        <form onSubmit={handleSubmit}>

                        <div className='d-flex justify-content-center py-3'>
                            <div className='row col-11'>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={email}
                                    className="form-control" 
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div className='row col-11'>
                                <input 
                                    type="password"
                                    name="password"
                                    value={password}
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                ></input>
                                <div>
                                    <p className='error-message'>{message}</p>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg button-green"
                                value="Submit"
                                >Iniciar sesión
                            </button>
                        </div>

                        <div className='d-flex justify-content-center py-4'>
                            <Link
                            to="/registrar"
                            type="button" 
                            className="btn btn-link registro" 
                            ><p>¿No tiene cuenta aún? Regístrese aquí</p>
                            </Link>
                        </div>

                        </form>
                        <div className=''></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IniciarSupervisor