//This activity is about using modules in JS : ( os, fs, http)

const os = require('os');
const fs = require('fs');
const http = require('http');

fs.writeFileSync('os_info.txt','This the message that would be written to the file');
console.log("File Content: ", fs.readFileSync('os_info.txt','utf-8'));

fs.appendFileSync('os_info.txt',`\nOperating System Info: ${os.type()} ${os.release()}`);
console.log("Updated File Content: ", fs.readFileSync('os_info.txt','utf-8'));

const server = http.createServer((req, res) => {

    const operatingSystem = os.platform();
    const cpuArchitecture = os.arch();
    const freeMemory = os.freemem();
    const fileContent = fs.readFileSync('os_info.txt', 'utf-8');

const html = `
    <html>
    <head><title>OS Information</title></head>
    <style>
        body 
           { font-family: Arial, sans-serif;
          margin: 20px; }

        h1
           { color: #333; }

        pre 
          { background: #abc3d7ff; 
           padding: 10px; 
           border: 1px solid #ddd; }

        .box 
           { border: 2px solid #000;
             padding: 20px;
              border-radius: 5px;
              width: 50%;
              margin: auto; 
              margin-top: 10%;
              justify-content: center; }
        
    </style>
    <body>
        <div class="box">
            <h1>Operating System Information</h1>
            <p><strong>Operating System:</strong> ${operatingSystem}</p>
            <p><strong>CPU Architecture:</strong> ${cpuArchitecture}</p>
            <p><strong>Free Memory:</strong> ${freeMemory} bytes</p>
            <h2>File Content:</h2>
            <pre>${fileContent}</pre>
        </div>
    </body>
    </html>
`;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

      server.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
});     
