# Middleware in REST APIs - Lesson 5 Notes

## What is Middleware?

**Middleware** = Function that sits **between** the request and response cycle

### What Middleware Can Do:
- ✅ Modify request or response objects
- ✅ Execute code
- ✅ End the request-response cycle
- ✅ Call the next middleware in the stack

### Why It's Important:
Handles tasks like **logging**, **validation**, **authentication**, and **error handling** in a structured way

---

## Middleware Structure

```javascript
app.use((req, res, next) => {
    console.log("A request was received");
    next(); // Move to the next function
});
```

### Three Key Parameters:
| Parameter | Description |
|-----------|-------------|
| **req** | Request object (incoming data) |
| **res** | Response object (send data back) |
| **next** | Function to move to next middleware |

**Execution Order**: Middleware runs in the order it's defined ⬇️

---

## Are Routes Middleware?

**Yes!** Route handlers (like `app.get('/users', ...)`) are also middleware functions.

### Key Difference:

| Type | Calls `next()`? | Ends Cycle? |
|------|----------------|-------------|
| **Regular Middleware** | ✅ Yes | ❌ No |
| **Route Handler** | ❌ Usually not | ✅ Yes (sends response) |

### Example:
```javascript
app.get('/hello', (req, res) => {
    res.send("Hello world"); // Ends request-response cycle
    // No next() called = no more middleware runs
});
```

---

## Types of Middleware

### 1. Application-Level Middleware

**Bound to**: `app` object using `app.use()`  
**Scope**: Runs for every request or specific paths  
**Use for**: Logging, security checks, parsing JSON

```javascript
// Runs for ALL requests
app.use(express.json()); // Built-in JSON parser

// Custom application-level middleware
app.use((req, res, next) => {
    console.log("Every request passes through here");
    next();
});
```

---

### 2. Router-Level Middleware

**Bound to**: `express.Router()` instance  
**Scope**: Specific routes/paths  
**Use for**: Organizing related routes

```javascript
const express = require('express');
const app = express();
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
    console.log("Router specific middleware");
    next();
});

// Route under /api/v1/students
router.get("/students", (req, res) => {
    res.json({ message: "Students route" });
});

// Mount router to app
app.use("/api/v1", router);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

**Result**: Accessing `/api/v1/students` triggers router middleware first, then the route

---

### 3. Built-in Middleware

**Comes with**: Express (no installation needed)

| Middleware | Purpose |
|------------|---------|
| `express.json()` | Parse JSON request bodies |
| `express.urlencoded()` | Parse URL-encoded data |
| `express.static()` | Serve static files (HTML, CSS, images) |

```javascript
// Parse JSON
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static("public"));
```

---

### 4. Third-Party Middleware

**Installed from**: npm  
**Popular packages**: morgan (logging), cors, helmet (security)

```javascript
// Install first: npm install morgan
const morgan = require("morgan");

app.use(morgan("dev")); // Logs all requests
```

---

## Common Use Cases for Middleware

| Use Case | What It Does | Example |
|----------|--------------|---------|
| **Logging** | Log request details | Track method, URL, timestamp |
| **Authentication** | Check if user is logged in | Verify JWT tokens |
| **Validation** | Check request data validity | Ensure required fields exist |
| **Error Handling** | Catch and handle errors | Return proper error responses |

---

## Hands-on Examples

### Example 1: Logger Middleware

Logs the HTTP method and URL of each request.

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Apply logger middleware to all routes
app.use(logger);
app.use(express.json());

// Logger middleware function
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // Continue to next middleware/route
}

// Example route
app.get('/api/v1/students', (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

**Output in console when accessing `/api/v1/students`**:
```
GET /api/v1/students
```

---

### Example 2: Request Validator Middleware

Checks if request body has required fields before creating a student.

```javascript
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Request validator middleware function
function validateStudent(req, res, next) {
    const { id, name } = req.body;
    
    // Check if required fields exist
    if (!id || !name) {
        return res.status(400).json({
            message: "Student must have id and name"
        });
    }
    
    next(); // Validation passed, move to route
}

// POST route with validation middleware
app.post("/api/v1/students", validateStudent, (req, res) => {
    const newStudent = req.body;
    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

**Testing with curl**:

✅ **Valid request** (has id and name):
```bash
curl -X POST http://localhost:3000/api/v1/students -H "Content-Type: application/json" -d '{"id":1,"name":"Alice"}'
```
Response: `201 Created` with student data

❌ **Invalid request** (missing name):
```bash
curl -X POST http://localhost:3000/api/v1/students -H "Content-Type: application/json" -d '{"id":1}'
```
Response: `400 Bad Request` - "Student must have id and name"

---

### Example 3: Multiple Middleware (Execution Order)

Demonstrates how middleware runs in sequence.

```javascript
const express = require('express');
const app = express();

// First middleware
app.use((req, res, next) => {
    console.log("This runs first");
    next(); // Move to next middleware
});

// Second middleware
app.use((req, res, next) => {
    console.log("This runs second");
    next(); // Move to route
});

// Route handler
app.get("/students", (req, res) => {
    console.log("This runs third");
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
});
```

**Console output when accessing `/students`**:
```
This runs first
This runs second
This runs third
```

---

## Middleware Flow Diagram

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
            ↓ next()      ↓ next()         ↓ res.send()
```

**Important**: If you forget `next()`, the request will hang! ⚠️

---

## Common Middleware Patterns

### Pattern 1: Applying Middleware to All Routes
```javascript
app.use(middleware); // Runs for ALL requests
```

### Pattern 2: Applying Middleware to Specific Route
```javascript
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: "You are authenticated" });
});
```

### Pattern 3: Multiple Middleware for One Route
```javascript
app.post('/students', 
    logger,           // First
    validateStudent,  // Second
    (req, res) => {   // Third (route handler)
        res.json({ message: "Success" });
    }
);
```

### Pattern 4: Middleware for Specific Path
```javascript
app.use('/api', middleware); // Only runs for paths starting with /api
```

---

## Best Practices

| ✅ Do | ❌ Don't |
|------|---------|
| Always call `next()` unless ending response | Forget `next()` (request will hang) |
| Place middleware before routes | Place middleware after routes (won't work) |
| Keep middleware functions small and focused | Create complex, multi-purpose middleware |
| Use descriptive middleware names | Use generic names like `middleware1` |
| Handle errors properly | Let errors crash the server |

---

## Middleware Execution Order Matters!

```javascript
// ❌ WRONG: Route defined before middleware
app.get('/students', (req, res) => {
    res.json({ message: "Students" });
});
app.use(logger); // Won't log /students requests!

// ✅ CORRECT: Middleware before route
app.use(logger);
app.get('/students', (req, res) => {
    res.json({ message: "Students" });
});
```

---

## Quick Reference

| Middleware Type | Binding | Scope | Example |
|----------------|---------|-------|---------|
| **Application-level** | `app.use()` | All routes or specific path | `app.use(express.json())` |
| **Router-level** | `router.use()` | Routes in router | `router.use(logger)` |
| **Built-in** | Comes with Express | Varies | `express.static()` |
| **Third-party** | Install from npm | Varies | `morgan`, `cors` |

---

## Key Takeaways

1. **Middleware = Functions** that run between request and response
2. **Order matters** - middleware executes top to bottom
3. **Always call `next()`** unless sending a response
4. **Routes are middleware** that end the request-response cycle
5. **Common uses**: Logging, validation, authentication, error handling
6. **Types**: Application, Router, Built-in, Third-party