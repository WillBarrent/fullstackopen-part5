const Login = ({
  handleLogin,
  notification,
  username,
  setUsername,
  password,
  setPassword,
}) => {
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
};

export default Login;
