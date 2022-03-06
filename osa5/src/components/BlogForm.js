import React, { useState } from "react";

const BlogForm = ({ createNewBlog }) => {

  let initialValues = {
    title: "",
    author: "",
    url: "",
  }

  const [newBlog, setNewBlog] = useState(initialValues);

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createNewBlog(newBlog);
    setNewBlog(initialValues)
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Password"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </>
  );
};

export default BlogForm;
