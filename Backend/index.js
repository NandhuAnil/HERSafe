import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import authRoutes from './routers/auth.routes.js';
import userRoutes from './routers/user.routes.js';
import chatbotRoutes from './routers/chatbot.routes.js';
import sosRoutes from './routers/sos.routes.js';
import contactRoutes from './routers/contact.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:8081", // Expo web
      "exp://192.168.43.123:8081", // Expo Go app URL
      "http://192.168.43.123:8081" // Local network IP address
    ],
    credentials: true, // Allow cookies and headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use('/api/chatbot', chatbotRoutes);

app.use('/api/sos', sosRoutes);

app.use('/api', contactRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});
