import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => {
    setShow(!show)
  }

  const handleLike = (event) => {
    event.preventDefault()
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(displayNotification('update failed', 'error'))
    }
  }

  const handleDelete = (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`))
        dispatch(removeBlog(blog.id))
    } catch (exception) {
      dispatch(displayNotification('delete failed', 'error'))
    }
  }

  return (
    <div style={blogStyle} className="blog-container">
      <div className="blog-info">
        <span>{blog.title}</span>
        <button onClick={toggleShow}>{show ? 'hide' : 'view'}</button>
        <div>{blog.author}</div>
      </div>
      {show && (
        <div className="blog-extended-info">
          <a href="#">{blog.url}</a>
          <div>
            <span>{blog.likes} likes</span>
            <button onClick={handleLike} className="like-btn">
              like
            </button>
          </div>
          {user.username === blog.user.username && (
            <button
              className="remove-btn"
              onClick={handleDelete}
              style={{
                backgroundColor: '#0275d8',
                border: '1px solid #0275d8',
                borderRadius: '2px',
                cursor: 'pointer',
                marginTop: '5px'
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
