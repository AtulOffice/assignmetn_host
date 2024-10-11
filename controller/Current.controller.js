import Current from "../model/current.model.js";
import cryptoJS from "crypto-js";

export const EncodeCurr = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }
    var encdata = cryptoJS.AES.encrypt(
      JSON.stringify(data),
      "dkfjakdfjdaljfajdfkjak"
    ).toString();
    return res.status(200).json({
      success: true,
      message: "data encryptd successfully",
      content: { encdata },
      // Initialval: req.body,
    });
  } catch (err) {
    console.error("Error saving initial data:", err);
    return res.status(500).json({
      success: false,
      message: "Error saving initial data",
      error: err.message,
    });
  }
};

export const savecurr = async (req, res) => {
  try {
    const encdata = req.body[0]?.encdata;
    if (!encdata) {
      return res.status(400).json({
        success: false,
        message: "No encrypted data provided",
      });
    }
    const decdata = cryptoJS.AES.decrypt(encdata, "dkfjakdfjdaljfajdfkjak");
    const reldata = JSON.parse(decdata.toString(cryptoJS.enc.Utf8));
    console.log(reldata);
    return;
    try {
      await Current.create(reldata);
      return res
        .status(200)
        .json({ success: true, message: "data saved successfully" });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Error saving data to database",
        error: error,
      });
    }
  } catch (error) {
    console.error("Error saving encrypted data:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving encrypted data",
      error: error.message,
    });
  }
};
