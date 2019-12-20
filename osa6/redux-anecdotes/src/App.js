import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    const anecdoteToVote = anecdotes.find(n => n.id === id)
    const content = anecdoteToVote.content
    const votes = anecdoteToVote.votes
    return  {
      type: 'VOTE',
      data: {
        content: content,
        votes: votes,
        id: id
      }
    }
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        votes: 0,
        id: (100000 * Math.random()).toFixed(0)
      }
    })
    event.target.anecdote.value = ''
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.store.dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App