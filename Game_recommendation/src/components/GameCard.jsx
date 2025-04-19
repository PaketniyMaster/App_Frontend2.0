import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getRatingColor = (rating) => {
    if (rating === null || rating === undefined) return "bg-gray-600";
    if (rating >= 80) return "bg-green-500";
    if (rating >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      onClick={() => navigate(`/game/${game.game_id}`)}
      className="cursor-pointer flex items-center bg-gray-800 p-3 rounded-lg mb-3 shadow relative"
    >
      <img
        src={game.image_url}
        alt={game.name}
        className="w-16 h-16 rounded-lg object-cover mr-3"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{game.name}</h3>
        <p className="text-gray-400 text-sm">
          {t("game.release_date")}: {game.release_date || t("game.unknown")}
        </p>
      </div>
      <div
        className={`w-8 h-8 ${getRatingColor(game.rating)} rounded-full flex items-center justify-center text-white font-bold`}
      >
        {game.rating ? Math.round(game.rating) : "?"}
      </div>
    </div>
  );
}
