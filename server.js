const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      let contentType = 'text/html';
      if (filePath.endsWith('.js')) contentType = 'text/javascript';
      if (filePath.endsWith('.css')) contentType = 'text/css';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
