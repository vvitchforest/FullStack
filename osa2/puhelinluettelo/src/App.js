import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons, persons.length, "persons");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterString.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target);
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.filter((person) => person.name === newName).length > 0) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson();
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setFilterString("");
        setNotificationMessage(` Added ${personObject.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`do you really want to delete ${name}?`)) {
      console.log(`remove ${id} from phone book`);
      const updatedPersons = persons.filter((item) => item.id !== id);
      personService.remove(id);
      setPersons(updatedPersons);
      setFilterString("");
      setNotificationMessage(`${name} deleted successfully`);
      setError(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const updatePerson = () => {
    const person = persons.find((p) => p.name === newName);
    const changedPerson = { ...person, number: newNumber };
    personService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.name !== returnedPerson.name ? person : returnedPerson
          )
        );

        setNewName("");
        setNewNumber("");
        setFilterString("");
        setNotificationMessage(`${person.name} updated sucessfully`);
        setError(false);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setNotificationMessage(`${person.name} already deleted from server`);
        setNewName("");
        setNewNumber("");
        setError(true);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.filter((p) => p.id !== person.id));
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterString(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} error={error}/>
      <Filter filter={filterString} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleAdd={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {filterString ? (
        <PersonsList persons={filteredPersons} handleDelete={deletePerson} />
      ) : (
        <PersonsList persons={persons} handleDelete={deletePerson} />
      )}
    </div>
  );
};

export default App;
