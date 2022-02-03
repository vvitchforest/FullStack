import React, { useState } from "react";
import CountryView from "./CountryView";

const Country = ({ name, country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <>
          <CountryView country={country} />
        </>
      ) : (
        <li style={{ listStyle: "none" }}>
          <span>{name}</span>{" "}
          <button onClick={() => setShow(true)}>show</button>
        </li>
      )}
    </div>
  );
};

export default Country;
