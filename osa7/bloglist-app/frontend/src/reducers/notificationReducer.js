import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: null }
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

export const { setNotification } = notificationSlice.actions

export const displayNotification = (message, type, displayTime = 5) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer
