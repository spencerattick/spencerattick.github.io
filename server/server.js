const express = require('express');
const app = express();
const { parse } = require('rss-to-json');
const path = require('path');

// [] see about not allowing * CORS requests

// Allow cross-origin requests from Vite
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Serve the files in the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/posts', async (req, res) => {
  try {
    const blogRss = await parse('https://medium.com/feed/@spencer.attick');
    res.json(blogRss.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/feed', async (req, res) => {
  try {
    const goodReadsRss = await parse('https://www.goodreads.com/user/updates_rss/104822881');
    res.json(goodReadsRss);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
