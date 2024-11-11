import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

console.log(api_key); 


  // Обработчик для поля ввода
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  // Функция для запроса к API стран
  useEffect(() => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(filteredCountries);
        })
        .catch((error) => console.error('Ошибка при получении данных:', error));
    } else {
      setCountries([]);
    }
  }, [query]);

  // Обработчик для показа деталей страны
  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital);
  };

  // Функция для запроса погоды
  const fetchWeather = (capital) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => setWeather(response.data))
      .catch((error) => console.error('Error getting weather data ', error));
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={query}
        onChange={handleInputChange}
      />

      {countries.length > 10 && (
        <p>Too many matches, please specify your search further.</p>
      )}

      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            width="150"
          />

          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          )}
        </div>
      )}

      {countries.length === 1 && !selectedCountry && (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Population: {countries[0].population}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={countries[0].flags.png}
            alt={`Flag of ${countries[0].name.common}`}
            width="150"
          />
        </div>
      )}
    </div>
  );
};

export default App;
