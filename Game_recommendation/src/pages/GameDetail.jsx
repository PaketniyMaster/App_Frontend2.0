import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../services/auth";
import { useDispatch } from "react-redux";
import { setQuery, setFilters, setResults } from "../features/search/searchSlice";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [game, setGame] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const { t } = useTranslation();

  useEffect(() => {
    const fetchGame = async () => {
      const token = getToken();
      if (!id || !token) return;

      try {
        const response = await fetch(`${API_URL}/games/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Ошибка загрузки данных: ${response.status}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Ошибка загрузки игры:", error);
      }
    };

    fetchGame();
  }, [id]);

  const handleBack = () => {
    const searchState = localStorage.getItem("searchState");
    if (searchState) {
      const { query, filters, results } = JSON.parse(searchState);
      dispatch(setQuery(query));
      dispatch(setFilters(filters));
      dispatch(setResults(results));
    }
    navigate("/", { replace: true });
  };

  if (!game) return <p className="text-white">{t("game_detail.loading")}...</p>;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <BackButton onClick={handleBack} />

      <div className="w-full h-64 md:h-96 overflow-hidden">
        {game?.image_url && (
          <img
            src={game.image_url}
            alt={game.name || t("game_detail.game")}
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

        <p className="text-lg mb-2">
          {t("game_detail.releaseDate")}: {game.release_date ? new Date(game.release_date).toLocaleDateString() : t("game_detail.unknown")}
        </p>

        <p className="text-lg mb-2">{t("game_detail.rating")}: {game.rating ?? t("game_detail.noData")}</p>

        <p className="text-lg mb-4">
          {t("game_detail.russianLanguage")}: {game.russian_supported ? t("game_detail.supported") : t("game_detail.notSupported")}
        </p>

        {game.tags.length > 0 && (
          <div className="mb-6">
            <p className="text-lg mb-2">{t("tags")}:</p>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <a
          href={game.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white text-lg"
        >
          🔗 {t("game_detail.openInSteam")}
        </a>
      </div>
    </div>
  );
}

export default GameDetail;
