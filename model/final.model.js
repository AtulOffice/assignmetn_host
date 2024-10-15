import mongoose from "mongoose";

const vatSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
  },
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

const Final = mongoose.model("Final", vatSchema);

export default Final;
