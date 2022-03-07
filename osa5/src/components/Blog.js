import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShow = () => {
    setShow(!show)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const updated = { ...blog, likes: (blog.likes += 1) }
    console.log(updated)
    updateBlog(blog.id, updated)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`))
      deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <button onClick={toggleShow}>{show ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: show ? '' : 'none' }}>
        <a href="#">{blog.url}</a>
        <div>
          <span>{blog.likes} likes</span>
          <button onClick={handleUpdate}>like</button>
        </div>
        <span>{blog.author}</span>
        {user.username === blog.user.username && (
          <button
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
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
