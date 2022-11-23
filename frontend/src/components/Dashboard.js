import './css/general.css';
import './css/dashboard.css';
import UsuarioCard from './sub-components/UsuarioCard';
import add from './images/add.png'
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';

//*TODO -- Tablón con los usuarios registrados --

const Dashboard = () => {

    // -- Variables --
    const [authenticated, setAuthenticated] = useState(null);
    const [accesstoken, setaccesstoken] = useState(null);
    const [usuariodata, setUsuariodata] = useState(null);
    const navigate = useNavigate();
    var auth = "Bearer "
    const token = localStorage.getItem("accesstoken")


    // Cada vez que entra en la vista pedir los niños del supervisor
    useEffect(() => {

        ////console.log("Acabo de iniciar esta pagina")
        auth = auth + token
        const config = {
            headers:{
            'Authorization': auth,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
            }
        };
        
        axios.get(
            ////'http://localhost:8000/users',
            'https://bighug.ujaen.es/api/users',
            config
        ).then(
            resp => {
                setUsuariodata(resp.data)
        });
        
    }, []);

    //** -- Redirección --
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)
    }

    //** -- Funcion de redireccion --
    function redirect(){
        navigate('/addusuario')
    }

    //** -- Funcion que crea los grids de los niños --
    function Grids_usuarios(){   
        const row = []

        //** -- Añadimos cada uno de los usuarios de la aplicacion --
        if(usuariodata){
            for (const i in usuariodata){
                row.push(
                    <div className='col grid2' key={i}>
                        <UsuarioCard name = {usuariodata[i].name} usuarioid = {usuariodata[i].id} image = {usuariodata[i].profile_image} key={i}/>
                    </div>
                )
            }
            row.push(
                <div className='col grid2'  onClick={redirect} key={"añadir"}>
                    <img src={add} className="card-img" alt="img-perfil"></img>
                    <div className='larger'>
                        <h3 className="nombre-user">Añadir perfil a supervisar</h3>
                    </div>
                </div>)
            return <div className='row row-cols-2'>{row}</div>
        }
    }

    return(
        <div>
            <Navbar vista = {"dashboard"} />
            <div className='container text-center'>
                <div className='py-1'></div>   
                <Grids_usuarios />
            </div>
        </div>
    )

}

export default Dashboard