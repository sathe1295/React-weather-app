import React from "react";

export const WeatherInfo = React.memo((props) => {
  return (
    <div style={{display:'flex', flexDirection:'row', alignItems:"center" }} >
      <div style={{flex:0.2, alignItems:"center"}}>
      <p >{props.temperature}&deg; C</p>
      </div>
      <div style={{flex: 1}}>
        <div>
          <p>
            {"Humidity"} <strong>{props.humidity}</strong>
          </p>
          <p>
            {"Wind speed"} <strong>{props.windSpeed}</strong>
          </p>
          <p>
            {"Precipitation"} <strong>{props.precipitation}</strong>
          </p>
        </div>
      </div>
    </div>
  );
});
