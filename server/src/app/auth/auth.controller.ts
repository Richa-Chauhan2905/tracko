import type { Request, Response } from "express";
import { googleLogin } from "./auth.services.js";


export async function googleAuth(
  req: Request,
  res: Response
) {
  try {
    const { googleToken } = req.body;

    if (!googleToken) {
      return res.status(400).json({
        message: "Google token is required",
      });
    }


    const result = await googleLogin(
      googleToken
    );


    return res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token,
    });


  } catch (error) {

    console.error(error);

    return res.status(401).json({
      message: "Google authentication failed",
    });

  }
}