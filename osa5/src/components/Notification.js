import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ alert }) => {
  const notificationStyle = {
    color:
      (alert.style === 'error' && 'red') ||
      (alert.style === 'success' && 'green'),
    backgroundColor: 'lightgrey',
    border:
      (alert.style === 'error' && '1px solid red') ||
      (alert.style === 'success' && '1px solid green'),
    borderRadius: 5,
    margin: 5,
    padding: '5px 10px',
    fontSize: 20,
    width: '50%',
  }

  if (alert.message === null) {
    return null
  }

  return <div style={notificationStyle} className='notification'>{alert.message}</div>
}

Notification.propTypes = {
  alert: PropTypes.object.isRequired
}

export default Notification
