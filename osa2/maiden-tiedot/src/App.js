import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";
import CountryView from "./components/CountryView";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <Filter filterInput={filter} handleFilterChange={handleFilterChange} />
      {filter &&
        filteredCountries.length < 10 &&
        filteredCountries.length > 1 && (
          <CountriesList countries={filteredCountries} />
        )}
      {filter && filteredCountries.length === 1 && (
        <CountryView country={filteredCountries[0]} />
      )}
      {filter && filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
