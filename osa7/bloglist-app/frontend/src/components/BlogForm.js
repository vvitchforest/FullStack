import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from '../styles/Button.styled'
import { StyledForm } from '../styles/Form.styled'

const BlogForm = ({ blogFormRef }) => {
  let initialValues = {
    title: '',
    author: '',
    url: ''
  }

  const [newBlog, setNewBlog] = useState(initialValues)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value })
  }

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    setNewBlog(initialValues)
    navigate('/')
  }

  return (
    <div>
      <h2 style={{ marginTop: 0, paddingTop: 0 }}>create new</h2>
      <StyledForm ref={blogFormRef} onSubmit={addNewBlog}>
        <label htmlFor="blog-title">Title</label>
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={handleTitleChange}
          data-testid="input-title"
          id="blog-title"
        />

        <label htmlFor="blog-author">Author</label>
        <input
          type="text"
          value={newBlog.author}
          name="Password"
          onChange={handleAuthorChange}
          data-testid="input-author"
          id="blog-author"
        />

        <label htmlFor="blog-url">Url</label>
        <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={handleUrlChange}
          data-testid="input-url"
          id="blog-url"
        />

        <Button $primary $wide type="submit" style={{ marginBottom: '1rem' }}>
          add blog
        </Button>
      </StyledForm>
    </div>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.any.isRequired
}

export default BlogForm
