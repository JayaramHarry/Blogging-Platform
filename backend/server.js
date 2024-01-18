const express = require('express');
const cors = require('cors');
const postsRouter = require('./server/posts');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS with specific options
const corsOptions = {
  origin: 'http://your-frontend-domain.com', // Replace with your actual front-end domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

 // Enable CORS for all routes
app.use(cors(corsOptions));

app.use(express.json());
app.use('/posts', postsRouter);




const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

app.use(errorHandler);

// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


