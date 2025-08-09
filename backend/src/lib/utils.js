import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log('=== COOKIE DEBUG ===');
  console.log('Setting JWT cookie for user:', userId);
  console.log('Token:', token.substring(0, 20) + '...');

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  console.log('Cookie set with options:', {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return token;
};