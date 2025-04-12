const express = require('express');
const fs = require('fs');
const router = express.Router();
const userFile = './data/users.json';

const readUsers = () => JSON.parse(fs.readFileSync(userFile));
const writeUsers = (users) => fs.writeFileSync(userFile, JSON.stringify(users, null, 2));

router.post('/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;
  const users = readUsers();
  console.log('Users in database:', users);
  const user = users.find(u => u.username === username && u.password === password);
  console.log('Found user:', user);
  if (user) res.json({ success: true, token: 'dummy-token' });
  else res.status(401).json({ success: false, message: 'Invalid username or password' });
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  let users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  users.push({ username, password });
  writeUsers(users);
  res.json({ success: true, token: 'dummy-token' });
});

module.exports = router;