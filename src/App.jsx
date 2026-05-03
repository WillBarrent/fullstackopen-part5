import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      setNotification("You have successfully logged in!");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification(error.response.data.error);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleBlogAddition = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const blog = await blogService.create(newBlog);
      setBlogs([...blogs, { ...blog, user: user }]);

      setTitle("");
      setAuthor("");
      setUrl("");

      blogFormRef.current.toggleVisibility();

      setNotification("Blog has been added!");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification(error.response.data.error);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  if (!user) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        {!notification ? <></> : <p>{notification}</p>}
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {!notification ? <></> : <p>{notification}</p>}
      <p>
        {user && user.username} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          handleBlogAddition={handleBlogAddition}
          author={author}
          setAuthor={setAuthor}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          username={user.username}
        />
      ))}
    </div>
  );
};

export default App;
