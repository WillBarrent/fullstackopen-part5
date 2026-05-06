import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlogForm = ({ handleBlogAddition, notification, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  if (!user) {
    return navigate("/");
  }

  const addBlog = (event) => {
    event.preventDefault();

    handleBlogAddition({ title, author, url });
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      {!notification ? <></> : <p>{notification}</p>}
      <div>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;
