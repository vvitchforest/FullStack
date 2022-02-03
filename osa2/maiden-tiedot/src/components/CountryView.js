import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log("weather effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
      )
      .then((response) => {
        console.log("promise fulfilled");
        console.log(response.data);
        setWeather(response.data);
      });
  }, [country.capital]);

  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <br></br>
        <img src={country.flags.png} alt={country.name.common + "flag"} />
      </div>

      {weather && (
        <div>
          <h2>Weather in {weather.location.name}</h2>
          <p>
            {" "}
            <b>temperature: </b>{" "}
            {weather.current.temperature} Celcius
          </p>
          <img
            src={weather.current.weather_icons}
            alt={weather.current.weather_descriptions}
          />
          <p>
            {" "}
            <b>wind: </b> {weather.current.wind_speed}{" "}
            mph {weather.current.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryView;
