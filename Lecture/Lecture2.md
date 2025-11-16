# Node.js for Cloud Development - Lesson 2 Notes

## What is Node.js?

 >> it is a Open-source runtime environment that runs JavaScript code **outside of a browser**

**Built on**: V8 JavaScript engine (same as Google Chrome)

**Key Feature**: Enables server-side development with JavaScript → Use same language for frontend AND backend



## Node.js Runtime Environment

The runtime includes everything needed to execute JavaScript programs:

### Core Components:
1. **V8 JavaScript Engine** - Makes JavaScript run very fast (from Google Chrome)
2. **Libuv Library** - Handles asynchronous tasks (file reading, writing, networking)
3. **APIs and Modules** - Built-in modules like `fs`, `os`, `http`

### Non-blocking I/O System:
- Can handle **many requests simultaneously**
- Doesn't wait for one process to finish before starting another
- Perfect for applications that need to scale (cloud-based systems)

### Check Installation:
```bash
node --version
# Should output: v2x.xx.x
```



## Core Modules


### 1. The `os` Module (Operating System Info)

**Purpose**: Get system details (platform, CPU, memory, user info)

**Use Case**: Monitoring server resources, scaling decisions, debugging

```javascript
const os = require('os');

console.log("Operating System:", os.type());      // e.g., Linux, Windows_NT
console.log("Platform:", os.platform());          // e.g., win32, linux
console.log("Architecture:", os.arch());          // e.g., x64, arm
console.log("CPU Count:", os.cpus().length);      // Number of CPU cores
console.log("Total Memory:", os.totalmem());      // Total RAM in bytes
console.log("Free Memory:", os.freemem());        // Available RAM in bytes
```


### 2. The `fs` Module (File System)

**Purpose**: Read, write, update, delete files on the server

**Use Case**: Saving logs, configuration files, user uploads. In cloud: temporary data storage, caching. For persistent storage → use AWS S3 or Google Cloud Storage

```javascript
const fs = require('fs');

// Write to a file (creates new or overwrites)
fs.writeFileSync('example.txt', 'Hello, this is a file created with Node.js!');

// Read the file
const content = fs.readFileSync('example.txt', 'utf-8');
console.log("File Content:", content);

// Append data (adds to end of file)
fs.appendFileSync('example.txt', '\nAdding a new line of text.');
console.log("Updated File Content:", fs.readFileSync('example.txt', 'utf-8'));
```

**Note**: After running, a new file `example.txt` is created in your project folder



### 3. The `http` Module (Web Server)

**Purpose**: Create HTTP servers, handle requests/responses

**Use Case**: Foundation for REST APIs and web applications. Powers communication between microservices

```javascript
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
```

**Key Objects**:
- `req` = incoming request (headers, URL, method)
- `res` = response sent back to client

**Testing**:
1. Run the code: `node index.js`
2. Open browser: `http://localhost:3000`
3. Stop server: Press `Ctrl + C` in terminal



## Why Node.js is Useful in Cloud Computing

### Performance Advantages:
- **Lightweight & Fast**: Built on V8 engine, uses fewer system resources
- **Event-driven, Non-blocking I/O**: Handles thousands of simultaneous connections without slowing down
- **High Concurrency**: Perfect for user-heavy applications (chat apps, APIs, real-time dashboards, gaming)

### Cloud Platform Support:
All major cloud providers support Node.js:
- **AWS**: Lambda (serverless), EC2, Elastic Beanstalk
- **Azure**: Functions, App Service
- **Google Cloud**: Cloud Functions, App Engine
- Also supports Docker and Kubernetes containers

### Development Benefits:
- **npm Ecosystem**: Massive library of open-source packages
- **Same Language**: JavaScript for frontend and backend
- **Rapid Development**: Quick integration of tools, frameworks, cloud SDKs
- **Easy Scaling**: Works with auto-scaling and load balancing features

### Reasons why Node.js is ideal for cloud because it:
1.  Maximizes performance with efficient resource usage
2.  Handles high concurrency (many users at once)
3.  Integrates smoothly with major cloud providers
4.  Supports rapid development through npm
5.  Scales easily in serverless and containerized environments



## Key Concepts Recap

| Concept | Explanation |
|---------|-------------|
| **Runtime Environment** | Everything needed to execute JavaScript outside a browser |
| **Non-blocking I/O** | Can handle multiple operations simultaneously |
| **Event-driven** | Responds to events/requests as they happen |
| **Core Modules** | Built-in functionality (os, fs, http) - no install needed |
| **Serverless** | Run code without managing servers (AWS Lambda, Azure Functions) |



## Common Use Cases in Cloud:
- REST APIs
- Microservices communication
- Real-time applications (chat, notifications)
- Data streaming and processing
- IoT backends
- Serverless functions
