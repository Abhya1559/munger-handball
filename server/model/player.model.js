import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    position: {
      type: String,
      required: true,
      enum: [
        "Goalkeeper",
        "Left Wing",
        "Right Wing",
        "Right Forward",
        "Left Forward",
        "Center",
        "Pivot",
      ],
    },

    address: {
      house: {
        type: String,
        required: true,
      },
      mohalla: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },
    },

    aadhar: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{12}$/, "Aadhar must be exactly 12 digits"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

const Player = mongoose.model("Player", playerSchema);
export default Player;
