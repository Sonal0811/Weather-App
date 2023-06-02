import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCloudSun} from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
    
  const apiKey = "9ae7ed1b6118ced15f45e4a877a48b0c"
  const [inputCity,setInputCity] = useState("")
  const [data, setData] = useState({})

  const getweatherdata = (cityName) =>{
    if(!cityName) return
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=` + cityName + `&units=metric&appid=` + apiKey
    axios.get(apiURL).then((res)=> {
      console.log("response",res.data)
      setData(res.data)
      }).catch((err)=>{
      console.log("error",err)
    }
    ) 
  }
   const handlechangeinput = (e) =>{
   setInputCity(e.target.value)
   }

  const citySearch = () =>{
    getweatherdata(inputCity)
  }

  useEffect(()=>{
    getweatherdata("delhi")
  },[])
   
  const currentdate = new Date().toDateString();
  const currenttime = new Date().toLocaleTimeString();
  return (
    <div className="col-md-12">
      <div className="bg">
        <div className="logo1">
         <FontAwesomeIcon icon={faCloudSun}/>
        </div>
        <h2>
          <b>WEATHER APP</b>
        </h2>
        <div className="d-grid gap-3 col-3 mt-4">
        <input type="search" placeholder="Enter City Name" className="form-control" onChange={handlechangeinput}/>
        <button className="btn btn-primary" type="button"
        onClick={citySearch}
        >Search</button>
        </div>
      <div className="col-md-12 text-center mt-4">
       <div className="shadow rounded-3 weatherbox">
        <div className="col-md-12 mt-3">
        <i className="fa-solid fa-street-view icon-street"/> <b>{data?.name}</b>
        </div>
        <div className="col-md-12 text-center">
          <h6>{currentdate} | {currenttime}</h6>
        </div>
         <div className="temp">
         <h1> {data?.main?.temp}°C </h1>
         </div>
         <div className="min-max-temp">
         <h6>Min-temp: {data?.main?.temp_min}°C | Max-temp: {data?.main?.temp_max}°C </h6>
         </div>
       </div>
      </div>
      </div>
    </div>
  )
}

export default App;