const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const REDIRECTS = {
  '/articles/how-to-choose-cheap-airport.html': '/articles/plan-selection-guide.html',
  '/articles/how-to-choose-cheap-airport': '/articles/plan-selection-guide.html',
  '/articles/how-to-choose-cheap-airport/': '/articles/plan-selection-guide.html',
  '/articles/best-airport-recommendation-guide.html': '/articles/plan-selection-guide.html',
  '/articles/best-airport-recommendation-guide': '/articles/plan-selection-guide.html',
  '/articles/best-airport-recommendation-guide/': '/articles/plan-selection-guide.html',
  '/articles/clash-node-tutorial.html': '/articles/windows-client-tutorial.html',
  '/articles/clash-node-tutorial': '/articles/windows-client-tutorial.html',
  '/articles/clash-node-tutorial/': '/articles/windows-client-tutorial.html',
  '/articles/clashparty-subscription-guide.html': '/articles/getting-started-guide.html',
  '/articles/clashparty-subscription-guide': '/articles/getting-started-guide.html',
  '/articles/clashparty-subscription-guide/': '/articles/getting-started-guide.html',
  '/articles/cross-border-network-faq.html': '/articles/frequently-asked-questions.html',
  '/articles/cross-border-network-faq': '/articles/frequently-asked-questions.html',
  '/articles/cross-border-network-faq/': '/articles/frequently-asked-questions.html',
  '/articles/proxy-modes-comparison.html': '/articles/getting-started-guide.html',
  '/articles/proxy-modes-comparison': '/articles/getting-started-guide.html',
  '/articles/proxy-modes-comparison/': '/articles/getting-started-guide.html',
  '/articles/safe-airport-privacy-risks.html': '/articles/subscription-link-management.html',
  '/articles/safe-airport-privacy-risks': '/articles/subscription-link-management.html',
  '/articles/safe-airport-privacy-risks/': '/articles/subscription-link-management.html',
  '/articles/stable-nodes-selection-guide.html': '/articles/troubleshooting-connection-failures.html',
  '/articles/stable-nodes-selection-guide': '/articles/troubleshooting-connection-failures.html',
  '/articles/stable-nodes-selection-guide/': '/articles/troubleshooting-connection-failures.html',
  '/plans': '/plans.html',
  '/plans/': '/plans.html'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  // Check 301 Permanent Redirects for legacy URLs
  if (REDIRECTS[reqPath]) {
    res.writeHead(301, {
      'Location': REDIRECTS[reqPath],
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${REDIRECTS[reqPath]}"></head><body>Moved Permanently to <a href="${REDIRECTS[reqPath]}">${REDIRECTS[reqPath]}</a></body></html>`);
    return;
  }

  let filePath = path.join(ROOT, reqPath);

  // If path is a directory, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't exist, try appending .html
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 Not Found</h1><p><a href="/">返回首页</a></p>');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`SunYun Cloud web server running at http://127.0.0.1:${PORT}/`);
});
