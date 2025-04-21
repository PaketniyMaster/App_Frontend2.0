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
  const { t, i18n } = useTranslation();

  const language = i18n.language || "en";

  useEffect(() => {
    const fetchGame = async () => {
      const token = getToken();
      if (!id || !token) return;

      try {
        const response = await fetch(`${API_URL}/games/${id}?lang=${language}`, {
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
  }, [id, language]);

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
      <div className="fixed top-0 left-0 m-4 z-10">
        <BackButton onClick={handleBack} />
      </div>

      <div className="w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
        {game?.image_url && (
          <img
            src={game.image_url}
            alt={game.name || t("game_detail.game")}
            crossOrigin="anonymous"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-6 md:p-10">
        <h1 className="text-4xl font-extrabold text-gradient mb-4">{game.name}</h1>

        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">
            {t("game_detail.releaseDate")}: {game.release_date ? new Date(game.release_date).toLocaleDateString() : t("game_detail.unknown")}
          </p>
          <p className="text-lg mb-4">
            <span className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-lg inline-block">
              {t("game_detail.rating")}: {game.rating ?? t("game_detail.noData")}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-lg mb-2">
            {t("game_detail.russianLanguage")}: {game.russian_supported ? t("game_detail.supported") : t("game_detail.notSupported")}
          </p>

          {game.tags.length > 0 && (
            <div className="mb-6">
              <p className="text-lg mb-2">{t("game_detail.tags")}:</p>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition-transform transform hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.description && (
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">{t("game_detail.description")}:</p>
              <p className="text-lg text-gray-300">{game.description}</p>
            </div>
          )}

          {game.summary && (
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">{t("game_detail.summary")}:</p>
              <p className="text-lg text-gray-200 whitespace-pre-line">{game.summary}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-600 hover:bg-gray-700 transition px-6 py-3 rounded-lg text-white text-lg shadow-lg transform hover:scale-105"
          >
            🔗 {t("game_detail.openInSteam")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
