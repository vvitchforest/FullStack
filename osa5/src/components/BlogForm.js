import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {

  let initialValues = {
    title: '',
    author: '',
    url: '',
  }

  const [newBlog, setNewBlog] = useState(initialValues)

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value })
  }

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog(newBlog)
    setNewBlog(initialValues)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={handleTitleChange}
            data-testid="input-title"
            id='blog-title'
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Password"
            onChange={handleAuthorChange}
            data-testid="input-author"
            id='blog-author'
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={handleUrlChange}
            data-testid="input-url"
            id='blog-url'
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm
