import React, {useState} from "react";
import '../css/perfilusuario.css';
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';

ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale,
    PointElement, Filler
)

//*TODO -- Componente para crear gráficas --

const Grafica = (props) => {

    const colorPrimario = "rgba(98,155,240,1)"
    const colorPrimarioTras = "rgba(98,155,240,0.4)"
    const colorFondo = "rgba(240,248,255,1)"

    const scores = props.scores

    // Fechas
    var fechas = []
    for(const i in scores){
        fechas.push(scores[i].date)
    }

    // Scores
    var scores_ = []
    for(const i in scores){
        if(props.tipo === "ansiedad"){
            scores_.push(scores[i].score_1)
        }else if(props.tipo === "depresion"){
            scores_.push(scores[i].score_2)
        }else if(props.tipo === "tca"){
            scores_.push(scores[i].score_3)
        }else if(props.tipo === "ludopatia"){
            scores_.push(scores[i].score_4)
        }
    }

    const [data, setData] = useState({
        labels:fechas,
        datasets:[
            {
                label: "Riesgo",
                data: scores_,
                backgroundColor: colorFondo,
                borderColor: colorPrimarioTras,
                tension: 0.3,
                fill: true,
                pointBorderColor: colorPrimario,
            }
        ]
    })

    const options = {
        plugins: {
            responsive: true,
            legend:{
                display: false
            }
        },
        scales:{
            x: {
                grid:{
                    display: false
                }
            },
            y:{
                min: 0,
                max: 1
            }
        }
    }


    // -- HTML -- //
    return (
        <div>
            <Line data = {data} 
            options={options}
            className = 'grafico' />
        </div>
    )

}

export default Grafica