import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import createTokens from '../utils/createTokens.js';

// ✅ Helper: Send tokens as cookies
const sendTokens = (user, res) => {
  const { accessToken, refreshToken } = createTokens(user._id, user.role);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: 'Lax',
  };

  // Set access token cookie (15 min)
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  // Set refresh token cookie (7 days)
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Respond with user data
  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// ✅ Register new user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === 'consultant' ? false : true,
    });

    res.status(201).json({
      message:
        role === 'consultant'
          ? 'Consultant registered. Please wait for admin approval.'
          : 'User registered successfully',
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('📩 Login Attempt:', email);

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Consultant must be approved first
    if (user.role === 'consultant' && !user.isApproved)
      return res
        .status(403)
        .json({ message: 'Consultant not approved by admin yet' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    sendTokens(user, res);
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Refresh Access Token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 15 * 60 * 1000,
    });

    const user = await User.findById(decoded.userId).select('-password');
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({
      accessToken: newAccessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Refresh Error:', err.message);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

// ✅ Logout user
export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully' });
};

// ✅ Check Auth (session/persisted login)
export const checkAuth = async (req, res) => {
  const refresh = req.cookies.refreshToken;
  if (!refresh)
    return res.status(401).json({ message: 'Not logged in' });

  try {
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user)
      return res.status(401).json({ message: 'User not found' });

    return res.status(200).json({ user });
  } catch (err) {
    console.error('CheckAuth Error:', err.message);
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
