import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const initialState = { token: null, username: null, name: null }

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setLogin(state, action) {
      const user = action.payload
      return user
    }
  }
})

export const { setLogin } = loginSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setLogin(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(displayNotification(`logged in as ${user.username}`, 'success'))
    } catch (exception) {
      if (exception.response.status === 401) {
        dispatch(displayNotification('wrong username or password', 'error'))
      }
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setLogin(initialState))
  }
}

export const authenticateUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setLogin(user))
  }
}

export default loginSlice.reducer
