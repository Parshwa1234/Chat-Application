import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log('=== COOKIE DEBUG ===');
  console.log('Setting JWT cookie for user:', userId);
  console.log('Token:', token.substring(0, 20) + '...');

res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true if HTTPS
  sameSite: "none", // must be "none" for cross-site requests
  maxAge: 7 * 24 * 60 * 60 * 1000 // optional: 7 days
}); 

  console.log('Cookie set with options:', {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};