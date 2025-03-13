import JWT from "jsonwebtoken"; // Import JSON Web Token for authentication

// Middleware to verify JWT token for protected routes
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify the token using JWT secret
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Store the decoded token (customer info) in req object
    req.customer = decoded;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to verify JWT token for protected routes
export const requireSignInShop = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify the token using JWT secret
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Store the decoded token (customer info) in req object
    req.shop = decoded;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
