// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;
const USERS_FILE = 'users.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Helper function to read users from file
const readUsersFromFile = () => {
    if (fs.existsSync(USERS_FILE)) {
        const usersData = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(usersData);
    }
    return [];
};

// Authentication endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsersFromFile();
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, 'secretkey');
    res.json({ token });
});

// Registration endpoint
app.post('/api/register', (req, res) => {
    const { username, password, role } = req.body;
    const users = readUsersFromFile();

    if (users.some((u) => u.username === username)) {
        return res.status(409).json({ message: 'User already exists' });
    }

    users.push({ username, password, role });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User registered successfully' });
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// GET route to fetch job data from JSON file
app.get('/api/jobs', authenticateToken, (req, res) => {
    try {
        // Read jobs data from jobs.json file
        const jobsData = JSON.parse(fs.readFileSync('jobs.json', 'utf-8'));
        res.json(jobsData);
    } catch (error) {
        // Handle errors
        console.error('Error reading jobs data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch registered users
app.get('/api/users', authenticateToken, (req, res) => {
    try {
        const users = readUsersFromFile();
        res.json(users);
    } catch (error) {
        console.error('Error reading users data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
