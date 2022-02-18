const { all } = require("express/lib/application");

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, 0) 
}

const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((allBlogs, blog) => {
    (blog.author in allBlogs) 
    ? allBlogs[blog.author]++
    : allBlogs[blog.author] = 1
    
  return allBlogs
  }, {})

  const mostAuthored = Object.keys(blogCounts).reduce((max, author) => blogCounts[max] > blogCounts[author] ? max : author)
  return {
    author: mostAuthored,
    blogs: blogCounts[mostAuthored]
  }
};


const mostLikes = (blogs) => {
  const groupedByAuthor = blogs.reduce((previous, current) => {
    let key = current.author
    !previous[key] && (previous[key] = [])
    previous[key].push(current)
    return previous
  }, {})

  let mostLikedAuthor = null

  for (const author in groupedByAuthor) {
    const authorBlogs = groupedByAuthor[author]
    const authorLikes = authorBlogs.reduce((sum, blog) => sum + blog.likes, 0)

    if(!mostLikedAuthor || authorLikes > mostLikedAuthor.likes) {
      mostLikedAuthor = {
        author: author,
        likes: authorLikes
      }
    }
  }
  console.log("most liked author is ", mostLikedAuthor, typeof(mostLikedAuthor))
  return mostLikedAuthor
}



module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}