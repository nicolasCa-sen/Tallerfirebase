import React, { useState } from "react";

function WeatherTable() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async (cityName) => {
    const apiKey = "6ce4a61c7e1b6ee21f39297344500d68";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.weather ? data.weather[0] : null);
    } catch (error) {
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) getWeather(city);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <table border="1">
          <thead>
            <tr>
              <th>Main</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.main}</td>
              <td>{weather.description}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeatherTable;