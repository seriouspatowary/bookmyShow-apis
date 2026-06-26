import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";


const app = express();

app.use(cors({
  origin: ["https://myshowapp.vercel.app","http://localhost:3000"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;