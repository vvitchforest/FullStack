import React, { useState } from "react";


const Blog = ({ blog, updateBlog }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const handleUpdate = (event) => {
    event.preventDefault()
    const updated = {...blog, likes: blog.likes += 1}
    console.log(updated)
    updateBlog(blog.id, updated)
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <button onClick={toggleShow}>{show ? "hide" : "view"}</button>
      </div>
      <div style={{ display: show ? "" : "none"}}>
        <a href="#">{blog.url}</a>
        <div>
          <span>{blog.likes} likes</span>
          <button onClick={handleUpdate}>like</button>
        </div>
        <span>{blog.author}</span>
      </div>
    </div>
  );
};

export default Blog;
