import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    }
  }
})

export const  { setNotification } = notificationSlice.actions 

export const displayNotification = (message, displayTime) => {
  return async dispatch => {
    dispatch(setNotification(message, displayTime))
    clearTimeout(timeoutId)
    
    timeoutId = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer