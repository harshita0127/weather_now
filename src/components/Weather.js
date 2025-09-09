import React, { useState } from "react";
import DisplayWeather from "./displayweather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
   
  });

  
  
  async function weatherData(e) {
  e.preventDefault();

  if (form.city.trim() === "") {
    alert("Add values");
  } else {
    try {
      // 1. Get coordinates from Open-Meteo Geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(form.city)}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // 2. Get current weather from Open-Meteo Weather API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      // Save the weather data along with city info
      setWeather({
        data: {
          name: name,
          temperature: weatherData.current_weather.temperature,
          windspeed: weatherData.current_weather.windspeed,
          weathercode: weatherData.current_weather.weathercode,
        },
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data.");
    }
  }
}


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather Now</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
       
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;