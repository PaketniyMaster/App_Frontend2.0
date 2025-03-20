import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, removeToken, searchGames, fetchUserProfile } from "../services/auth";

function HomePage() {
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const profile = await fetchUserProfile();
            setUser(profile);
        };

        if (getToken()) loadUser();
    }, []);

    const handleLogout = () => {
        removeToken();
        setUser(null);
        navigate("/login");
    };

    const handleSearch = async () => {
        if (!search.trim()) return;
        const results = await searchGames(search);
        setGames(results);
        localStorage.setItem("searchState", JSON.stringify({ query: search, results }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 px-4">
            <header className="fixed top-0 left-0 w-full flex items-center justify-between p-2 bg-gray-800 shadow-md space-x-2">
                <div className="flex-1 flex justify-center">
                    <input
                        type="text"
                        placeholder="Поиск игр..."
                        className="p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 w-full sm:max-w-md lg:max-w-lg"
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
                <div className="flex items-center space-x-2">
                    {user && <span className="hidden sm:inline text-sm md:text-lg">Привет, {user.username}!</span>}
                    {user ? (
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={handleLogout}
                        >
                            Выйти
                        </button>
                    ) : (
                        <Link
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            to="/login"
                        >
                            Войти
                        </Link>
                    )}
                </div>
            </header>

            <div className="mt-6 w-full max-w-md">
                {games.length > 0 ? (
                    games.map((game) => (
                        <div
                            key={game.game_id}
                            onClick={() => navigate(`/game/${game.game_id}`)}
                            className="cursor-pointer flex items-center bg-gray-800 p-3 rounded-lg mb-3 shadow"
                        >
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
