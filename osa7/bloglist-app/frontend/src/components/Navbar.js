import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import styled from 'styled-components'
import { Button } from '../styles/Button.styled'

const StyledNavbar = styled.nav`
  background-color: #eceff1;
  width: 100%;
  padding: 0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 0;

    > .logged-user-container {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > span {
        padding-right: 0.5rem;
        padding-bottom: 0.5rem;
      }
    }
  }

  @media (min-width: 768px) {
    ul {
      > .logged-user-container {
        margin: 0 3rem;
        flex-direction: row;

        > span {
          padding-bottom: 0;
        }
      }
    }
  }
`

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #6200ea;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`

const StyledNavTitle = styled.h1`
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
  padding-left: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    padding-left: 2rem;
  }
`

const Navbar = () => {
  const loggedUser = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <StyledNavbar open={open}>
      <StyledNavTitle>Blog App</StyledNavTitle>
      <ul>
        <li>
          <StyledLink
            to="/"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #6200ea' : 'none'
            })}
          >
            Blogs
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to="/users"
            style={({ isActive }) => ({
              borderBottom: isActive ? '3px solid #6200ea' : 'none'
            })}
          >
            Users
          </StyledLink>
        </li>
        {loggedUser.token && (
          <li className="logged-user-container">
            <span>{loggedUser.name} logged in</span>
            <Button onClick={handleLogout}>logout</Button>
          </li>
        )}
      </ul>
    </StyledNavbar>
  )
}

export default Navbar
