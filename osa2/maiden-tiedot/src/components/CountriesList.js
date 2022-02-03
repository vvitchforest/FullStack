import React from "react";
import Country from "./Country"

const CountriesList = ({ countries }) => {
  return (
    <div>
      <ul>
        {countries.map((country) => (
          <Country
            key={country.name.common}
            name={country.name.common}
            country={country}
          />
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;