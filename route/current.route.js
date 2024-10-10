import express from "express";

import authenticateToken from "../controller/auth.js";
import { EncodeCurr, savecurr } from "../controller/Current.controller.js";

export const CurrentRouter = express.Router();

CurrentRouter.post("/currencrypt", authenticateToken, EncodeCurr);
CurrentRouter.post("/currdecrypt", authenticateToken, savecurr);
