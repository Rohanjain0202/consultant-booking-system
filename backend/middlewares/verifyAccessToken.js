import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyAccessToken = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided in cookies' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('✅ Decoded Token:', decoded);

    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyAccessToken;
