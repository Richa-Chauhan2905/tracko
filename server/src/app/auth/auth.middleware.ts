import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../env.js";


export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }


    const token = authHeader.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }


    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    );


    if (
      typeof decoded === "string"
    ) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }


    req.user = {
      id: decoded.id,
      email: decoded.email,
    };


    next();


  } catch(error) {

    return res.status(401).json({
      message: "Unauthorized",
    });

  }
}