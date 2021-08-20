import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log("error in verify: " + err.message);
        req.tokenError = err.message;
      } else {
        req.cod_usu = decoded.id;
      }
    });

    next();
  }
};
