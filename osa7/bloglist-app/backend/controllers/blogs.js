const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const tokenExtractor = require('../utils/middleware').tokenExtractor
const userExtractor = require('../utils/middleware').userExtractor

//GET all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//GET blog by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

//POST blog
blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    const blogWithUser = await savedBlog.populate('user', {
      username: 1,
      name: 1
    })
    response.status(201).json(blogWithUser)
  }
)
//POST comment
blogsRouter.post(
  '/:id/comments',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const comment = request.body.comment
    const commentedBlog = await Blog.findById(request.params.id).populate(
      'user',
      { username: 1, name: 1 }
    )

    commentedBlog.comments = commentedBlog.comments.concat(comment)
    const savedBlog = await commentedBlog.save()
    response.status(201).json(savedBlog)
  }
)

//DELETE blog
blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const userId = request.user.id
    const blogs = await Blog.findById(request.params.id)

    if (blogs.user.toString() === userId.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'deleting unauthorised' })
    }
  }
)

//PUT blog
blogsRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    }).populate('user', { username: 1, name: 1 })
    console.log('UPDATED', updatedBlog)
    response.json(updatedBlog)
  }
)

module.exports = blogsRouter
