import mongoose from "mongoose";

const vatSchema = new mongoose.Schema({
  vatCode: {
    type: String,
    required: true,
  },
  unitCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  bl: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  process: {
    type: String,
    enum: ["F", "I"],
    required: true,
  },
  upDown: {
    type: String,
    required: true,
    enum: ["UP", "DOWN"],
  },
});

const Initial = mongoose.model("INITIAL", vatSchema);

export default Initial;
