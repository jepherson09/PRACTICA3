const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWT_SECRET || 'crud-secret-2024';
const users = [
  { id: 1, email: 'admin@example.com', password: bcrypt.hashSync('admin123', 10), role: 'admin', name: 'Admin' },
];
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '24h' });
  res.json({ success: true, token, user: { id: user.id, email: user.email, role: user.role } });
});
router.post('/logout', (req, res) => res.json({ success: true, message: 'Logged out' }));
module.exports = router;
