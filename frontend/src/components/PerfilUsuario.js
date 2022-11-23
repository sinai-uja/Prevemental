import './css/general.css';
import './css/perfilusuario.css';
import React from 'react'
import BotonAddRedSocial from './sub-components/BotonAddRedSocial';
import { useEffect, useState } from "react";
import { Navigate} from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import RedSocial from './sub-components/RedSocial';


//*TODO -- Vista de las redes sociales de un usuario --

const PerfilUsuario = () => {

    const [redessociales, setRedessociales] = useState(null);
    var auth = "Bearer "
    ////var url = "http://localhost:8000/users/"
    var url = "https://bighug.ujaen.es/api/users/"
    const token = localStorage.getItem("accesstoken")

    //** -- Cada vez que entra en la vista pedir las redes sociales asociadas --
    useEffect(() => {
        auth = auth + token
        url = url + localStorage.getItem("idusuario") + '/social-networks'

        //console.log(auth)
        //console.log(url)

        const config = {
            headers:{
            'Authorization': auth,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
            }
        };
        
        axios.get(
            url,
            config
        )
        .then(
            resp => {
                //console.log(redessociales)
                setRedessociales(resp.data)
        });

    }, []);

    //** -- Funcion mostrar redes sociales --
    function GetRedes(){
        const row = []
        if(redessociales){
            ////console.log(redessociales)
            
            /** 
            ** Resumen TAB (Solo activo si hay mas de 1 red social)
            *! Aqui podrian hacerse las medias
            *? NUEVO: pasar que es resumen para cambiar encabezado
            *? score1 -> score1_media
            */
            
            if(redessociales.length > 1){
                row.push(
                    <div key={"resumen"}>
                        <RedSocial 
                        tipo = {"resumen"}
                        />
                    </div>
                )
            }

            for (const i in redessociales){
                row.push(
                    <div key={i}>
                        <RedSocial 
                        name = {redessociales[i].name}
                        score1 = {redessociales[i].score_1}
                        score2 = {redessociales[i].score_2}
                        score3 = {redessociales[i].score_3}
                        score4 = {redessociales[i].score_4}
                        idred = {redessociales[i].id}
                        />
                    </div>
                )
            }

            row.push(
                <div key="prueba">
                    <BotonAddRedSocial id = {localStorage.getItem("idusuario")}/>
                </div>
            )

            return <div>{row}</div>
        }
    }

    //** -- Redirección -- 
    if(!localStorage.getItem("authenticated")){
        return(<Navigate to="/" replace={true}/>)
    }

    // -- HTML --
    return(
        <div>
            <Navbar vista = {"perfil"} nombre = {localStorage.getItem("nombreusuario")} />
            <div className='container col-sm-10 col-md-8 col-lg-6 col-xl-6 py-4'>
            <div className='py-2'></div>

            <GetRedes />
                
            </div>
        </div>
    )

}

export default PerfilUsuario