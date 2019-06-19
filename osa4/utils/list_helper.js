const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  else if (blogs.length === 1) {
    console.log(blogs[0].likes)
    return blogs[0].likes
  }
  return 1
}

module.exports = {
  dummy,
  totalLikes
}