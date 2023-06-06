import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from 'react-query' 
import { getAnecdotes, updateAnecdote } from './requests'
import {useDisplayNotification} from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const displayNotification = useDisplayNotification()


  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    displayNotification(`you voted ${anecdote.content}`)
  }

  const { isLoading, isError, data } = useQuery('anecdotes', getAnecdotes, {
    retry: false
  })
  console.log(data)

  if ( isLoading ) {
    return <div>loading data...</div>
  }

  if ( isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
