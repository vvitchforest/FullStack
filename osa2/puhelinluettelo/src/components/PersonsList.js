import React from "react";
import Person from "./Person";

const PersonsList = ({ persons, handleDelete}) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default PersonsList;
