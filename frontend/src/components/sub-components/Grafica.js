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

    const [data, setData] = useState({
        labels:["1 nov", "2 nov", "3 nov", "4 nov", "5 nov"],
        datasets:[
            {
                label: "Riesgo",
                data: [21, 43, 32, 50, 70],
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
                max: 100
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