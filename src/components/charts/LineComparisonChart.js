import React from "react";
import { LineChart, Line, YAxis, XAxis, Legend } from "recharts";
import * as moment from "moment";
export const LineComparisonChart = React.memo((props) => {
  const [forecastData, setForecastData] = React.useState([]);

  React.useEffect(() => {
    createForecastData();
  }, []);

  const createForecastData = () => {
    let tempForecastData = [];
    if (props.openWeatherForecast && props.openWeatherForecast.daily) {
      props.openWeatherForecast.daily.map((data) => {
        let forecastItem = {
          dt: new Date(),
          openWeather: 0,
          yrNo: 0,
        };
        forecastItem.openWeather = data.temp.day;
        forecastItem.dt = moment.unix(data.dt).format("DD/MM");
        tempForecastData.push(forecastItem);
      });
    }
    if (
      props.yrData &&
      props.yrData.properties &&
      props.yrData.properties.timeseries
    ) {
      props.yrData.properties.timeseries.map((yrData) => {
        tempForecastData.map((forecast) => {
          if (
            forecast.dt === moment(yrData.time).format("DD/MM") &&
            forecast.yrNo === 0
          ) {
            forecast.yrNo = yrData.data.instant.details.air_temperature;
          }
        });
      });
    }

    console.log("forecast", tempForecastData);
    setForecastData(tempForecastData);
  };

  console.log("props.data", props.data);
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <LineChart width={1500} height={400} data={forecastData}>
          <XAxis dataKey={"dt"} interval={0} />
          <YAxis
            label={{ value: "Temperature", angle: -90, position: "insideLeft" }}
          />
          <Line type="monotone" dataKey="openWeather" stroke="#8884d8" />
          <Line type="monotone" dataKey="yrNo" stroke="red" />
          <Legend layout="horizontal" verticalAlign="top" align="center" />
        </LineChart>
      </div>
    </div>
  );
});
