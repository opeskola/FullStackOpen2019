import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    console.log(props)
    return (
      <p>{props.name} {props.exercise}</p>
    )
}


const Content = (props) => {
    return (
      <div>
        <Part name={props.parts[0].name} exercise={props.parts[0].exercises}/>
        <Part name={props.parts[1].name} exercise={props.parts[1].exercises}/>
        <Part name={props.parts[2].name} exercise={props.parts[2].exercises}/>
      </div>
    )
}

const Total = (props) => {
    return (
        <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
    )
}


const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
