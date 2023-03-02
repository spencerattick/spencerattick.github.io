const { resolveNs } = require('dns');
const express = require('express');
const app = express();
const { parse } = require('rss-to-json');

// Allow cross-origin requests from Vite
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
  });

let blogRss;
let goodReadsRss;


(async () => {
  blogRss = await parse('https://medium.com/feed/@spencer.attick');
})();

(async () => {
  goodReadsRss = await parse('https://www.goodreads.com/user/updates_rss/104822881');

    console.log(goodReadsRss)
})();


// The middleware should be above your routes
app.get('/api/posts', (req, res) => {
  res.json(blogRss.items);
});

app.get('/api/feed', (req, res) => {
  res.json(goodReadsRss);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});