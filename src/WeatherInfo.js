import React from "react"
//import logo from './logo.svg';
import './App.css';

export const WeatherInfo = React.memo((props) => {

return (
<div class="card-body text-center">

{console.log("rednererr", props)}
{/* <img
  src={`http://openweathermap.org/img/w/${props.apiData && props.apiData.weather[0].icon}.png`}
  alt="weather status icon"
  className="weather-icon"
/> */}

<p className="h2">
  {props.temperature}&deg; C
</p>

<div className="row mt-4" >
  <div className="col-md-6 ">
    <p>
      {'Humidity'}
      {' '}
      <strong>{props.humidity}</strong>
    </p>
    <p>
      {'Wind speed'}
      {' '}
      <strong>{props.windSpeed}</strong>
    </p>
    <p>
      {'Precipitation'}
      {' '}
      <strong>{props.precipitation}</strong>
    </p>
  </div>
</div>
</div> );
});