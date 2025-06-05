import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; 
  
export const authenticateToken = (req: Request,res: Response,next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if(!authHeader || !authHeader.startsWith("Bearer")){
    res.status(401).json({ error:"Unauthorized"})
  }
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ msg: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
 