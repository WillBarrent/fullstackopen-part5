import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, username }) => {
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

  const handleLike = async (event) => {
    event.preventDefault();

    try {
      const result = await blogService.update(blog.id, {
        ...blog,
        user: blog.user.id,
        likes: ++blog.likes,
      });

      const newBlogs = blogs.map((blog) => {
        if (blog.id === result.id) {
          return {
            ...result,
            user: blog.user,
          };
        }

        return blog;
      });

      setBlogs(newBlogs);
    } catch (error) {
      console.log(error.response);
    }
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
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
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
