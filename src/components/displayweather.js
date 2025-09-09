import React from "react";
import "./displayweather.css";
const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  99: "Thunderstorm with hail"
};
function DisplayWeather({data}) {
 if (!data) {
    return <div>No weather data available.</div>;
  }
  
 return (
    <div className="displayweather">
      <div className="maincard">
        <span className="cardtitle">
          {data.name} Weather
        </span>
        <span className="cardsubtitle">
          As of {new Date().toLocaleTimeString()}
        </span>

        <h1>
          {data.temperature} <sup>°C</sup>
        </h1>
        <span className="weather-main">
          {weatherCodes[data.weathercode] || "Unknown"}
        </span>
      </div>
          
                 
               

           <div className="weatherdetails">
        <table>
          <tbody>
            <tr>
              <td>
                <h4>Temperature</h4>
              </td>
              <td>
                <span>{data.temperature} °C</span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Wind Speed</h4>
              </td>
              <td>
                <span>{data.windspeed} km/h</span>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Weather Code</h4>
              </td>
              <td>
                <span>{data.weathercode}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
          </div>
      
      
  );
}

export default DisplayWeather;