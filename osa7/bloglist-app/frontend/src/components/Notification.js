import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledNotification = styled.div`
  margin: 2rem 10vw;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  width: 50%;
  border-radius: 0.5rem;
`

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })

  const success = {
    backgroundColor: '#b9f6ca'
  }

  const error = {
    backgroundColor: '#ff8a80'
  }

  if (notification.message) {
    return (
      <StyledNotification
        style={notification.type === 'success' ? success : error}
        className="notification"
      >
        {notification.message}
      </StyledNotification>
    )
  } else {
    return null
  }
}

export default Notification
