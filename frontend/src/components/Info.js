import React, { useState } from 'react'
import './css/general.css';
import './css/help.css';
import { useNavigate, Navigate } from 'react-router-dom'
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
                <div>
                    <Navbar vista={"home"} nombre = {"Ayuda"}/>
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
                </div>
            )
        }

        // DEPRESION
        if(localStorage.getItem("infored") === "depresion"){
            return(
                <div>
                    <Navbar vista={"home"} nombre = {"Ayuda"}/>
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
                </div>
            )
        }

        // TCA
        if(localStorage.getItem("infored") === "tca"){
            return(
                <div>
                    <Navbar vista={"home"} nombre = {"Ayuda"}/>
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
                </div>
            )
        }

        // LUDOPATIA
        if(localStorage.getItem("infored") === "ludopatia"){
            return(
                <div>
                    <Navbar vista={"home"} nombre = {"Ayuda"}/>
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
                </div>
            )
        }

                // Información privacidad
                if(localStorage.getItem("infored") === "privacidad"){
                    return(
                        <div>
                            <Navbar vista={"home"} nombre = {"Protección de datos"}/>
                            <div className='container'>
                                <p className='text-help'>
                                El responsable del tratamiento de los datos personales tratados con ocasión del Proyecto de Investigación
                                es la Universidad de Jaén, Campus Las Lagunillas s/n. 23071 Jaén. La entidad cuenta con un delegado de protección 
                                de datos a la que puede dirigirse remitiendo email a: dpo@ujaen.es
                                </p>
                                <p className='text-help'>
                                Los datos serán tratados por la Universidad de Jaén en calidad de responsable del tratamiento, con el fin 
                                principal de detectar de forma precoz posibles problemas emocionales en la población adolescente a través 
                                de las interacciones lingüísticas que puedan estar empleando en el mundo digital y de la construcción de sistemas 
                                automáticos de determinación de riesgos mediante inteligencia artificial. Resulta necesario tratar los datos de 
                                identificación y contacto (nombre, apellidos), interacción con las aplicaciones y lenguaje, así como los datos 
                                relacionados con salud, emociones y personalidad. La legitimación para el tratamiento viene dada por el 
                                cumplimiento de una obligación legal y misión y poder público (Ley Orgánica 6/2001 de Universidades, parcialmente 
                                reformada por la Ley 4/2007), y en el consentimiento manifestado mediante la firma y marcado de las casillas 
                                indicadas.
                                </p>
                                <p className='text-help'>
                                No está prevista la cesión de datos a terceras entidades; no obstante, la utilización de tecnología de Google 
                                puede conllevar la realización de transferencias internacionales de datos de carácter personal.
                                Ud. podrá ejercitar los derechos de acceso, rectificación, oposición, supresión, limitación del tratamiento, 
                                portabilidad y de no ser objeto de decisiones individualizadas. Para ejercitar los derechos deberá presentar un 
                                escrito en la dirección postal o electrónica arriba señalada. Deberá especificar cuál de estos derechos solicita 
                                sea satisfecho y, a su vez, deberá acompañarse de la fotocopia del DNI o documento identificativo equivalente. 
                                En caso de que actuara mediante representante, legal o voluntario, deberá aportar también documento que acredite 
                                la representación y documento identificativo del mismo. El supuesto que considere que sus derechos no han sido 
                                debidamente atendidos, puede presentar una reclamación ante el Consejo de Transparencia y Protección de Datos
                                de Andalucía.
                                </p>
                                <a href={'https://www.ctpdandalucia.es/'}
                                target="_blank">
                                Consejo de Transparencia y Protección de Datos de Andalucía
                                </a>
                                <p></p>
                            </div>
                        </div>
                    )
                }

    }

    return(
        <Contenido />
    )

}

export default Info