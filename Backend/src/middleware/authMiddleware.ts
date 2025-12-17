import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; 

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  
  console.log(" Auth Header:", authHeader); 
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(" No auth header or doesn't start with 'Bearer '"); 
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  const token = authHeader.split(' ')[1];
    
  if (!token) {
    console.log("No token found"); 
    res.status(401).json({ msg: "No token provided" });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log(" Decoded:", decoded); 
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(" Token verification failed:", err); 
    res.status(401).json({ msg: "Invalid token" });
  }
};