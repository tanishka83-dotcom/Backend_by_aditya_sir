const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'Abcde@12345'
    );

    const userData = await User.findById(decoded.id).select('-password');

    if (!userData) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = checkAuth;
