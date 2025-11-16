# Working with Data and API Best Practices - Lesson 4 Notes

## 1. Data Storage Types

### In-Memory Data (Temporary) 
**Lives in**: Server's RAM  
**Lifespan**: Lost when server stops/restarts

```javascript
// This data disappears on restart!
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
];
```

**Use when**: Testing, temporary cache, development



### Persistent Data (Permanent) 
**Lives in**: Files or databases  
**Lifespan**: Survives server restarts

```json
// books.json file
[
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
    { "id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee" }
]
```

**Use when**: Production, need to keep data long-term


## 2. Working with JSON Files

Use Node.js `fs` (file system) module to read/write files.

### Read from JSON File:
```javascript
const fs = require('fs');

function readBooksFromFile() {
    const data = fs.readFileSync('books.json', 'utf8');
    return JSON.parse(data);
}
```

### Save to JSON File:
```javascript
function saveBooksToFile(books) {
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));
}
```

**Note**: `null, 2` in `JSON.stringify()` creates readable formatting with 2-space indentation



## 3. Complete CRUD API Example

### Full Books API Code:

```javascript
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Helper function: Read books from file
function readBooks() {
    try {
        return JSON.parse(fs.readFileSync('books.json', 'utf8'));
    } catch (e) {
        return [];  // Return empty array if file doesn't exist
    }
}

// Helper function: Save books to file
function saveBooks(books) {
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2));
}

/*
CREATE - Add a new book
Generates unique ID using timestamp
*/
app.post('/api/v1/books', (req, res) => {
    const books = readBooks();
    const newBook = { id: Date.now(), ...req.body };
    books.push(newBook);
    saveBooks(books);
    res.status(201).json(newBook);
});

/*
READ - Get all books
*/
app.get('/api/v1/books', (req, res) => {
    const books = readBooks();
    res.json(books);
});

/*
READ - Get single book by ID
*/
app.get('/api/v1/books/:id', (req, res) => {
    const id = req.params.id;
    const books = readBooks();
    const book = books.find(b => String(b.id) === id) || null;
    res.json(book);
});

app.listen(port, () => {
    console.log(`Books API running on http://localhost:${port}`);
});
```

### What Each Part Does:

| Function | Purpose |
|----------|---------|
| `readBooks()` | Reads data from `books.json`, returns empty array if error |
| `saveBooks(books)` | Writes books array to `books.json` with formatting |
| `Date.now()` | Generates unique ID using current timestamp |
| `...req.body` | Spreads request body data into new book object |



## 4. HTTP Status Codes

Status codes tell the client what happened with their request.

### Success Codes (2xx) 

| Code | Meaning | When to Use |
|------|---------|-------------|
| **200 OK** | Request successful | Returning data (GET) |
| **201 Created** | New resource created | After POST (create) |
| **204 No Content** | Success, no data | After DELETE |

### Client Error Codes (4xx) 

| Code | Meaning | When to Use |
|------|---------|-------------|
| **400 Bad Request** | Invalid data sent | Missing fields, wrong format |
| **401 Unauthorized** | Authentication required | User not logged in |
| **403 Forbidden** | No permission | User doesn't have access |
| **404 Not Found** | Resource doesn't exist | Book ID not found |

### Server Error Codes (5xx) 

| Code | Meaning | When to Use |
|------|---------|-------------|
| **500 Internal Server Error** | Server problem | Database crash, code error |

### Practical Examples:

```javascript
//  Success responses
res.status(200).json({ message: "Data retrieved successfully" });
res.status(201).json({ message: "Resource created" });

//  Error responses
res.status(400).json({ message: "Invalid input data" });
res.status(404).json({ message: "Resource not found" });
res.status(500).json({ message: "Server error occurred" });
```



## 5. API Best Practices

###  Practice 1: Use Versioning

**Why**: Allows API updates without breaking old clients

```javascript
//  GOOD: Versioned endpoints
app.get('/api/v1/books', handler);
app.get('/api/v2/books', handler);  // Future version

//  AVOID: No version
app.get('/books', handler);
```



###  Practice 2: Use Nouns, Not Verbs

**Why**: HTTP methods already indicate the action

```javascript
//  GOOD: Use nouns
GET    /api/v1/books      // Get all books
POST   /api/v1/books      // Create book
PUT    /api/v1/books/1    // Update book
DELETE /api/v1/books/1    // Delete book

//  AVOID: Using verbs (redundant)
GET    /api/v1/getBooks
POST   /api/v1/createBook
PUT    /api/v1/updateBook
DELETE /api/v1/deleteBook
```



###  Practice 3: Use Plural Nouns for Collections

**Why**: Makes API intuitive and consistent

```javascript
//  GOOD: Plural for collections
GET /api/v1/books       // Get all books
GET /api/v1/books/1     // Get one book

// ❌ AVOID: Singular (confusing)
GET /api/v1/book        // All books or one book?
```



###  Practice 4: Consistent Response Format

**Why**: Makes API predictable for clients

```javascript
//  GOOD: Always use same structure
{
    "message": "Description of what happened",
    "data": { 
        "id": 1,
        "title": "Book Title"
    }
}

// Example implementation
res.status(200).json({
    message: "Book retrieved successfully",
    data: book
});
```

---

###  Practice 5: Meaningful Error Messages

**Why**: Helps developers debug issues quickly

```javascript
//  GOOD: Clear, specific error
res.status(404).json({
    message: "Book with ID 123 not found"
});

//  AVOID: Vague messages
res.status(404).json({
    message: "Error"
});

//  EVEN BETTER: Include helpful info
res.status(400).json({
    message: "Invalid book data",
    errors: {
        title: "Title is required",
        author: "Author must be a string"
    }
});
```



## Quick Reference: CRUD Operations

| Operation | HTTP Method | Endpoint | Status Code |
|-----------|-------------|----------|-------------|
| **Create** | POST | `/api/v1/books` | 201 Created |
| **Read All** | GET | `/api/v1/books` | 200 OK |
| **Read One** | GET | `/api/v1/books/:id` | 200 OK |
| **Update** | PUT | `/api/v1/books/:id` | 200 OK |
| **Delete** | DELETE | `/api/v1/books/:id` | 204 No Content |



## Testing the Books API with curl

### Create a Book (POST):
```bash
curl -X POST http://localhost:3000/api/v1/books -H "Content-Type: application/json" -d '{"title":"1984","author":"George Orwell"}'
```

### Get All Books (GET):
```bash
curl http://localhost:3000/api/v1/books
```

### Get Single Book (GET):
```bash
curl http://localhost:3000/api/v1/books/1234567890
```



## Remember !

1. **In-memory data** = Fast but temporary
2. **JSON files** = Simple persistent storage for small apps
3. **Use proper status codes** = Tell clients exactly what happened
4. **Follow REST conventions** = Makes API intuitive and professional
5. **Version your API** = Allows future changes without breaking clients
6. **Clear error messages** = Saves debugging time



## Common Mistakes to Avoid

|   Mistake |  Solution |
|-----------|------------|
| No status codes | Always use appropriate status codes |
| Using verbs in URLs | Use nouns + HTTP methods |
| Inconsistent naming | Stick to plural nouns |
| Vague error messages | Be specific about what went wrong |
| No API versioning | Always include `/v1/`, `/v2/`, etc. |
| Hardcoding data | Use files or databases |



## File Structure for This Project

```
project-folder/
├── app.js              # Your API code
├── books.json          # Persistent data storage
├── package.json        # Project dependencies
└── node_modules/       # Installed packages
```

**First Run**: Create empty `books.json` file:
```json
[]
```