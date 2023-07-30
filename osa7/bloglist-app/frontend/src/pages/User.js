import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)

  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
