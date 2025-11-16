const http = require('http');
// Create a server
const server = http.createServer((req, res) => {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello, this is your first Node.js server!\n');
});
// Server listens on port 3000
server.listen(3000, () => {
console.log("Server is running on http://localhost:3000");
});