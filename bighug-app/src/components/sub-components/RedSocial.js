import React from 'react'
import Grafica from './Grafica';
import '../css/perfilusuario.css';
import Settings from './Settings';
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
import desplegable1 from '../images/desplegable1.png'
import desplegable2 from '../images/desplegable2.png'
import grafico from '../images/graficoplaceholder.png'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

//*TODO -- Apartado red social utilizado en MiCuenta --

const RedSocial = (props) => {

    const [imagenredsocial, setImagenredsocial] = useState(null);
    const [textoredsocial, setTextoredsocial] = useState(null);
    const [imagendesplegable1, setImagendesplegable1] = useState(desplegable1);
    const [imagendesplegable2, setImagendesplegable2] = useState(desplegable1);
    const [imagendesplegable3, setImagendesplegable3] = useState(desplegable1);
    const [imagendesplegable4, setImagendesplegable4] = useState(desplegable1);
    const [estadoDesplegable1, setEstadoDesplegable1] = useState("none");
    const [estadoDesplegable2, setEstadoDesplegable2] = useState("none");
    const [estadoDesplegable3, setEstadoDesplegable3] = useState("none");
    const [estadoDesplegable4, setEstadoDesplegable4] = useState("none");
    const [activo1, setActivo1] = useState(false);
    const [activo2, setActivo2] = useState(false);
    const [activo3, setActivo3] = useState(false);
    const [activo4, setActivo4] = useState(false);

    const navigate = useNavigate();

    const colores = ["#29ff3d", "#61f509", "#80ea00", "#97df00", "#aad400",
                        "#bac800", "#c9bc00", "#d5af00", "#e0a200", "#e99400",
                        "#f18500", "#f77500", "#fb6500", "#fe5300", "#ff3f10",
                        "#ff2525"]

    useEffect(() => {
        if(props.name === "twitter"){
            setTextoredsocial("Twitter")
            setImagenredsocial(twitter)
        }
        
        if(props.name === "instagram"){
            setTextoredsocial("Instagram")
            setImagenredsocial(instagram)
        }

    }, []);

    function desplegable_action(id){

        console.log(localStorage.getItem("emailsupervisor"))

        setImagendesplegable1(desplegable1)
        if(activo1){
            setEstadoDesplegable1("none")
        }
        setImagendesplegable2(desplegable1)
        if(activo2){
            setEstadoDesplegable2("none")
        }
        setImagendesplegable3(desplegable1)
        if(activo3){
            setEstadoDesplegable3("none")
        }
        setImagendesplegable4(desplegable1)
        if(activo4){
            setEstadoDesplegable4("none")
        }

        if(id === "1"){
            if(imagendesplegable1 ===  desplegable1){
                setActivo1(true)
                setImagendesplegable1(desplegable2)
                setEstadoDesplegable1(true)
            }else{
                setActivo1(false)
                setImagendesplegable1(desplegable1)
                setEstadoDesplegable1("none")
            }
        }
        if(id === "2"){
            if(imagendesplegable2 ===  desplegable1){
                setActivo2(true)
                setImagendesplegable2(desplegable2)
                setEstadoDesplegable2(true)
            }else{
                setActivo2(false)
                setImagendesplegable2(desplegable1)
                setEstadoDesplegable2("none")
            }
        }
        if(id === "3"){
            if(imagendesplegable3 ===  desplegable1){
                setActivo3(true)
                setImagendesplegable3(desplegable2)
                setEstadoDesplegable3(true)
            }else{
                setActivo3(false)
                setImagendesplegable3(desplegable1)
                setEstadoDesplegable3("none")
            }
        }
        if(id === "4"){
            if(imagendesplegable4 ===  desplegable1){
                setActivo4(true)
                setImagendesplegable4(desplegable2)
                setEstadoDesplegable4(true)
            }else{
                setActivo4(false)
                setImagendesplegable4(desplegable1)
                setEstadoDesplegable4("none")
            }
        }
    }

    function redirect(id_desplegable){
        if(id_desplegable === "ansiedad"){
            localStorage.setItem("infored", "ansiedad");
        }
        if(id_desplegable === "depresion"){
            localStorage.setItem("infored", "depresion");
        }
        if(id_desplegable === "tca"){
            localStorage.setItem("infored", "tca");
        }
        if(id_desplegable === "ludopatia"){
            localStorage.setItem("infored", "ludopatia");
        }
        navigate('/info')
    }

    //** -- Desplegable --
    function Desplegable(props){

        return(
            <div style={{display : props.estado}}>
                <div key={"desplegable"} className='container-desplegable'>
                    <Grafica />
                </div>
                <div className='text-desplegable-div'>
                    <span className='text-desplegable'>Si necesita ayuda pulse&nbsp;</span>
                    <span className='text-desplegable-href' onClick={() => redirect(props.desplegable)}>aquí</span>
                </div>
            </div>
        )

    }

    //** -- Componente barra --
    function Bar(props){

        /**
        *? Hay 16 colores, 16 estados en una barra de 100% 100/16 = 6.25
        *? Accedemos a la biblioteca de colores con este resultado 
        */
        var res = props.score / 6.25
        res = Math.trunc(res)

        var color_ = colores[res-1]

        //** -- Porcentaje de la barra de color --
        var puntos = props.score
        puntos = puntos + "%"

        //** -- Texto --
        var text = ""
        if(props.score <= 20){
            text = "riesgo muy bajo"
        }else if(props.score > 20 && props.score <= 40){
            text = "riesgo bajo"
        }else if(props.score > 40 && props.score <= 60){
            text = "riesgo moderado"
        }else if(props.score > 60 && props.score <= 80){
            text = "riesgo alto"
        }else{
            text = "riesgo muy alto"
        }

        const row = []

        row.push(
            <div className="col-9 col-padding" key={props.id}>
                <span className='text-bar'>{props.nombre}</span>
                <span className='text-bar' style={{color:color_}}>{text}</span>
                <div className='container-bar'>
                    <div className='bar-color' style={{width: puntos, backgroundColor: color_ }} ><br></br></div>
                </div>
            </div>
        )

        if(props.id === "1"){
            row.push(
                <div className="col-3 div-info" key={props.id + "1"}>
                    <img className='img-info' src={imagendesplegable1} onClick={() => desplegable_action("1")}></img>
                </div>
            )
        }

        if(props.id === "2"){
            row.push(
                <div className="col-3 div-info" key={props.id + "2"}>
                    <img className='img-info' src={imagendesplegable2} onClick={() => desplegable_action("2")}></img>
                </div>
            )
        }

        if(props.id === "3"){
            row.push(
                <div className="col-3 div-info" key={props.id + "3"}>
                    <img className='img-info' src={imagendesplegable3} onClick={() => desplegable_action("3")}></img>
                </div>
            )
        }

        if(props.id === "4"){
            row.push(
                <div className="col-3 div-info" key={props.id + "4"}>
                    <img className='img-info' src={imagendesplegable4} onClick={() => desplegable_action("4")}></img>
                </div>
            )
        }

        return <div className='d-flex justify-content-center'>{row}</div>

    }

    // --- HTML --- //
    if(props.tipo === "resumen"){
        return(
            <div className='container'>
                <div className='inline'>
                    <h5 className='text-email-2'>Resumen</h5>
                </div>
                <hr className='linea-color'></hr>
                
                <Bar id={"1"} nombre={"Ansiedad: "} score={"50"}/>
                <Desplegable desplegable={"ansiedad"} estado={estadoDesplegable1}/>
                <Bar id={"2"} nombre={"Depresión: "} score={"43"}/>
                <Desplegable desplegable={"depresion"} estado={estadoDesplegable2}/>
                <Bar id={"3"} nombre={"TCA: "} score={"72"}/>
                <Desplegable desplegable={"tca"} estado={estadoDesplegable3}/>
                <Bar id={"4"} nombre={"Ludopatía: "} score={"12"}/>
                <Desplegable desplegable={"ludopatia"} estado={estadoDesplegable4}/>
                
                <div className='py-4'></div>
            </div>
        )
    }else{
        //*! Para añadir scores de la BBDD
        //*! <Bar nombre={"Trastorno 3"} score={props.score1}/>

        return (
            <div className='container'>
                <div className='inline'>
                    <img className='img-red' src={imagenredsocial}></img>
                    <h5 className='text-email'>{textoredsocial}</h5>
                    <a className='setting-padding'><Settings tipo={"redsocial"} idred={props.idred} nombre={props.name}/></a>
                </div>
                <hr className='linea-color'></hr>
                
                <Bar id={"1"} nombre={"Ansiedad: "} score={"71"}/>
                <Desplegable desplegable={"ansiedad"} estado={estadoDesplegable1}/>
                <Bar id={"2"} nombre={"Depresión: "} score={"91"}/>
                <Desplegable desplegable={"depresion"} estado={estadoDesplegable2}/>
                <Bar id={"3"} nombre={"TCA: "} score={"12"}/>
                <Desplegable desplegable={"tca"} estado={estadoDesplegable3}/>
                <Bar id={"4"} nombre={"Ludopatía: "} score={"37"}/>
                <Desplegable desplegable={"ludopatia"} estado={estadoDesplegable4}/>
                
                <div className='py-4'></div>
            </div>
        )
    }

    /*
    ? PLACEHOLDER PARA VER LAS BARRAS
    return (
        <div className='container'>
            <div className='inline'>
                <img className='img-red' src={imagenredsocial}></img>
                <h5 className='text-email'>EMAIL</h5>
                <a className='setting-padding'><Settings tipo={"redsocial"} idred={props.idred} nombre={props.name}/></a>
            </div>
            <hr className='linea-color'></hr>

            
            <Bar nombre={"Trastorno 1"} score={"11"}/>
            <Bar nombre={"Trastorno 2"} score={"21"}/>
            <Bar nombre={"Trastorno 3"} score={"31"}/>
            <Bar nombre={" Trastorno 4"} score={"42"}/>
            <Bar nombre={"Trastorno 1"} score={"53"}/>
            <Bar nombre={"Trastorno 2"} score={"61"}/>
            <Bar nombre={"Trastorno 3"} score={"72"}/>
            <Bar nombre={" Trastorno 4"} score={"83"}/>
            <Bar nombre={"Trastorno 3"} score={"91"}/>
            <Bar nombre={" Trastorno 4"} score={"100"}/>
            

            <div className='py-4'></div>
        </div>
    )*/
}

export default RedSocial