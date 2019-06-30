const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Mike Johnson',
    url: 'http://www.eeddjjsdjsdsdmccxcc.com',
    likes: 34
  },
  {
    title: 'node is cool',
    author: 'Benjamin Williams',
    url: 'http://www.benjaminisadsdsaeeasasxssas.com',
    likes: 3
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('there are two notes in json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('HTML is easy')

})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Leo Leijona',
    url: 'http://www.leijoanassajassaossasass.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('returned object id is named id instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)
  ids.forEach(function(identifier) {
    console.log(identifier)
    expect(identifier).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})


