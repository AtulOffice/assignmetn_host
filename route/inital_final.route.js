import express from "express";
import {
  savefinal,
  saveinital,
} from "../controller/Initial_final.controller.js";
import authenticateToken from "../controller/auth.js";

export const infinalRouter = express.Router();

infinalRouter.post("/encrypt", authenticateToken, saveinital);
infinalRouter.post("/decrypt", authenticateToken, savefinal);
