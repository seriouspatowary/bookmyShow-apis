import bcrypt from "bcrypt";
import User, { UserRole } from "../models/user.model";
import { platform } from "node:os";

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (
  payload: RegisterPayload
) => {
  const { name, email, phone, password, role } = payload;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new Error("Email already exists");
  }

  const phoneExists = await User.findOne({ phone });

  if (phoneExists) {
    throw new Error("Phone already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: role || UserRole.USER,
  });

  return user;
};



export const loginUser = async(payload:LoginPayload)=>{

    const {email, password} = payload;

    const user = await User.findOne({email})

    if(!user){
        throw new Error('Invalid Credentials');

    }

    const isPasswordvalid = await bcrypt.compare(password,user.password);

    if(!isPasswordvalid){
        throw new Error("Invalid Credentials")
    }

    return user;
}