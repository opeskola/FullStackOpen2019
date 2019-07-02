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

test('returned object id is named id instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)
  ids.forEach(function(identifier) {
    console.log(identifier)
    expect(identifier).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
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

test('if likes value is not given, its value will be 0', async () => {
  var N = 0   // number of likes before post
  var N_post = 0 // number of likes after post

  const newBlog = {
    title: 'about post queries',
    author: 'Urho Uljas',
    url: 'http://www.leijoanassajesesdddfdssdasasas.com',
  }

  const response = await api.get('/api/blogs')
  const zeroLikes = response.body.map(r => r.likes)  // likes vector before post

  zeroLikes.forEach(function(l) {
    if (l === 0) {
      N = N + 1
    }
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const resAfterPost = await api.get('/api/blogs')
  const zeroLikesAfterPost = resAfterPost.body.map(r => r.likes)  // likes vector after post

  zeroLikesAfterPost.forEach(function(lap) {
    if (lap === 0) {
      N_post = N_post + 1
    }
  })

  expect(resAfterPost.body.length).toBe(initialBlogs.length + 1)
  expect(N_post).toBe(N + 1)

})

test('if new blog does not contain title and url, status code 400 bad request is returned', async () => {
  const newBlogWithoutTitle = {
    author: 'Urho Uljas',
    url: 'http://www.leijoanassajesesdddfdssdasasas.com',
    likes: 3
  }

  const newBlogWithoutUrl = {
    title: 'Mongoose validation is easy',
    author: 'Urho Uljas',
    likes: 6
  }

  const newBlogWithoutTitleAndUrl = {
    author: 'Urho Uljas',
    likes: 2
  }

  const newBlogWithoutTitleAndUrlAndLikes = {
    author: 'Urho Uljas'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleAndUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleAndUrlAndLikes)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})