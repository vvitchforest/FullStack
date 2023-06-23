import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { authenticateUser, logoutUser } from './reducers/loginReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.login)

  const sortedBlogs = blogs.toSorted((a, b) => {
    return b.likes - a.likes
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(authenticateUser(user))
      console.log(user)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <Notification />
      {!loggedUser.token ? (
        <LoginForm />
      ) : (
        <>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <div>
            <h2>blogs</h2>
            <div>
              {loggedUser.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
