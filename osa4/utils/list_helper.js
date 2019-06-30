const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  else if (blogs.length > 0) {
    //console.log(blogs.map(item => item.likes))
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
    // change array to object
    var obj = blogs.reduce(function(acc, cur, i) {
      acc[i] = cur
      return acc
    }, {})
    //console.log(obj[0])
    // filter only some fields to resultset
    return (({ title, author, likes }) => ({ title, author, likes }))(obj[0])
  }
  else if (blogs.length > 1) {
    var maxLikes = Math.max.apply(Math, blogs.map(function(o) { return o.likes }))
    var filteredBlogs = blogs.filter(function(blog){
      return blog.likes === maxLikes
    })
    var arrToObj = filteredBlogs.reduce(function(acc, cur, i) {
      acc[i] = cur
      return acc
    }, {})
    //console.log(arrToObj[0])
    return (({ title, author, likes }) => ({ title, author, likes }))(arrToObj[0])
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}