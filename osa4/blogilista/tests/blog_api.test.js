const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  /*test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'React patterns'
    )
  }) */

  test('identifying property is called id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined() 
  })
})

describe('addition of a new blog', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'asd',
      url: 'qwert',
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('if blogs has no likes, likes is set to 0', async () => {
    const newBlog = {
      title: 'no likes in this blog',
      author: 'Asd',
      url: 'https://reactpatterns.com/',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const blog = await Blog.findOne({title: 'no likes in this blog'})
    expect(blog.likes).toBe(0)
  })
  
  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Jokuvaan',
      url: 'https://reactpatterns.com/',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'No url in this blog',
      author: 'Jokuvaan',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('a blog with valid id can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating blog', () => {
  test('a blog with a valid id can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newContent = {...blogToUpdate, likes: 20}

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newContent)
      .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      expect(blogsAtEnd[0].likes).toBe(newContent.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})