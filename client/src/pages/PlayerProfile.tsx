import { useContext, useEffect, useState } from "react";
import { getPlayer } from "../services/playerServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Player {
  id: number;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  position?: string;
}
export default function PlayerProfile() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoadingAuth, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }
    if (!isLoggedIn || !user || typeof user.id === "undefined") {
      setError("user session is invalid");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const loggedInPlayer = user.id;
    const fetchPlayerData = async () => {
      setError(null);
      try {
        const playerData = await getPlayer(loggedInPlayer);
        // console.log(playerData);
        setPlayer(playerData.player);
      } catch (error) {
        console.log(error);
        setError("Api not fetching");
      }
    };
    fetchPlayerData();
  }, [isLoadingAuth, isLoggedIn, user]);
  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <h1>Checking authentication status...</h1>
      </div>
    );
  }
  // Display specific errors
  if (error) {
    return (
      <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 text-center mx-auto my-10 max-w-lg">
        <h1 className="font-bold text-xl">🚫 Access Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Display content loading state after auth is confirmed and before fetch resolves
  if (!player) {
    return (
      <div className="p-6 text-center text-blue-600 my-10">
        <h1>Fetching Profile...</h1>
      </div>
    );
  }
  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
        {player.name}'s Profile
      </h2>
      <ul className="space-y-4 text-gray-700">
        <li className="flex justify-between items-center pb-2 border-b border-dashed">
          <span className="font-semibold text-gray-500">Player ID:</span>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
            {player.id}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-semibold">Email:</span>
          <span className="text-right">{player.email}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-semibold">Phone:</span>
          <span className="text-right">{player.phone || "N/A"}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-semibold">Age:</span>
          <span className="text-right">{player.age || "N/A"}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-semibold">Gender:</span>
          <span className="text-right">{player.gender || "N/A"}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-semibold">Position:</span>
          <span className="text-right">{player.position || "N/A"}</span>
        </li>
      </ul>
    </div>
  );
}
