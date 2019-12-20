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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App