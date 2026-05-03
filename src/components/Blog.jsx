import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, username, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleDeletion = async (event) => {
    event.preventDefault();

    try {
      await blogService.remove(blog.id);
      const newBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error.reponse);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button className="visibilityBtn" onClick={toggleVisibility}>
        {visible ? "hide" : "show"}
      </button>
      <div className="hiddenContent" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button
            className="like"
            onClick={(e) => {
              e.preventDefault();

              handleLike(blog);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {blog.user.username !== username ? (
          <></>
        ) : (
          <button onClick={handleDeletion}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
