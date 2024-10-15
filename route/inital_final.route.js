import express from "express";
import {
  EncodeData,
  saveData,
} from "../controller/Initial_final.controller.js";
import authenticateToken from "../controller/auth.js";

export const infinalRouter = express.Router();

infinalRouter.post("/encrypt", authenticateToken, EncodeData);
infinalRouter.post("/decrypt", authenticateToken, saveData);
