const http = require('http');
const fs = require('fs');
const path = require('path');
const subProcess = require('child_process')

const PORT = 3000;

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
        if (!['html', 'css', 'js','python','cpp'].includes(type) || typeof code !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: false, error: 'Invalid payload' }));
        }
        const runInDocker = (image, cmd, code, res) => {
          const child = subProcess.spawn(
            'docker',
            ['run', '--rm', '-i', image, ...cmd],
            { stdio: ['pipe', 'pipe', 'pipe'] }
          );

          // send code into container stdin
          child.stdin.write(code);
          child.stdin.end();

          let output = '';
          let errorOutput = '';

          child.stdout.on('data', data => (output += data.toString()));
          child.stderr.on('data', data => (errorOutput += data.toString()));

          child.on('close', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              ok: true,
              output: output || errorOutput
            }));
          });
        };

        if (type === 'python') {
          return runInDocker('python:3.12', ['python'], code, res);
        }

        if (type === 'js') {
          return runInDocker('node:22', ['node'], code, res);
        }
        if (type === 'cpp') {
          return runInDocker(
            'gcc:13',
            ['sh', '-lc', 'cat > main.cpp && g++ -O2 -std=c++17 main.cpp -o main && ./main'],
            code,
            res
          );
        }
        // html/css: still respond
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: true, output: '' }));
      } catch {
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
  console.log('All set!! (^-^)');
  console.log("Running as:", process.getuid(), process.getgid(), process.getgroups());
});
