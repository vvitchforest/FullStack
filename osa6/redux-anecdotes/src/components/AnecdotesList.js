import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(displayNotification(`you voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotesList
