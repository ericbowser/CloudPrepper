# Backend Authentication API Requirements

## Problem
The frontend is trying to connect to authentication endpoints that don't exist on the backend server, resulting in 404 errors.

## Current Status
- **Frontend expects**: `http://localhost:55235/api/auth/login`
- **Backend returns**: 404 Not Found
- **Issue**: The backend server doesn't have authentication endpoints implemented

## Required Backend Endpoints

Your Node.js/Express backend needs to implement the following authentication endpoints:

### 1. POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "lastLogin": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 2. POST `/api/auth/register`
**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

**Note:** The `role` parameter is optional and defaults to `"user"` if not provided. Currently, the frontend includes this parameter for temporary admin setup purposes.

**Success Response (200):**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### 3. GET `/api/auth/verify`
**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

## Implementation Checklist

### Database Setup
- [ ] Create `users` table with columns:
  - `id` (primary key, auto-increment)
  - `username` (unique, not null)
  - `email` (unique, not null)
  - `password` (hashed, not null)
  - `role` (enum: 'user' | 'admin', default: 'user')
  - `created_at` (timestamp)
  - `last_login` (timestamp, nullable)

### Backend Implementation
- [ ] Install required packages:
  ```bash
  npm install bcrypt jsonwebtoken express-validator
  npm install --save-dev @types/bcrypt @types/jsonwebtoken
  ```

- [ ] Create authentication middleware for JWT verification
- [ ] Implement password hashing with bcrypt
- [ ] Create login route handler
- [ ] Create register route handler
- [ ] Create token verification route handler
- [ ] Add CORS configuration to allow frontend origin
- [ ] Add error handling middleware

### Security Considerations
- [ ] Hash passwords using bcrypt (minimum 10 rounds)
- [ ] Use JWT tokens with expiration (e.g., 24 hours)
- [ ] Validate input data (email format, password strength)
- [ ] Rate limit authentication endpoints
- [ ] Use HTTPS in production
- [ ] Sanitize user inputs to prevent SQL injection

## Example Express.js Implementation

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (!user.rows[0]) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Update last login
    await db.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.rows[0].id]);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email,
        role: user.rows[0].role,
        createdAt: user.rows[0].created_at,
        lastLogin: user.rows[0].last_login
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    
    // Validate role (optional - for temporary admin setup)
    const validRole = role === 'admin' ? 'admin' : 'user';
    
    // Check if user exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (existingUser.rows[0]) {
      return res.status(400).json({ success: false, message: 'Email or username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at',
      [username, email, hashedPassword, validRole]
    );
    
    const user = result.rows[0];
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/auth/verify
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await db.query('SELECT id, username, email, role FROM users WHERE id = $1', [decoded.id]);
    
    if (!user.rows[0]) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    res.json({
      success: true,
      user: user.rows[0]
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
```

## Testing

Once implemented, test the endpoints:

```bash
# Test login
curl -X POST http://localhost:55235/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@comptiaprepper.local","password":"test123"}'

# Test register
curl -X POST http://localhost:55235/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","email":"new@example.com","password":"password123"}'

# Test verify
curl -X GET http://localhost:55235/api/auth/verify \
  -H "Authorization: Bearer <your_token_here>"
```

## Configuration

Make sure your backend:
1. Is running on the port specified in `env.json` (currently `55235`)
2. Has CORS enabled for your frontend origin
3. Has the `/api/auth` routes mounted correctly
4. Has environment variables set (JWT_SECRET, database connection, etc.)

## Next Steps

1. Implement the authentication endpoints in your backend
2. Test each endpoint individually
3. Update the frontend `env.json` if the backend port changes
4. Ensure the backend is running before testing the frontend login

