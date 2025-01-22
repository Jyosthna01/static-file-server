const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const publicFolder = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  let filePath = path.join(publicFolder, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);

  
  let contentType = 'text/html';
  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
    case '.jpeg':
    case '.png':
      contentType = 'image/' + ext.slice(1);
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


const express = require('express');
const app = express();
const PORT_EXPRESS = 3001;


app.use(express.static(publicFolder));


app.get('/', (req, res) => {
  res.sendFile(path.join(publicFolder, 'index.html'));
});

app.listen(PORT_EXPRESS, () => {
  console.log(`Express server running at http://localhost:${PORT_EXPRESS}`);
});
