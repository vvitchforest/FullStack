import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledList = styled.ul`
  padding-left: 0;
  li {
    list-style: none;
    padding: 1rem 1rem 1rem 0;
    border-bottom: 1px solid lightgrey;
    font-size: 1.25rem;
  }
`

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = blogs.toSorted((a, b) => {
    return b.likes - a.likes
  })

  return (
    <section>
      <h2 style={{ marginTop: '2rem' }}>Blogs</h2>
      <StyledList>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </StyledList>
    </section>
  )
}

export default Blogs
