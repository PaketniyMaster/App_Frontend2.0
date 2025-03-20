import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../services/auth";

function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
        navigate("/", { state: searchState ? JSON.parse(searchState) : {} });
    };

    if (!game) return <p className="text-white">Загрузка...</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
                {game?.image_url && (
                    <img
                        src={game.image_url}
                        alt={game.name || "Игра"}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-start p-4">
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={handleBack}
                    >
                        ⬅️ Назад
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-8">
                <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

                <p className="text-lg mb-2">
                    Дата выхода: {game.release_date ? new Date(game.release_date).toLocaleDateString() : "Неизвестно"}
                </p>

                <p className="text-lg mb-2">Рейтинг: {game.rating ?? "Нет данных"}</p>

                <p className="text-lg mb-4">Русский язык: {game.russian_supported ? "Поддерживается" : "Не поддерживается"}</p>

                {game.tags.length > 0 && (
                    <div className="mb-6">
                        <p className="text-lg mb-2">Теги:</p>
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
                    🔗 Открыть в Steam
                </a>
            </div>
        </div>
    );
}

export default GameDetail;
