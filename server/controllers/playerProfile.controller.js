import Player from "../model/player.model.js";

export const profile = async (req, res) => {
  try {
    const player = await Player.findById(req.user.id);
    if (!player) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      player: {
        name: player.name,
        email: player.email,
        aadhar: player.aadhar,
        address: {
          house: player.address.house,
          mohhala: player.address.mohalla,
          landmark: player.address.landmark,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
