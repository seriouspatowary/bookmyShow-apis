import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { registerUser, loginUser, refreshAccessToken } from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";
import { success } from "zod";
import jwt from "jsonwebtoken";



export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);


    return res.status(201).json({
      success: true,
      message: "User registered successfully",

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async(req:Request, res:Response)=>{
    try {

        const data = await loginSchema.parse(req.body);

        const user = await loginUser(data);

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            role: user.role

        })


        const refreshToken = generateRefreshToken({
            userId: user._id.toString(),
            role: user.role

        })

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

        return res.status(200).json({
          success: true,
          message: "Login successful",

          accessToken,

          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
        });
     
        
    } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


export const refresh = async(req:Request, res:Response) =>{
    try {

       const refreshToken  = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(401).json({
            success: false,
            message: "Refresh token missing",
          });
        }
        const accessToken = await refreshAccessToken(refreshToken)

       const result = await refreshAccessToken(refreshToken);

        return res.status(200).json({
          success: true,
          accessToken: result.accessToken,
          user: {
            id: result.user._id,
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone,
            role: result.user.role,
          },
        });

  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};