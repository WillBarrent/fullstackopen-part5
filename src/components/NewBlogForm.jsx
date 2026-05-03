const NewBlogForm = ({
  handleBlogAddition,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <form onSubmit={handleBlogAddition}>
      <div>
        <label>
          title{" "}
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
          author{" "}
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
          url{" "}
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
