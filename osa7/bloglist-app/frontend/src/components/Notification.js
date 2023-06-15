import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })

  const success = {
    color: 'green',
    border: '1px solid green',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    margin: 5,
    padding: '5px 10px',
    fontSize: 20,
    width: '50%'
  }

  const error = {
    color: 'red',
    border: '1px solid red',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    margin: 5,
    padding: '5px 10px',
    fontSize: 20,
    width: '50%'
  }

  if (notification.message) {
    return (
      <div
        style={notification.type === 'success' ? success : error}
        className="notification"
      >
        {notification.message}
      </div>
    )
  } else {
    return null
  }
}

export default Notification
