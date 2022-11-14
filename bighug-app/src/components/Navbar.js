
import React, {useState, useEffect} from 'react'
import './css/general.css';
import './css/navbar.css';
import Settings from './sub-components/Settings'
import NavbarMain from './sub-components/NavbarMain';
import Back from './sub-components/Back';

//*TODO -- Configuración de Navbar --

const Navbar = (props) => {

    // --- FUNCIONES --- //
    function ConfigNavbar(){
        console.log(props.vista)
        const row = []
        if(props.vista === "iniciar-registrar"){
            row.push(
                <div key="main">
                    <NavbarMain />
                </div>
            )
        }

        //** Seleccion dependiendo de la vista actual
        if(props.vista === "dashboard"){
            row.push(
                <div key="dashboard">
                    <Settings tipo={"cuenta"} nombre={props.nombre} />
                </div>
            )
        }

        if(props.vista === "home"){
            row.push(
                <div key="home">
                    <Back vista = {"addusuario"} nombre = {props.nombre}/>
                </div>
            )
        }

        if(props.vista === "perfil"){
            row.push(
                <div key="perfil">
                    <Settings tipo={"usuario"} nombre = {"Cuenta de usuario"}/>
                    <Back vista={"perfilusuario"} nombre={props.nombre}/>
                </div>
            )
        }

        if(props.vista === "options"){
            row.push(
                <div key="options">
                    <Back vista = {"addredsocial"} nombre = {props.nombre}/>
                </div>
            )
        }

        return <div>{row}</div>
    }

    // --- HTML --- //
    if(props.vista === "dashboard"){      
        return (
            <nav className='navbar-der sticky-top navbar-expand-lg'>
                <ConfigNavbar />
            </nav>
        )
    }else if(props.vista === "home" || props.vista === "options"){
        return (
            <nav className='navbar-izq sticky-top navbar-expand-lg'>
                <ConfigNavbar />
            </nav>
        )
    }else if(props.vista === "iniciar-registrar"){
        return(
            <nav className='navbar-b sticky-top navbar-expand-lg'>
                <ConfigNavbar />
            </nav>
        )
    }else{
        return (
            <nav className='navbar sticky-top navbar-expand-lg'>
                <ConfigNavbar />
            </nav>
        )
    }

}

export default Navbar
