const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Start with the build directory
  let filePath = path.join(__dirname, 'build', req.url);
  if (req.url === '/run' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const { type, code } = JSON.parse(body || '{}');
        //if not listed->invalid
        if (!['html', 'css', 'js'].includes(type) || typeof code !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: false, error: 'Invalid payload T^T' }));
        }
        console.log(`[RUN] type=${type}, length=${code.length}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          ok: true,
          type,
          code
        }));
      } 
      //error handling
      catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: false, error: 'Bad JSON' }));
      }
    });
    return;
  }
  // If requesting root, serve index.html from build folder
  if (req.url === '/') {
    filePath = path.join(__dirname, 'build', 'index.html');
  }
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found - for React Router, always serve index.html
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("<h1>404 Not Found</h1>") 
    }
    
    // Get file extension and content type
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('All set!! (^-^');
});
