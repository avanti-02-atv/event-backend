import jwt from "jsonwebtoken";

export default function authorization(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Token missing!");
  }

  const token = authorization.replace('Bearer ', '').trim();

  try {
    const { isOrganizer } = jwt.verify(token, process.env.SECRET_KEY_JWT);

    if (!isOrganizer){
      return res.status(401).json("Unauthorized");
    }
    
    return next();
  } catch (error){
    return res.status(401).json("Invalid Token");
  }
}