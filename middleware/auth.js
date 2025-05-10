// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = (roles = []) => (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ msg: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (roles.length && !roles.includes(decoded.role))
//       return res.status(403).json({ msg: 'Forbidden' });

//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// };


const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin access required' });
  next();
};
