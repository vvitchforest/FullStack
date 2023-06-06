import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  const notification = action.payload
  return notification
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationMessage = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context[1]
}

let timeoutID = null

export const useDisplayNotification = () => {
  const dispatch = useNotificationDispatch()
  
  const displayNotification = (message, time = 5000) => {
    dispatch({ payload: message })
    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch({ payload: ''})
    }, time)
  }
  return displayNotification
}

export default NotificationContext
