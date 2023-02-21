const { resolveNs } = require('dns');
const express = require('express');
const app = express();
const { parse } = require('rss-to-json');

// Allow cross-origin requests from Vite
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
  });

let rss;


(async () => {
    rss = await parse('https://medium.com/feed/@spencer.attick');
})();


// The middleware should be above your routes
app.get('/api/posts', (req, res) => {
  res.json(rss.items);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});