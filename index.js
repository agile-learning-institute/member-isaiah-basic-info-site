const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = './index.html';

  if (req.url === '/about') {
    filePath = './about.html';
  } else if (req.url === '/contact') {
    filePath = './contact.html';
  } else if (req.url !== '/' && req.url !== '/about' && req.url !== '/contact') {
    filePath = './404.html';
  }

  fs.readFile(path.resolve(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      res.writeHead(filePath === './404.html' ? 404 : 200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
