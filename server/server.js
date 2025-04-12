const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Ensure data directory exists
const dataPath = process.env.DATA_PATH || path.join(__dirname, 'data');
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

// Initialize empty JSON files if they don't exist
const usersPath = path.join(dataPath, 'users.json');
const tasksPath = path.join(dataPath, 'tasks.json');

if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, '[]');
}

if (!fs.existsSync(tasksPath)) {
    fs.writeFileSync(tasksPath, '[]');
}

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;