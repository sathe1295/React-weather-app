import React from "react"
//import logo from './logo.svg';
import './App.css';
import {WeatherInfo} from "./WeatherInfo";

function App() {
  // State
const [apiData, setApiData] = React.useState({});
const [time, setTime]= React.useState()
const [getState, setGetState] = React.useState('pune');
const [state, setState] = React.useState('pune');
const [lat, setLat] = React.useState(18.51957)
const [long, setLong] = React.useState(73.85535)
const [yrData, setYrData] = React.useState({});
const [openWeatherForecast, setOpenWeatherForecast]= React.useState({})
  // API KEY AND URL
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
const yrApiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=${lat}&lon=${long}`
const openWeatherForecastUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`

React.useEffect(() => {
  const today = new Date()
  
    const interval = setInterval(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => 
      {
        setTime(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
        setApiData(data)
        setLat(data.coord.lat)
        setLong(data.coord.lon)
      });
      //console.log("apidata", apiData)
      fetch(yrApiUrl)
      .then((response) => response.json())
      .then((items)=> setYrData(items));
      fetch(openWeatherForecastUrl)
      .then((openWeatherForecastResponse)=>openWeatherForecastResponse.json())
      .then((openForecast)=>{
        setOpenWeatherForecast(openForecast)

      console.log("openForecast", openForecast)
      })
     console.log("yr data", yrData)
    },5000);
    return () => clearInterval(interval);
  }, [apiUrl,apiData, yrApiUrl, yrData, time, openWeatherForecast,openWeatherForecastUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };
  
  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };
return (
  <div className="App">
    <header className="d-flex justify-content-center align-items-center">
      <h2>React Weather App</h2>
    </header>
    <div className="container">
      <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
        <div class="col-auto">
          <label for="location-name" class="col-form-label">
            Enter Location :
          </label>
        </div>
        <div class="col-auto">
          <input
            type="text"
            id="location-name"
            class="form-control"
            onChange={inputHandler}
            value={getState}
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={submitHandler}>
          Search
        </button>
      </div>

      <div className=" d-flex flex-row card mt-3 mx-auto" style={{ width: '60vw' }}>
        {apiData && apiData.main ? (
          <div>
            <h3>openweathermap</h3>
         <WeatherInfo temperature={kelvinToFarenheit(apiData.main.temp)} humidity={apiData.main.humidity} windSpeed={apiData.wind.speed} precipitation={ apiData.rain ? apiData.rain : 'Not Available'}/>         

        <div>
          <p>
                {'Last updated time'}
                {' '}
                <strong>{time}</strong>
              </p>
          </div>
         </div>
        ) : (
          <h1>Loading</h1>
        )}
         {yrData && yrData.properties && yrData.properties.timeseries && yrData.properties.timeseries[0] ? (
            <div>
            <h3>yr.no</h3>
         <WeatherInfo temperature={yrData.properties.timeseries[0].data.instant.details.air_temperature} humidity={yrData.properties.timeseries[0].data.instant.details.relative_humidity} windSpeed={yrData.properties.timeseries[0].data.instant.details.wind_speed} precipitation={ yrData.properties.timeseries[0].data.instant.details.precipitation_amount ? yrData.properties.timeseries[0].data.instant.details.precipitation_amount : 'Not Available'}/>
        <div>
        <p>
              {'Last updated time'}
              {' '}
              <strong>{time}</strong>
            </p>
        </div>
         </div>      
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;
