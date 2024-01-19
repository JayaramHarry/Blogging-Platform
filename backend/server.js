
const express = require('express');
const cors = require('cors');
const postsRouter = require('./server/posts');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS with specific options
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use((req, res, next) => {
  console.log('Request Origin:', req.get('origin'));
  next();
});
// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(express.json());
app.use('/posts', postsRouter);

// ... (error handling middleware)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
