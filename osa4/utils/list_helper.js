const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  else if (blogs.length > 0) {
    console.log(blogs.map(item => item.likes))
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }

  return -1
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  else if (blogs.length === 1) {
    return blogs.map(item => item)
  }
  return -1
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}