import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// painike-komponentti
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  // valitse tila satunnaisesti. Satunnaisluku määritellään kokonaisluvuksi
  // väliltä [0, length(props.anecdotes)-1]
  const [selected, setSelected] = useState(Math.floor(Math.random() * (props.anecdotes.length)))
  
  // tässä pidetään kirjaa pisteistä. Taulukon alustus on kopioitu netistä osoitteesta
  // https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781
  const [points, setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0));
  
  // maksimipisteet
  const [maxInd, setMaxInd] = useState(0)

  // asetetaan pisteet ja etsitaan eniten ääniä saaneen anekdootin indeksi
  const setToPoints = (index) => {
    // ensin pisteet
    const copy = { ...points }
    copy[index] += 1

    // copy on objekti, joten muutetaan se taulukoksi seuraavalla tavalla
    var arr = Object.keys(copy).map(function (i) {
      return copy[i];
    })

    // sitten etsitään indeksi
    if (arr === 0) {
      return -1
    }

    var max = arr[0]
    var maxIndex = 0
    
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i
          max = arr[i]
      }
    }

    // lopuksi päivitetään hookit
    setPoints(copy)
    setMaxInd(maxIndex) 

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={() => setToPoints(selected)} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * (props.anecdotes.length)))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxInd]}</p>
      <p>has {points[maxInd]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
