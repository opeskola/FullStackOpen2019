import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'

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

      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App