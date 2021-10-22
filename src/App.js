import React from "react"
//import logo from './logo.svg';
import './App.css';

function App() {
  // State
const [apiData, setApiData] = React.useState({});
const [getState, setGetState] = React.useState('tamilnadu');
const [state, setState] = React.useState('tamilnadu');

  // API KEY AND URL
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  
  React.useEffect(() => {
    const interval = setInterval(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
      console.log("apidata", apiData)
    },5000);
    return () => clearInterval(interval);
  }, [apiUrl,apiData]);

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

      <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
        {apiData && apiData.main ? (
          <div class="card-body text-center">
            <img
              src={`http://openweathermap.org/img/w/${apiData && apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />

            <p className="h2">
              {kelvinToFarenheit(apiData && apiData.main.temp)}&deg; C
            </p>

            <div className="row mt-4" >
              <div className="col-md-6 ">
                <p>
                  {' '}
                  <strong>{apiData && apiData.weather[0].main}</strong>
                </p>
                <p>
                  {'Humidity'}
                  {' '}
                  <strong>{apiData && apiData.main.humidity}</strong>
                </p>
                <p>
                  {'Wind speed'}
                  {' '}
                  <strong>{apiData && apiData.wind.speed}</strong>
                </p>
                <p>
                  {'Precipitation'}
                  {' '}
                  <strong>{apiData && apiData.rain ? apiData.rain : 'Not Available' }</strong>
                </p>
              </div>
            </div>
            <div>
            <p>
                  {'Last updated time'}
                  {' '}
                  <strong>now</strong>
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
