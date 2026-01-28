import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../utils/validate";


const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// ---------------- Signup ------------------

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ 
        message: "Invalid input", 
        error: parsed.error.errors[0].message 
      });
      return;
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err: any) {
    console.error(" Signup error:", err);
    res.status(500).json({ 
      message: "Something went wrong", 
      error: err.message 
    });
  }
};

// ---------------- Login ------------------

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("📥 Login attempt:", req.body.email); // Debug log
    
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ 
        message: "Invalid input", 
        error: parsed.error.errors[0].message 
      });
      return;
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    
  
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      message: "Login successful"
    });
    
  } catch (err: any) {
    console.error(" Login error:", err);
    res.status(500).json({ 
      message: "Something went wrong", 
      error: err.message 
    });
  }
};