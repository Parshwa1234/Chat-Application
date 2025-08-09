import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    // Create JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("=== COOKIE DEBUG ===");
    console.log("Setting JWT cookie for user:", userId);
    console.log("Token (first 20 chars):", token.substring(0, 20) + "...");

    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevent JS access to cookie
      secure: process.env.NODE_ENV === "production", // True only in HTTPS
      sameSite: "none", // Must be "none" for cross-site requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("Cookie set with options:", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
