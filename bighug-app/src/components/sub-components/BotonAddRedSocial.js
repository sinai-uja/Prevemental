import '../css/general.css';
import '../css/addredsocial.css';
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';
import add from '../images/add.png'

//*TODO -- Botón para añadir red social --

const BotonAddRedSocial = (props) => {

    const navigate = useNavigate();

    //** -- Funcion de redireccion --
    function redirect(){
        navigate('/addredsocial')
    }

    return(
        <div>
            <hr className='linea-color'></hr>
            <div className='d-flex justify-content-center col-12'>
                
                <button 
                    className='btn btn-primary btn-lg button-green' 
                    onClick={redirect}>
                    Añadir red social
                </button>
            </div>
        </div>

    ) 

}

export default BotonAddRedSocial