import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function HomePage() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const handleSearch = async () => {
        if (!search.trim()) return;
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/games/search?query=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error("Ошибка поиска:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 px-4">
            {/* Шапка */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 shadow-md">
                <div className="flex-1"></div>

                {/* Поиск */}
                <div className="flex-1 flex justify-center">
                    <input
                        type="text"
                        placeholder="Поиск игр..."
                        className="w-full max-w-sm p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleSearch}
                    >
                        Поиск
                    </button>
                </div>

                <div className="flex-1 flex justify-end space-x-4">
                    {user && <span className="text-sm md:text-lg">Привет, {user.username}!</span>}
                    {user ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                            Выйти
                        </button>
                    ) : (
                        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/login">
                            Войти
                        </Link>
                    )}
                </div>
            </header>

            {/* Результаты поиска */}
            <div className="mt-6 w-full max-w-md">
                {games.length > 0 ? (
                    games.map((game, index) => (
                        <div key={index} className="flex items-center bg-gray-800 p-3 rounded-lg mb-3 shadow">
                            <img
                                src={game.image_url}
                                alt={game.name}
                                className="w-16 h-16 rounded-lg object-cover mr-3"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{game.name}</h3>
                                <p className="text-gray-400 text-sm">
                                    Дата выхода: {game.release_date || "Неизвестно"}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Русский язык: {game.russian_supported ? "✅ Да" : "❌ Нет"}
                                </p>
                                <p className="text-gray-400 text-sm">Оценка: {game.rating || "Нет данных"}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    search && <p className="text-gray-400">Игры не найдены</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
