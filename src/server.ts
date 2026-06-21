import dotenv from "dotenv"

dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const Port = process.env.PORT || 4001

connectDB();


app.listen(Port,()=>{
    console.log(`Server is Running on Port:${Port}`)
})