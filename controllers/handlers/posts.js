const posts = require("../../cloud/posts");

/** Get all posts */
const getPostsHandler = (req, res) => {
  res.send(posts);
};

/** get Post details */
const getPostHandler = (req, res) => {
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === id;
  })[0];

  if (!post) {
    return res.status(404).send(new Error("Post not found"));
  }

  return res.send(post);
};

/** create new post */
const addPostHandler = (req, res) => {
  const { title, body } = req.body; // no body parser required for this to work

  const id = posts.length + 1; // posts is imported from cloud/posts.js
  posts.push({ id, title, body });

  res.send("Post added");
};

/** update post */
const updatePostHandler = (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  const post = posts.filter((post) => {
    return post.id === id;
  })[0];

  if (!post) {
    return res.status(404).send(new Error("Post doesn't exist"));
  }

  post.title = title;
  post.body = body;

  return res.send("Post updated");
};

/** delete post */
const deletePostHandler = (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => {
    return post.id === id;
  });

  if (postIndex === -1) {
    return res.status(404).send(new Error("Post doesn't exist"));
  }

  posts.splice(postIndex, 1);

  return res.send("Post deleted");
};

module.exports = {
  getPostsHandler,
  getPostHandler,
  addPostHandler,
  updatePostHandler,
  deletePostHandler,
};
