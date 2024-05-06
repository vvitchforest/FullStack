import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledTable = styled.table`
  th {
    text-align: left;
  }
  td {
    padding: 0.5rem 0.5rem 0.5rem 0;
    font-size: 1.25rem;
  }
`

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <section>
      <h2 style={{ marginTop: '2rem' }}>Users</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </section>
  )
}

export default Users
