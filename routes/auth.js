const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

const generateUserId = async (role) => {
  if (role === 'admin') return 'ADMIN01';
  const count = await User.countDocuments({ role: 'user' });
  return `USER${(count + 1).toString().padStart(3, '0')}`;
};

// Register (users only)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'Email exists' });

  const hashed = await bcrypt.hash(password, 10);
  const userId = await generateUserId('user');
  const user = new User({ name, email, password: hashed, role: 'user', userId });
  await user.save();
  res.json({ msg: 'User registered', userId });
});

// Login (user or admin)
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email, role });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

module.exports = router;






// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// require('dotenv').config();

// const router = express.Router();

// // Helper to generate userID
// let userCount = 1;
// const generateUserId = () => `USER${String(userCount++).padStart(3, '0')}`;

// // Manually seed one admin if needed
// // (You could also manually add it to MongoDB)
// const seedAdmin = async () => {
//   const existing = await User.findOne({ role: 'admin' });
//   if (!existing) {
//     const hashed = await bcrypt.hash('admin123', 10);
//     await User.create({
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: hashed,
//       role: 'admin',
//       userId: 'ADMIN01'
//     });
//     console.log('Admin created: admin@example.com / admin123');
//   }
// };
// seedAdmin();

// // Register (only for users)
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ msg: 'User already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       email,
//       password: hashed,
//       role: 'user',
//       userId: generateUserId()
//     });

//     await user.save();
//     res.json({ msg: 'User registered', userId: user.userId });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// // Login (user or admin)
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     const user = await User.findOne({ email, role });

//     if (!user) return res.status(400).json({ msg: 'Invalid email or role' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: 'Invalid password' });

//     const token = jwt.sign(
//       { userId: user.userId, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ token, role: user.role });
//   } catch (err) {
//     res.status(500).json({ msg: 'Login failed', error: err.message });
//   }
// });

// module.exports = router;
