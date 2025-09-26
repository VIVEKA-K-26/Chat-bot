import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Accept either decoded.id or decoded.userId
    if (!decoded?.id && !decoded?.userId)
      return res.status(403).json({ error: "Invalid token payload" });

    req.user = { id: decoded.id || decoded.userId };
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
