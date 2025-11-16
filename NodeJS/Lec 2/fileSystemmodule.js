const fs = require('fs');
// Write to a file
fs.writeFileSync('example.txt', 'Hello, this is a file created with Node.js!');
// Read the file
const content = fs.readFileSync('example.txt', 'utf-8');
console.log("File Content:", content);
// Append data
fs.appendFileSync('example.txt', '\nAdding a new line of text.');
console.log("Updated File Content:", fs.readFileSync('example.txt', 'utf-8'));