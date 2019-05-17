import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
        .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const Person = {
      name: newName,
      number: newNumber
    }
    

    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === Person.name) {
        setNewName('')
        setNewNumber('')
        alert(`${Person.name} on jo luettelossa`)
        return 
      }
    }

    personService
      .create(Person)
      .then(response => {
        setPersons(persons.concat(Person))
        setNewName('')
        setNewNumber('')

        setSuccessMessage(
          `Lisättiin ${Person.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const showPersons = () => {
    return (
      persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )
    )
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={successMessage}/>
      <div>
        rajaa näytettäviä <input value={newSearch} onChange={handleSearchChange}/>
      </div>
      <h3>lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          <div>
            nimi: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            numero: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
     {showPersons()}
      
    </div>
  )

}

export default App
