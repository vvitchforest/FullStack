const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

describe('when there is initially some blogs saved', () => {
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

  test('identifying property is called id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map((r) => r.id)
    expect(ids).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  let token
  beforeEach(async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
    token = loginRes.body.token
  })

  test('a blog can be added when there is a valid token', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'asd',
      url: 'qwert',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('a blog cannot be added without a valid token', async () => {
    const newBlog = {
      title: 'this blog will not be added',
      author: 'asd',
      url: 'qwert',
      likes: 2
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).not.toContain('this blog will not be added')
  })

  test('if blogs has no likes, likes is set to 0', async () => {
    const newBlog = {
      title: 'no likes in this blog',
      author: 'Asd',
      url: 'https://reactpatterns.com/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blog = await Blog.findOne({ title: 'no likes in this blog' })
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('a blog with valid id can be deleted', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
    const token = loginRes.body.token

    const newBlog = {
      title: 'this blog will be deleted',
      author: 'asd',
      url: 'qwert',
      likes: 2
    }

    const toDelete = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(`/api/blogs/${toDelete.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).not.toContain(toDelete.title)
  })
})

describe('updating blog', () => {
  test('a blog with a valid id can be updated', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
    const token = loginRes.body.token

    const blogToUpdate = {
      title: 'this blog will be updated',
      author: 'asd',
      url: 'qwert',
      likes: 2
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToUpdate)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newContent = { ...blogToUpdate, likes: 20 }

    const updated = await api
      .put(`/api/blogs/${response.body.id}`)
      .send(newContent)
      .expect(200)

    expect(updated.body.likes).toBe(newContent.likes)
  })
})

describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'irina',
      name: 'Irina Asd',
      password: 'salakala'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code and message if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Too Short',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code and message if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hello',
      name: 'Too Short',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'password must be at least 3 characters'
    )
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
