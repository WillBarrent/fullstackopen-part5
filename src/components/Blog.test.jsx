import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

const blog = {
  author: "Will",
  id: "0",
  likes: 21,
  title: "Hi Hello",
  url: "example3.com",
  user: {
    username: "Test",
    name: "Test",
    id: "0",
  },
};

test("component displays title and author", () => {
  const { container } = render(<Blog blog={blog} />);

  const mainContent = container.querySelector(".blog");
  const hiddenContent = container.querySelector(".hiddenContent");

  expect(mainContent).toBeVisible();
  expect(hiddenContent).not.toBeVisible();
});

test("clicking show displays hidden content (url, username, likes)", async () => {
  const { container } = render(<Blog blog={blog} />);

  const mainContent = container.querySelector(".blog");
  const hiddenContent = container.querySelector(".hiddenContent");

  expect(mainContent).toBeVisible();
  expect(hiddenContent).not.toBeVisible();

  const user = userEvent.setup();
  const button = container.querySelector(".visibilityBtn");
  await user.click(button);

  expect(mainContent).toBeVisible();
  expect(hiddenContent).toBeVisible();
});

test("like button works as expected", async () => {
  const mockHandler = vi.fn();

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>);

  const likeButton = container.querySelector(".like");

  const user = userEvent.setup();
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

