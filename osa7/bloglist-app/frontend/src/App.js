import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAllBlogs()
  }, [])

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

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObj)
      setBlogs(blogs.concat(blog))
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

  const updateBlog = async (id, blogObj) => {
    try {
      const returnedBlog = await blogService.update(id, blogObj)
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== returnedBlog.id ? blog : returnedBlog
      )
      setBlogs(updatedBlogs)
      console.log(updatedBlogs)
    } catch (exception) {
      dispatch(displayNotification('update failed', 'error'))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteById(id)
      const blogsAfter = blogs.filter((blog) => blog.id !== id)
      setBlogs(blogsAfter)
    } catch (exception) {
      dispatch(displayNotification('delete failed', 'error'))
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
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
