const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
  // req.url carries the query string and hash (e.g. /style.css?v=2), which
  // broke path.extname/fs.readFile below -- extname returned ".css?v=2", the
  // mime lookup missed, and readFile 404'd on a path that doesn't exist.
  const urlPath = req.url.split('?')[0].split('#')[0];
  const safePath = path.normalize(urlPath === '/' ? '/index.html' : urlPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(__dirname, safePath);
  if (!filePath.startsWith(__dirname)) { res.writeHead(403); res.end('Forbidden'); return; }
  const ext = path.extname(filePath);
  const mime = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon', '.json': 'application/json'
  };
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
});
server.listen(3000, () => console.log('Coast website running at http://localhost:3000'));
