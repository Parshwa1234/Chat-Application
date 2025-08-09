import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log('=== AUTH DEBUG ===');
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    console.log('Cookies received:', req.cookies);
    console.log('Cookie header:', req.headers.cookie);
    console.log('All headers:', Object.keys(req.headers));
    
    const token = req.cookies.jwt;

    if (!token) {
      console.log('No JWT token found in cookies');
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Skip JWT verification completely here
    
    // Optionally, you can try to decode the token without verifying
    // or just let the user pass without validating token content

    // For example, if you want to get user ID without verifying signature (not secure):
    // const decoded = jwt.decode(token);
    // const user = await User.findById(decoded.userId).select("-password");

    // Or just assign user as null or skip altogether
    // Here we will just let the request pass with no user info

    // If you want to attach some user data anyway (unsafe), you can do so here.
    // Otherwise, just call next()

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
