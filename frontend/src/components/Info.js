import React from 'react'
import './css/general.css';
import './css/help.css';
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar';

//*TODO -- Contenido de información de ayuda --

const Info = () => {

    function Contenido(){

        if(!localStorage.getItem("authenticated")){
            return(<Navigate to="/" replace={true}/>)
        }

        // ANSIEDAD
        if(localStorage.getItem("infored") === "ansiedad"){
            return(
                <div className='container'>
                    <p className='text-help'>
                    Línea de atención psicológica rápida a modo de primeros auxilios psicológicos, principalmente situaciones de ansiedad,
                    cansancio emocional por sobrecarga, duelo, estados depresivos...
                    </p>
                    <p className='text-number'>
                    Teléfono: 851 000 520
                    </p>
                    <a href={'https://www.juntadeandalucia.es/presidencia/portavoz/salud/151213/atencionpsicologica/trabajadores/Covid19/coronavirus#:~:text=El%20851%20000%20520%20funciona,y%20la%20asistencia%20es%20gratuita&text=La%20l%C3%ADnea%20de%20atenci%C3%B3n%20psicol%C3%B3gica%20abierta%20es%20totalmente%20gratuita.'}
                    target="_blank">
                    Mas información aquí
                    </a>
                </div>
            )
        }

        // DEPRESION
        if(localStorage.getItem("infored") === "depresion"){
            return(
                <div className='container'>
                    <p className='text-help'>
                    La línea de ayuda de Integral Care ofrece apoyo durante una crisis las 24 horas al día, 7 días a la semana, así como acceso a todos nuestros programas, 
                    servicios para adultos y niños e incluyendo citas.
                    </p>
                    <p className='text-number'>
                    Teléfono: 844 398 8252
                    </p>
                    <a href={'https://integralcare.org/es/247-crisis-helpline-2/'}
                    target="_blank">
                    Mas información aquí
                    </a>
                </div>
            )
        }

        // TCA
        if(localStorage.getItem("infored") === "tca"){
            return(
                <div className='container'>
                    <p className='text-help'>
                    El siguiente teléfono facilita de forma gratuita información sobre trastornos alimentarios, acaba de ser puesto en 
                    marcha por la Consejería de Sanidad y Consumo de la Comunidad de Madrid
                    </p>
                    <p className='text-number'>
                    Teléfono: 900 60 50 40
                    </p>
                    <a href={'https://www.acab.org/es/prevencion/que-se-puede-hacer-desde-casa/'}
                    target="_blank">
                    ¿Que hacer desde casa?
                    </a>
                </div>
            )
        }

        // LUDOPATIA
        if(localStorage.getItem("infored") === "ludopatia"){
            return(
                <div className='container'>
                    <p className='text-help'>
                    Teléfono gratuito de ayuda a las personas que puedan tener problemas de ludopatía y que será atendido 
                    por profesionales especializados en el tratamiento de estos trastornos y en el juego responsable.
                    </p>
                    <p className='text-number'>
                    Teléfono: 900 53 30 25
                    </p>
                    <a href={'https://ludopatiaonline.com/asociaciones-de-ayuda-ludopatia/'}
                    target="_blank">
                    Asociaciones de ayuda contra la ludopatía
                    </a>
                </div>
            )
        }

    }

    return(
        <div>
            <Navbar vista={"home"} nombre = {"Ayuda"}/>
            <div className='container'>

                <Contenido />

            </div>
        </div>
    )

}

export default Info