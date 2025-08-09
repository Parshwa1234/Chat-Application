import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("=== COOKIE DEBUG ===");
    console.log("Setting JWT cookie for user:", userId);
    console.log("Token (first 20 chars):", token.substring(0, 20) + "...");

    const isProd = process.env.NODE_ENV === "production";

    // utils.js
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: isProd,                // HTTPS only in prod
      sameSite: "None", // "none" for cross-site in prod
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Cookie set with options:", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
