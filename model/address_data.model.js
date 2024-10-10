import mongoose from "mongoose";

const addressschema = new mongoose.Schema({
  Address: {
    Street: String,
    City: String,
    Zip: Number,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const addrsModel = mongoose.model("ADDRESS", addressschema);

export default addrsModel;
