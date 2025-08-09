import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Debug logs (optional)
    console.log('=== AUTH DEBUG ===');
    console.log('URL:', req.url);
    console.log('Method:', req.method);

    // Skip token check and verification entirely
    // All requests will be allowed to proceed

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};