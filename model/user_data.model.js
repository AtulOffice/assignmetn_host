import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Age: {
    type: Number,
    required: false,
  },
  AddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ADDRESS",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("USER", userschema);

export default userModel;
