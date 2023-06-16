import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    deleteBlog(state, action) {
      const blogToDeleteId = action.payload
      return state.filter((blog) => blog.id !== blogToDeleteId)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      return state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
    },
    appendBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action) {
      const blogs = action.payload
      return blogs
    }
  }
})

export const { deleteBlog, updateBlog, appendBlog, setBlogs } =
  blogSlice.actions

//Action creators

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('blogs', blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const blogToUpdate = {
      ...blogObject,
      likes: blogObject.likes + 1
    }

    const updatedBlog = await blogService.update(blogToUpdate.id, blogToUpdate)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteById(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
