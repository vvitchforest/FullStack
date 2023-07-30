import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './pages/Blogs'
import Users from './pages/Users'
import User from './pages/User'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { authenticateUser } from './reducers/loginReducer'
import { Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.login)
  const authenticated = loggedUser.token !== null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(authenticateUser(user))
    }
  }, [])

  useEffect(() => {
    if (authenticated) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, authenticated])

  return (
    <>
      <Navbar />
      <Notification />
      {!authenticated ? (
        <LoginForm />
      ) : (
        <>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <div>
            <h2>Blog app</h2>
            <Routes>
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/users" element={<Users />} />
              <Route path="/" element={<Blogs />} />
            </Routes>
          </div>
        </>
      )}
    </>
  )
}

export default App
