import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const Navbar = () => {
  const loggedUser = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const navbarStyle = {
    listStyle: 'none',
    backgroundColor: 'lightgrey',
    marginTop: 0,
    padding: '5px 0px'
  }

  const linkStyle = {
    display: 'inline',
    padding: 5
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  console.log('loggedUser', loggedUser)

  return (
    <nav>
      <ul style={navbarStyle}>
        <li style={linkStyle}>
          <Link to="/">Blogs</Link>
        </li>
        <li style={linkStyle}>
          <Link to="/users">Users</Link>
        </li>
        {loggedUser.token && (
          <li style={linkStyle}>
            {loggedUser.name} logged in
            <button onClick={handleLogout}>logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
