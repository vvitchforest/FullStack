import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import styled from 'styled-components'
import { Button } from '../styles/Button.styled'

const StyledArticle = styled.article`
  a {
    font-size: 1.25rem;
  }

  .like-btn {
    margin-left: 0.5rem;
  }
`

const RemoveButton = styled(Button)`
  border: 1px solid #f50057;
  color: #f50057;
  margin-left: 1rem;

  &:hover {
    color: white;
    background: #f50057;
  }
`
const CommentList = styled.ul`
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    padding: 0.5rem;
  }
`
const Blog = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.login)

  const match = useMatch('/blogs/:id')

  const blogs = useSelector((state) => state.blogs)

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`))
      dispatch(removeBlog(blog.id))
    navigate('/')
  }

  return (
    <StyledArticle className="blog-container">
      <h2 style={{ marginTop: '2rem' }}>{blog.title}</h2>
      <a href="#">{blog.url}</a>
      <div style={{ marginTop: '1rem' }}>
        <span>{blog.likes} likes</span>
        <Button onClick={handleLike} className="like-btn">
          like
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Added by {blog.author}</p>
        {loggedUser.username === blog.user.username && (
          <RemoveButton className="remove-btn" onClick={handleDelete}>
            remove blog
          </RemoveButton>
        )}
      </div>
      <h3 style={{ borderTop: '1px solid lightgrey', paddingTop: '1rem' }}>
        Comments
      </h3>
      {blog.comments.length ? (
        <CommentList>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </CommentList>
      ) : (
        <p>this blog has no comments</p>
      )}
      <CommentForm blog={blog} />
    </StyledArticle>
  )
}

export default Blog
