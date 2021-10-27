import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { WeatherInfo } from "./components/charts/WeatherInfo";
import { LineComparisonChart } from "./components/charts/LineComparisonChart";
function App() {
  // State
  //const [apiData, setApiData] = React.useState({});
  const [time, setTime] = React.useState();
  const [getState, setGetState] = React.useState("kolkata");
  const [state, setState] = React.useState("pune");
  const [lat, setLat] = React.useState(18.51957);
  const [long, setLong] = React.useState(73.85535);

  const openWeatherForecast = require("./openWeatherForecast.json");
  const yrData = require("./yrJson.json");
  const apiData = require("./openWeather.json");
  //const [yrData, setYrData] = React.useState({});
  //const [openWeatherForecast, setOpenWeatherForecast]= React.useState({})

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  const yrApiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=${lat}&lon=${long}`;
  const openWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;

  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    const today = new Date();
    let tempServices = [];
    //  const interval = setInterval(() => {
    // fetch(apiUrl)
    //   .then((res) => res.json())
    //   .then((data) =>
    //   {
    //     setTime(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
    //     setApiData(data)
    //     setLat(data.coord.lat)
    //     setLong(data.coord.lon)
    //   });
    //   fetch(yrApiUrl)
    //   .then((response) => response.json())
    //   .then((items)=> setYrData(items));
    //   fetch(openWeatherForecastUrl)
    //   .then((openWeatherForecastResponse)=>openWeatherForecastResponse.json())
    //   .then((openForecast)=>{
    //     setOpenWeatherForecast(openForecast)
    //   })
    // },50000);
    // return () => clearInterval(interval);
    if (apiData && apiData.main) {
      tempServices.push({
        serviceName: "OpenWeather",
        temperature: kelvinToFarenheit(apiData.main.temp),
        humidity: apiData.main.humidity,
        windSpeed: apiData.wind.speed,
        precipitation: apiData.rain ? apiData.rain : "Not Available",
      });
    }
    if (
      yrData &&
      yrData.properties &&
      yrData.properties.timeseries &&
      yrData.properties.timeseries[0]
    ) {
      tempServices.push({
        serviceName: "Yr.No",
        temperature:
          yrData.properties.timeseries[0].data.instant.details.air_temperature,
        humidity:
          yrData.properties.timeseries[0].data.instant.details
            .relative_humidity,
        windSpeed:
          yrData.properties.timeseries[0].data.instant.details.wind_speed,
        precipitation: yrData.properties.timeseries[0].data.instant.details
          .precipitation_amount
          ? yrData.properties.timeseries[0].data.instant.details
              .precipitation_amount
          : "Not Available",
      });
    }
    setServices(tempServices);
  }, [
    apiUrl,
    apiData,
    yrApiUrl,
    yrData,
    time,
    openWeatherForecast,
    openWeatherForecastUrl,
  ]);

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
    <div style={{alignItems:"center" }}>
      <header style={{ flex: 1, alignItems: "center", textAlign: "center" }}>
        <h2>React Weather App</h2>
      </header>
      <div>
        <div style={{flex: 1, alignItems: "center", textAlign: "center"}} >
          <div style={{ margin: "2%" }}>
            <label>Enter Location :</label>
          </div>
          <div>
            <input
              type="text"
              id="location-name"
              style={{ width: "20%" }}
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button
            style={{ margin: "2%", width: "10%" }}
            onClick={submitHandler}
          >
            Search
          </button>
        </div>
        <div
          style={{
            flex: 1,
            flexDirection: "row",
            display: "flex",
            margin: "5%",
          }}
        >
          {services.map((data) => {
            return (
              <div style={{ flex: 1 }}>
                <h3>{data.serviceName}</h3>
                <WeatherInfo
                  temperature={data.temperature}
                  humidity={data.humidity}
                  windSpeed={data.windSpeed}
                  precipitation={data.precipitation}
                />
                <div style={{textAlign:"left"}}>
                  <p>
                    {"Last updated time"} <strong>{time}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <LineComparisonChart
            openWeatherForecast={openWeatherForecast}
            yrData={yrData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
