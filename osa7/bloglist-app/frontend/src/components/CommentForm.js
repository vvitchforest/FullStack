import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

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
    <form onSubmit={addNewComment}>
      <input type="text" value={newComment} onChange={handleInputChange} />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
