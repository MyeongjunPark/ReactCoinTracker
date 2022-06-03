import { useQuery } from "react-query";
import { fetchCoinHistory } from "./Api";
import {Outlet, useOutletContext} from 'react-router-dom'
import ApexChart from 'react-apexcharts'

interface IHistorical{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps{
    coinId:string;
}

function Chart({coinId}:ChartProps){
    const {isLoading, data}=useQuery<IHistorical[]>(['ohlcv', coinId], 
    ()=> 
    fetchCoinHistory(coinId),
    {
        refetchInterval:5000,
    }
    )

    return <div> {isLoading? "Loading chart..." : <ApexChart 
    type="line" 
    series={[
        {
            name:"price",
            data: data?.map(price=>price.close) as number[],
        },
    ]}
    options={{
        theme:{
            mode:"dark"
        },
        chart:{
        height: 300,
        width: 500,
        toolbar:{
            show:false,
        },
        background:"transparent"
    },
    stroke:{
        curve:"smooth",
        width: 5,
    },
    grid:{show:false},
    yaxis:{show:false},
    xaxis:{
        labels:{show:false},
        axisTicks:{show:false},
        axisBorder:{show:false},
        type:"datetime",
        categories:data?.map(price=>price.time_close) as string[]
    },
    fill:{
        type:"gradient", gradient:{gradientToColors:["#4cd137"],stops:[0, 100]}
    },
    colors:['#00a8ff'],
    tooltip:{
        y: {
            formatter:(value)=>`$ ${value.toFixed(3)}`
        }
    }
}}/>}</div>
    
}

export default Chart;