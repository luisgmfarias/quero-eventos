const jwt = require("jsonwebtoken");
const jwtSecret = "secret";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token de autenticação inválido ou expirado." });
  }
};

module.exports = authMiddleware;
