import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user, handleLike }) => {
  const navigate = useNavigate();

  const blogStyle = {
    marginTop: 10,
    padding: 10,
    border: "solid",
    borderWidth: 1,
  };

  const handleDeletion = async (event) => {
    event.preventDefault();

    try {
      await blogService.remove(blog.id);
      const newBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(newBlogs);
      navigate("/");
    } catch (error) {
      console.log(error.reponse);
    }
  };

  if (!blog) {
    return <></>;
  }

  return (
    <div style={blogStyle} className="blog">
      <h1 className="title">{blog.title}</h1>
      <div>
        <div className="url">{blog.url}</div>
        <div>
          <span className="likes" data-testid="likes">
            {blog.likes}
          </span>
          {!user ? null : (
            <button
              className="like"
              onClick={(e) => {
                e.preventDefault();

                handleLike(blog);
              }}
            >
              like
            </button>
          )}
        </div>
        <div className="createdBy">Added by {blog.user.username}</div>
        {!user || blog.user.username !== user.username ? (
          <></>
        ) : (
          <button className="remove" onClick={handleDeletion}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
