import React from 'react'

const Course = ({ courses }) => {

  // map reduce
  const exercise_parts = (i) => courses[i].parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = (i) => exercise_parts(i).reduce(reducer)

  // here we create html
  var html = []

  for (var i = 0; i < courses.length; i++) {
    var name = courses[i].name
    html.push(<h1 key={courses[i].id}>{name}</h1>)
    for (var j = 0; j < courses[i].parts.length; j++) {
      var part_name = courses[i].parts[j].name
      var part_exercises = courses[i].parts[j].exercises
      html.push(<p key={courses[i].parts[j].name}>{part_name} {part_exercises}</p>)
    }
    var points = total(i)
    html.push(<p key={points}>yhteensä {points} tehtävää</p>)
  }

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {html}
    </div>
  )
}


export default Course