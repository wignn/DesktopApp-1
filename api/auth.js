const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }
    next();
  });
};

module.exports = verifyToken;
