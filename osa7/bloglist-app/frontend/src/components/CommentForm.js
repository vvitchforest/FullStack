import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import styled from 'styled-components'
import { StyledForm } from '../styles/Form.styled'
import { Button } from '../styles/Button.styled'

const StyledCommentForm = styled(StyledForm)`
  flex-direction: row;
  width: 50%;
`

const CommentForm = ({ blog }) => {
  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    setNewComment(event.target.value)
  }

  const addNewComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, newComment))
  }

  return (
    <StyledCommentForm onSubmit={addNewComment}>
      <input
        type="text"
        placeholder="add new comment..."
        value={newComment}
        onChange={handleInputChange}
      />
      <Button type="submit">comment</Button>
    </StyledCommentForm>
  )
}

export default CommentForm
