import React, {useEffect, useState} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import './css/general.css';
import './css/addusuario.css';
import axios from 'axios';
import Navbar from './Navbar';

import defaul from './images/avatar/default.png'
import uno from './images/avatar/1.png'
import dos from './images/avatar/2.png'
import tres from './images/avatar/3.png'
import cuatro from './images/avatar/4.png'
import cinco from './images/avatar/5.png'
import seis from './images/avatar/6.png'
import siete from './images/avatar/7.png'

//*TODO -- Añadir usuario --

const AddUsuario = () => {

    const navigate = useNavigate();

    // --- Variables --- //
    const [nombre, setNombre] = useState("");
    //const [biblioteca, setBiblioteca] = useState([defaul, uno, dos, tres, cuatro, cinco, seis, siete]);
    const [imagen, setImagen] = useState(defaul);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("accesstoken")
    var auth = "Bearer "
    ////var url = "http://localhost:8000/users/"
    var url = "https://bighug.ujaen.es/api/users"

    const Validation = () =>{
        if(nombre === ""){
            setMessage("Este campo es obligatorio")
            return false
        }else{
            return true
        }
    }

    useEffect(() => {
        auth = auth + token
        //console.log("Auth: " + auth)
        //console.log("Url: " + url)
    }, [nombre, imagen]);

    //** -- Tratamiento cuando se envía formulario
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
                name: nombre,
                profile_image: imagen
            };
    
            axios.post(
                url,
                bodyParameters,
                config
            )
            .then(function(res){
                //** -- Añadir un timeout
                setLoading(true);
                setTimeout(
                    function() {
                        setLoading(false);
                        navigate(-1)
                    }
                    .bind(this),
                    500
                );
                ////alert('Se ha registrado con exito') 
            })
            .catch(function(error) {
                if(error.response){
                    //console.log(error.response.status)
                    if(error.response.status === 400){
                        setMessage("Este usuario ya existe")
                    }
                }
            })
            ////.then(console.log).catch(console.log)
            
        }
    }

    function cambiarImagen(im){
        setImagen(im)
    }

    // -- Redirección -- //
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)}
    
    function GridAvatar(){
        return(
            <div>
                <div className='row'>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(defaul)}>
                            <img src={defaul} className='img-add iz-pad' alt='default'></img>
                        </button>
                    </div>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(uno)}>
                            <img src={uno} className='img-add der-pad' alt='1'></img>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(dos)}>
                            <img src={dos} className='img-add iz-pad' alt='2'></img>
                        </button>
                    </div>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(tres)}>
                            <img src={tres} className='img-add der-pad' alt='3'></img>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(cuatro)}>
                            <img src={cuatro} className='img-add iz-pad' alt='4'></img>
                        </button>
                    </div>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(cinco)}>
                            <img src={cinco} className='img-add der-pad' alt='5'></img>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(seis)}>
                            <img src={seis} className='img-add iz-pad' alt='6'></img>
                        </button>
                    </div>
                    <div className='col'>
                        <button type="button" className='btn-img' data-bs-dismiss="modal" onClick={() => cambiarImagen(siete)}>
                            <img src={siete} className='img-add der-pad' alt='7'></img>
                        </button>
                    </div>
                </div>
                <div className='py-2'></div>
                
            </div>
        )

    }

return(
    <div>
        <Navbar vista = {"home"} nombre = {"Añadir usuario"} />
        <div className="container d-flex justify-content-center py-2">
            <div className="card text-dark bg-light mb-3 col-12 col-sm-9 col-md-8 col-lg-8 col-xl-8" >
                <div className='py-1'></div>
                <form method='post' onSubmit={handleSubmit}>
                <div className='d-flex py-2'>
                    <div className='row  justify-content-center'>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img src={imagen} className='img-add' alt='img-avatar'></img>
                        </button>
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    <div className='row col-11'>
                        <input 
                            type="text" 
                            name="text"
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                            className="form-control" 
                            placeholder="Nombre"
                        ></input>
                        <div>
                            <h5 className='error-message'>{message}</h5>     
                        </div>
                    </div>
                </div>    
                

                <div className='d-flex justify-content-center'>
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-lg button-green"
                        value="Submit"
                        >Añadir usuario
                    </button>
                    
                </div>

                </form>
                <div className='py-3'></div>
            </div>
        </div>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Avatar</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <GridAvatar />
                    
                </div>
                </div>
            </div>
        </div>

    </div>

    )

}

export default AddUsuario