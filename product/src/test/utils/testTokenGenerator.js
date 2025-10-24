const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Generate a valid JWT token for testing purposes
 * This eliminates the need to depend on the auth service during testing
 */
function generateTestToken(payload = {}) {
  const defaultPayload = {
    userId: "test-user-id-12345",
    username: "testuser",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiry
  };

  const tokenPayload = { ...defaultPayload, ...payload };
  
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found in environment variables");
  }

  return jwt.sign(tokenPayload, process.env.JWT_SECRET);
}

module.exports = { generateTestToken };