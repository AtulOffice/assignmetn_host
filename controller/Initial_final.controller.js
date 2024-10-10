// import Initial from "../model/initial model.js";
// import Final from "../model/final.model.js";
import cryptoJS from "crypto-js";

export const saveinital = async (req, res) => {
  try {
    const { vatCode, unitCode, date, time, bl, length, process, upDown } =
      req.body;
    if (process == "I") {
      var encdata = cryptoJS.AES.encrypt(
        JSON.stringify(req.body),
        "dkfjakdfjdaljfajdfkjak"
      ).toString();
      return res
        .status(200)
        .json({ success: true, message: "Initial data saved", encdata });
    }
  } catch (err) {
    console.error("Error saving initial data:", err);
    return res.status(500).json({
      success: false,
      message: "Error saving initial data",
      error: err.message,
    });
  }
};

export const savefinal = async (req, res) => {
  console.log("helo");
  return;
};
