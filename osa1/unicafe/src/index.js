import React, { useState } from 'react'
import ReactDOM from 'react-dom'
 
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// mark on positiivisia varten, koska siellä tarvitaan prosenttimerkkiä lopussa
const Statistic = ({text, value, mark}) => (
  <tr>
    <td>{text}</td>
    <td>{value} {mark}</td>
  </tr>
)

const Statistics = (props) => {
  // jos ei ole annettu arvioita, niin palautetaan vain ilmoitusteksti
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }
  else {
    return (
      <table>
        <Statistic text="hyvä" value={props.good}/>
        <Statistic text="neutraali" value={props.neutral}/>
        <Statistic text="huono" value={props.bad}/>
        <Statistic text="yhteensä" value={props.good + props.neutral + props.bad}/>
        <Statistic text="keskiarvo" value={(props.good * 1 + props.neutral * 0 + props.bad * -1) / (props.good + props.neutral + props.bad)}/>
        <Statistic text="positiivisia" value={props.good / (props.good + props.neutral + props.bad) * 100} mark="%"/>
      </table>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good + 1)}
  const handleNeutralClick = () => {setNeutral(neutral + 1)}
  const handleBadClick = () => {setBad(bad + 1)}  

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={handleGoodClick} text='hyvä' />
      <Button handleClick={handleNeutralClick} text='neutraali' />
      <Button handleClick={handleBadClick} text='huono' />
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
