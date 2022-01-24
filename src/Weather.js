import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Weather() {

    var now=new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day=days[now.getDay()];




    const APIKEY="";
    const [data,setData]=useState({});
    const [city,setCity]=useState("");
    const getWeather=(city)=>{
        const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
        fetch(api_url)
        .then(res=>res.json())
        .then(result=>{
            setData(result);
            console.log(result);
        })
        .catch(error=>{
            alert("City Not Found")
        })
        
    }

    const handleSearch=(e)=>{
        e.preventDefault();
        getWeather(city);
       
        
    }


  return <div className="weather">
      <form onSubmit={handleSearch}>
        <h1>Weather App</h1>
        <div className="input-container">
        <SearchIcon/>
        <input type="text" className="" placeholder="Enter The City." value={city} onChange={e=>setCity(e.target.value)}/>
        
        </div>
        </form>
        {Object.keys(data).length >0 && 
            <div className="card">
                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}   alt="" className="weather_img" />
                <div className="tempo">
                    <h2>{Math.floor(data.main.temp)}°C</h2>
                    <p className="humid">Humidity:{data.main.humidity}%</p>
                    <p>Feels Like:{Math.floor(data.main.feels_like)}</p>
                </div>
                <div className="sys">
                    <h3>{data?.name}, {data?.sys.country}</h3>
                    <p className="day">{day}</p>
                    <p>{data.weather[0].description}</p>

                </div>
            </div>}
  </div>;
}

export default Weather;
