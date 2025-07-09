const express = require('express');
const jwt = require('jsonwebtoken');
const customMiddleware = require('./middlewares/auth')
const app = express();
app.use(express.json());
const SECRET_KEY = 'mySecretKey'; 

// Hardcoded users
const users = {
    u1: { id: 'u1', role: 'user' },
    u2: { id: 'u2', role: 'admin' }
};

// Login endpoint: returns JWT
app.post('/login', (req, res) => {
    const { id } = req.body;
    const user = users[id]

    if (!user) return res.status(401).json({ message: 'Invalid user ID' });

    const token = jwt.sign(user, SECRET_KEY);
    res.json({ token });
});

// Protected route: only admin can delete
app.delete('/posts/:id', customMiddleware(['admin']), (req, res) => {
    res.json({ message: `Post ${req.params.id} deleted by user ${req.user.id}` });
});

module.exports = app;
