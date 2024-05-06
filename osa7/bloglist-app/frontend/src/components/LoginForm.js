import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import styled from 'styled-components'
import { StyledForm } from '../styles/Form.styled'
import { Button } from '../styles/Button.styled'

const StyledLoginForm = styled(StyledForm)`
  width: 25%;
  margin: auto;
`

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '2rem' }}>
        log in to Blog App
      </h2>
      <StyledLoginForm onSubmit={handleLogin} id="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
          placeholder="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
          placeholder="password"
        />
        <Button
          $primary
          id="login-btn"
          type="submit"
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          login
        </Button>
      </StyledLoginForm>
    </div>
  )
}

export default LoginForm
