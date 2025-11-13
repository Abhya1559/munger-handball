import Team from "../models/teams.models.js";
import Player from "../models/players.models.js";

export const createTeam = async (req, res) => {
  try {
    const { teamName, coachName, city, players } = req.body;
    if (!teamName || !coachName || !city || !players) {
      return res.status(404).json({ message: "all fields are required" });
    }
    const newTeam = await Team.create(
      {
        teamName,
        coachName,
        city,
        players,
      },
      {
        include: [{ model: Player, as: "players" }],
      }
    );
    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id, {
      include: [{ model: Player, as: "players" }],
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
