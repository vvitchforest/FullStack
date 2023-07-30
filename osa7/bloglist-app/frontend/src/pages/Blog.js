import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import CommentForm from '../components/CommentForm'

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
    <div className="blog-container">
      <h2>{blog.title}</h2>
      <a href="#">{blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={handleLike} className="like-btn">
          like
        </button>
      </div>
      <p>Added by {blog.author}</p>

      {loggedUser.username === blog.user.username && (
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
      <h3>Comments</h3>
      <CommentForm blog={blog} />
      {blog.comments.length ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>this blog has no comments</p>
      )}
    </div>
  )
}

export default Blog
