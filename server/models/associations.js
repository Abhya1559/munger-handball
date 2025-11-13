import Player from "../models/players.models.js";
import Team from "../models/teams.models.js";

Team.hasMany(Player, {
  foreignKey: "teamId",
  as: "players",
  onDelete: "CASCADE",
});
Player.belongsTo(Team, {
  foreignKey: "teamId",
  as: "team",
});

export { Player, Team };
