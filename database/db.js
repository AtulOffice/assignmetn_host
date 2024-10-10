import mongoose from "mongoose";

export const CONNECTION = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log("database connection established");
  } catch (e) {
    console.log(e);
  }
};
