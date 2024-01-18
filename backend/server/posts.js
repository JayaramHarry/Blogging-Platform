
const express = require('express');
const router = express.Router();

// Sample in-memory data store
let posts = [
  { id: 1, title: 'Sample Blog', content: 'This is the sample of the blog posts. User can create new blogs using "New blog" button above this blog, and user can update and delete blogs using option in the blog' },
];

router.use(express.json());

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET a specific post
router.get('/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = posts.find(post => post.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// POST a new post
router.post('/', (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      createdAt: new Date(), // Add the createdAt property with the current date and time
    };
    
    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update a post
router.put('/:postId', (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const { title, content } = req.body;

    console.log('Received PUT request:', req.body);

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const index = posts.findIndex(post => post.id === postId);
    if (index === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    posts[index] = { ...posts[index], title, content };
    console.log('Updated post:', posts[index]);

    res.json(posts[index]);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a post
router.delete('/:postId', (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const index = posts.findIndex(post => post.id === postId);

    if (index === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const deletedPost = posts.splice(index, 1)[0];
    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
