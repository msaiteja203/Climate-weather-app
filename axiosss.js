import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherFinder = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWeather, setSelectedWeather] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {  
    const fetchSuggestions = async () => {
      if (city.length > 0) {
        try {
          const response = await axios.get(https://isonmock.hackerrank.com/api/weather?name=${city});
          setSuggestions(response.data.data.map(entry => entry.name));
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySelect = async (selectedCity) => {
    setCity(selectedCity);
    setSelectedCity(selectedCity);

    try {
      const response = await axios.get(https://isonmock.hackerrank.com/api/weather?name=${selectedCity});
      const weatherData = response.data.data.find(entry => entry.name === selectedCity);

      if (weatherData) {
        setSelectedWeather(weatherData.weather);
        setSelectedStatus(${weatherData.status.Wind}, ${weatherData.status.Humidity});
      }
    } catch (error) {
      console.error('Error fetching weather details:', error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
      </form>
      
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleCitySelect(city)}>{city}</li>
          ))}
        </ul>
      )}

      <div id="details">
        <span id="selectedCity">{selectedCity}</span><br />
        <span id="selectedWeather">{selectedWeather}</span><br />
        <span id="selectedStatus">{selectedStatus}</span>
      </div>
    </div>
  );
};

export default WeatherFinder;