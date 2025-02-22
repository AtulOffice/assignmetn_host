import cryptoJS from "crypto-js";
import Initial from "../model/initial.model.js";
import Final from "../model/final.model.js";



export const EncodeData = async (req, res) => {
  try {
    const {
      vatCode,
      unitCode,
      date,
      time,
      bl,
      length,
      process,
      upDown,
      requestId,
    } = req.body;
    let data;
    if (process === "I") {
      data = {
        vatCode,
        unitCode,
        date,
        time,
        bl,
        length,
        process,
        upDown,
        requestId: `${vatCode}/${unitCode}/${process}/${length}`,
      };
    } else if (process === "F" && requestId) {
      data = req.body;
    } else {
      return res.status(404).json({
        success: false,
        message: "Invalid process type or missing requestId",
      });
    }

    const encdata = cryptoJS.AES.encrypt(
      JSON.stringify(data),
      "dkfjakdfjdaljfajdfkjak"
    ).toString();

    return res.status(200).json({
      success: true,
      message:
        process === "I" ? "Initial data Encrypted" : "Final data Encrypted",
      content: { encdata },
    });
  } catch (err) {
    console.error("Error saving data:", err);
    return res.status(500).json({
      success: false,
      message: "Error encrypting data",
      error: err.message,
    });
  }
};

export const saveData = async (req, res) => {
  try {
    const encdata = req.body[0]?.encdata;
    if (!encdata) {
      return res.status(400).json({
        success: false,
        message: "No encrypted data provided",
      });
    }
    let val;
    try {
      val = cryptoJS.AES.decrypt(encdata, "dkfjakdfjdaljfajdfkjak");
      const data = JSON.parse(val.toString(cryptoJS.enc.Utf8));

      if (!data) {
        return res.status(400).json({
          success: false,
          message: "Invalid encrypted data",
        });
      }
      if (data.process === "I" && data.requestId) {
        const {
          vatCode,
          unitCode,
          date,
          time,
          bl,
          length,
          process,
          upDown,
          requestId,
        } = data;
        const Indata = await Initial.create({
          vatCode,
          unitCode,
          date,
          time,
          bl,
          length,
          process,
          upDown,
        });
        return res.status(200).json({
          success: true,
          message: "Initial data saved",
          data: { RequestId: requestId },
        });
      } else if (data.process === "F" && data.requestId) {
        const {
          vatCode,
          unitCode,
          date,
          time,
          bl,
          length,
          process,
          upDown,
          requestId,
        } = data;
        const findata = await Final.create({
          vatCode,
          unitCode,
          date,
          time,
          bl,
          length,
          process,
          upDown,
          requestId: requestId,
        });
        return res.status(200).json({
          success: true,
          message: "Final data saved",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid process type or missing parameters",
        });
      }
    } catch (decryptionError) {
      console.error("Error during decryption:", decryptionError);
      return res.status(400).json({
        success: false,
        message: "Failed to decrypt data",
      });
    }
  } catch (err) {
    console.log("Error saving data:", err);
    return res.status(500).json({
      success: false,
      message: "Error saving data",
      error: err.message,
    });
  }
};

// export const saveData = async (req, res) => {
//   try {
//     const encdata = req.body[0]?.encdata;
//     if (!encdata) {
//       return res.status(400).json({
//         success: false,
//         message: "No encrypted data provided",
//       });
//     }
//     const val = cryptoJS.AES.decrypt(encdata, "dkfjakdfjdaljfajdfkjak");
//     const data = JSON.parse(val.toString(cryptoJS.enc.Utf8));
//     if (!data) {
//       return res.status(400).json({
//         success: false,
//         message: "invalid encrypted data",
//       });
//     }
//     if (data.process && data.process === "I" && data.requestId) {
//       const {
//         vatCode,
//         unitCode,
//         date,
//         time,
//         bl,
//         length,
//         process,
//         upDown,
//         requestId,
//       } = data;
//       const Indata = await Initial.create({
//         vatCode,
//         unitCode,
//         date,
//         time,
//         bl,
//         length,
//         process,
//         upDown,
//       });
//       return res.status(200).json({
//         success: true,
//         message: "Initial data saved",
//         data: {
//           requestId: requestId,
//         },
//       });
//     } else if (data.process && data.process === "F" && data.requestId) {
//       const {
//         vatCode,
//         unitCode,
//         date,
//         time,
//         bl,
//         length,
//         process,
//         upDown,
//         requestId,
//       } = data;
//       const findata = await Final.create({
//         vatCode,
//         unitCode,
//         date,
//         time,
//         bl,
//         length,
//         process,
//         upDown,
//         requestId: requestId,
//       });
//       return res.status(200).json({
//         success: true,
//         message: "Final data saved",
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid process type or missing parameters",
//       });
//     }
//   } catch (err) {
//     console.error("Error saving initial data:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving initial data",
//       error: err.message,
//     });
//   }
// };
