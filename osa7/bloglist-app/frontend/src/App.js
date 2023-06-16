import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = blogs.toSorted((a, b) => {
    return b.likes - a.likes
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
      dispatch(displayNotification(`logged in as ${user.username}`, 'success'))
    } catch (exception) {
      if (exception.response.status === 401) {
        dispatch(displayNotification('wrong username or password', 'error'))
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog))
      console.log(user)
      dispatch(
        displayNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        displayNotification(
          'title, author or url missing or incorrect',
          'error'
        )
      )
    }
  }

  return (
    <>
      <Notification />
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      ) : (
        <>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createNewBlog={addBlog} />
          </Togglable>
          <div>
            <h2>blogs</h2>
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
