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

    //** -- Variables --
    var sumatoria_1 = 0
    var sumatoria_2 = 0
    var sumatoria_3 = 0
    var sumatoria_4 = 0
    var score_1_media = 0
    var score_2_media = 0
    var score_3_media = 0
    var score_4_media = 0

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

            if(redessociales.length > 1){

                var redes_sociales_vacias = 0
                
                for (const i in redessociales){
                    if(redessociales[i]['scores'].length !== 0){
                        var ultimascore = redessociales[i]['scores'].length-1
                        sumatoria_1 = sumatoria_1 + redessociales[i]['scores'][ultimascore].score_1
                        sumatoria_2 = sumatoria_2 + redessociales[i]['scores'][ultimascore].score_2
                        sumatoria_3 = sumatoria_3 + redessociales[i]['scores'][ultimascore].score_3
                        sumatoria_4 = sumatoria_4 + redessociales[i]['scores'][ultimascore].score_4
                    }else{
                        redes_sociales_vacias = redes_sociales_vacias + 1
                    }
                }

                score_1_media = sumatoria_1 / (redessociales.length - redes_sociales_vacias)
                score_2_media = sumatoria_2 / (redessociales.length - redes_sociales_vacias)
                score_3_media = sumatoria_3 / (redessociales.length - redes_sociales_vacias)
                score_4_media = sumatoria_4 / (redessociales.length - redes_sociales_vacias)

                row.push(
                    <div key={"resumen"}>
                        <RedSocial 
                        tipo = {"resumen"}
                        score1_resumen = {score_1_media*100}
                        score2_resumen = {score_2_media*100}
                        score3_resumen = {score_3_media*100}
                        score4_resumen = {score_4_media*100}
                        />
                    </div>
                )
            }

            for (const i in redessociales){  
                ////console.log(redessociales[i]['scores'])    
                if(redessociales[i]['scores'].length === 0){
                    row.push(
                        <div key={i}>
                            <RedSocial 
                            name = {redessociales[i].name}
                            score1 = {0}
                            score2 = {0}
                            score3 = {0}
                            score4 = {0}
                            idred = {redessociales[i].id}
                            />
                        </div>
                    )
                }else{
                    var ultimascore = redessociales[i]['scores'].length-1
                    row.push(
                        <div key={i}>
                            <RedSocial 
                            name = {redessociales[i].name}
                            score1 = {redessociales[i]['scores'][ultimascore].score_1}
                            score2 = {redessociales[i]['scores'][ultimascore].score_2}
                            score3 = {redessociales[i]['scores'][ultimascore].score_3}
                            score4 = {redessociales[i]['scores'][ultimascore].score_4}
                            idred = {redessociales[i].id}
                            />
                        </div>
                    )
                }
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