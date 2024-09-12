import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const latitude = -6.2088;
    const longitude = 106.8456;

    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude,
            longitude,
            current_weather: true,
          }
        });
        console.log(response.data); // Debugging log
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err); // Debugging log
        setError(err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return (
    <div className="weather-widget loading">
      <div className="loading-message">Loading...</div>
    </div>
  );

  if (error) return <div className="weather-widget error">Error fetching weather data</div>;

  const temperature = weather.current_weather.temperature;
  const description = weather.current_weather.weathercode;
  const location = "Jakarta";

  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    // Tambahkan kode cuaca lainnya sesuai kebutuhan
  };

  const weatherDescription = weatherDescriptions[description] || "Unknown";

  return (
    <div className="weather-widget">
      <div id="weather-status">
        <i className="fas fa-sun"></i> {weatherDescription}, {temperature}°C
      </div>
      <div id="weather-location">{location}</div>
    </div>
  );
};

export default WeatherWidget;
