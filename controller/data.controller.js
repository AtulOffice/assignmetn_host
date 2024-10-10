import userModel from "../model/user_data.model.js";
import addrsModel from "../model/address_data.model.js";

export const datasave = async (req, res) => {
  try {
    const {
      Name,
      Email,
      Age,
      Address: { Street, City, Zip },
    } = req.body;

    const address = await addrsModel.create({
      Address: {
        Street,
        City,
        Zip,
      },
    });

    const user = await userModel.create({
      Name,
      Email,
      Age,
      AddressId: address._id,
    });

    return res.status(201).json({
      success: true,
      message: "Data saved successfully",
      user,
      address,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving data",
      error: error.message,
    });
  }
};

export const addrssave = async (req, res) => {
  try {
    const { Street, City, Zip } = req.body;

    const address = await addrsModel.create({
      Address: {
        Street,
        City,
        Zip,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Data saved successfully",
      address,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving data",
      error: error.message,
    });
  }
};

export const finddata = async (req, res) => {
  try {
    const users = await userModel.find().populate("AddressId");
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users found successfully",
      users,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({
      success: false,
      message: "Error finding user",
      error: error.message,
    });
  }
};

export const findaddrss = async (req, res, next) => {
  try {
    const address = await addrsModel.findById(req.params.id);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address found successfully",
      address,
    });
  } catch (error) {
    console.error("Error finding address:", error);
    return res.status(500).json({
      success: false,
      message: "Error finding address",
      error: error.message,
    });
  }
};
export const findaddrssbyquery = async (req, res, next) => {
  try {
    // http://localhost:9000/api/v1//findaddressbyquery?add=66f132fedf65d0ff823b3a09&val=45
    const { add, val } = req.query;
    const address = await addrsModel.findById(add);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address found successfully",
      address,
    });
  } catch (error) {
    console.error("Error finding address:", error);
    return res.status(500).json({
      success: false,
      message: "Error finding address",
      error: error.message,
    });
  }
};

export const updateAddresses = async (req, res) => {
  try {
    const { Street, City, Zip } = req.body;
    const address = await addrsModel.findByIdAndUpdate(
      req.params.id,
      {
        Address: { City, Street, Zip },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Addresses updated successfully",
      address,
    });
  } catch (error) {
    console.error("Error updating addresses:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating addresses",
      error: error.message,
    });
  }
};

export const deleteAddresses = async (req, res) => {
  try {
    await addrsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Addresses deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting addresses:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting addresses",
      error: error.message,
    });
  }
};

export const SearchMovie = async (req, res) => {
  const { query } = req.query;
  try {
    const movie = await Movie.find({
      $or: [{ _id: query }, { title: { $regex: query, $options: "i" } }],
    });

    if (!movie || movie.length === 0) {
      return res.status(400).json({ message: "Movie not found" });
    }

    return res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
