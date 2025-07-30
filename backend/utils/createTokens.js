// backend/utils/createTokens.js
import jwt from 'jsonwebtoken';

const createTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role }, // payload must have userId
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId, role }, // payload must match!
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export default createTokens;
