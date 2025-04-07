import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import GameCard from "../components/GameCard";
import { getToken, removeToken, searchGames, fetchUserProfile } from "../services/auth";
import Search from "../components/Search";


function HomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [randomGif, setRandomGif] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const lastSearchTime = useRef(0);

  const gifs = [
    "https://giphy.com/embed/dSeTdOmmA1u8e0LBsx",
    "https://giphy.com/embed/3oKIPznTgmcQGOlqyA",
    "https://giphy.com/embed/zaCojXv2S01zy",
    "https://giphy.com/embed/l4FGIgsVPdoRd2wbS",
    "https://giphy.com/embed/Sr9NHwRKlsD3unMK43",
  ];

  useEffect(() => {
    const loadUser = async () => {
        if (getToken()) {
            try {
                const profile = await fetchUserProfile();
                if (!profile) {
                    setUser(null);
                    setGames([]);
                    localStorage.clear();
                } else {
                    setUser(profile);
                }
            } catch {
                removeToken();
                localStorage.clear();
            }
        }
        setIsLoading(false);
    };
    loadUser();
}, []);

  useEffect(() => {
    if (!isLoading) {
      const savedSearch = location.state || JSON.parse(localStorage.getItem("searchState"));
      if (savedSearch?.results) {
        setGames(savedSearch.results);
      }
    }
  }, [location, isLoading]);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setGames([]);
    localStorage.removeItem("searchState");
    navigate("/login");
  };

  const handleSearch = async (filters) => {
    if (isLoading) return;

    if (!user) {
      setErrorMessage("Пожалуйста, войдите, чтобы использовать поиск");
      setRandomGif(gifs[Math.floor(Math.random() * gifs.length)]);
      return;
    }

    if (Date.now() - lastSearchTime.current < 2000) return;
    lastSearchTime.current = Date.now();

    try {
      const results = await searchGames(filters);
      setGames(results);
      localStorage.setItem("searchState", JSON.stringify({ query: filters.query, results }));
    } catch (error) {
      setErrorMessage("Ошибка при поиске игр.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 px-4">
      <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 shadow-md z-20">
        <Search onSearch={handleSearch} />
        <div className="flex items-center space-x-4">
          {user && <span className="hidden sm:inline text-sm md:text-lg">Привет, {user.username}!</span>}
          {user ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <Link className="bg-blue-500 text-white px-2 py-2 rounded-lg w-[60px] sm:w-auto" to="/login">
              Войти
            </Link>
          )}
        </div>
      </header>

      {errorMessage && (
        <div className="text-center mt-4">
          <p className="text-red-400">{errorMessage}</p>
          {randomGif && (
            <iframe
              src={randomGif}
              width="480"
              height="360"
              frameBorder="0"
              allowFullScreen
              title="Random GIF"
            />
          )}
        </div>
      )}

      <div className="mt-6 w-full max-w-md z-10">
        {games.length > 0 ? (
          games.map((game) => <GameCard key={game.game_id} game={game} />)
        ) : (
          user && <p className="text-gray-400">Игры не найдены</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
