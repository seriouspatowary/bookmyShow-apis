import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { registerUser, loginUser } from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";
import { success } from "zod";

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


        const refreshToken = generateAccessToken({
            userId: user._id.toString(),
            role: user.role

        })

        return res.status(200).json({
            success:true,
            message: "Login successful",

            accessToken,
            refreshToken,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        })
     
        
    } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};