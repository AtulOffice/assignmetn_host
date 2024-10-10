import express from "express";
import {
  datasave,
  findaddrss,
  finddata,
  updateAddresses,
  deleteAddresses,
  findaddrssbyquery,
  addrssave,
} from "../controller/data.controller.js";

export const datarouter = express.Router();

datarouter.post("/save", datasave);
datarouter.post("/addsave", addrssave);
datarouter.get("/find", finddata);
datarouter.put("/update/:id", updateAddresses);
datarouter.get("/findaddress/:id", findaddrss);
datarouter.get("/findaddressbyquery", findaddrssbyquery);
datarouter.delete("/deletedata/:id", deleteAddresses);
