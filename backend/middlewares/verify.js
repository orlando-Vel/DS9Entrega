import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  const secretKey = process.env.JWT_SECRET;

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded;
    console.log("Log de depuracion en el token", req.user);
    next();
  });
};

export const verifyRole = (requiredRoles) => {
  return (req, res, next) => {
    console.log("Log de depuracion", req.user);
    const { roles } = req.user;
    console.log("Log de depuracion rol:", roles);

    if (!roles || !requiredRoles.some((role) => roles.includes(role))) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
};
