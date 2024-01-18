const express = require('express');
const cors = require('cors');
const postsRouter = require('./server/posts');

const app = express();
const PORT = process.env.PORT || 3001;

 // Enable CORS for all routes
app.use(cors());


app.use('/server/posts', postsRouter);

app.use(express.json());


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


