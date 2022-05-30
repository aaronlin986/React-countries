import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const url = search == "" 
      ? "https://restcountries.com/v3.1/all" 
      : `https://restcountries.com/v3.1/name/${search}`;
      
    axios
      .get(url)
      .then(response => {
        setCountries(response.data);
    
        if(response.data.length === 1){
          const lat = response.data[0].latlng[0];
          const lon = response.data[0].latlng[1];
          fetchWeather(lat, lon);
        }
      });
  }, [search]);

  const fetchWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`;
    axios
      .get(url)
      .then(response => {
        setWeather(response.data);
    })
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleShowCountry = (country) => {
    setCountries([country]);
    fetchWeather(country.latlng[0], country.latlng[1]);
  };

  const generateResults = () => {
    if(countries.length === 1){
      const country = countries[0];

      return (
        <div>
          <h1>{country.name.common}</h1>
          <Country country={country}/>
          <h2>Weather in {country.capital[0]}</h2>
          <Weather weather={weather}/>
        </div>
      );
    }
    else if(countries.length <= 10){
      return (
        countries.map(c => 
          <p key={c.name.common}>
            {c.name.common} <button onClick={() => handleShowCountry(c)}>Show</button>
          </p>
        )
      );
    }
    else{
      return (
        "Too many results, specify filter"
      );
    }
  };

  return (
    <div>
      <p>Find countries <input value={search} onChange={handleSearchChange}/></p>
      {generateResults()}
    </div>
  );
}

export default App;
