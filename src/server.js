const express = require('express');
const app = express();

const cors = require('cors');

const PORT = 3001;

 // Enable CORS for all routes
app.use(cors());

const postsRouter = require('./server/posts');
app.use('/posts', postsRouter);

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
