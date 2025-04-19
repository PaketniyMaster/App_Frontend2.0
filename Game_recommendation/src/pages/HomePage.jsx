import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import GameCard from "../components/GameCard";
import Search from "../components/Search";
import { getToken, removeToken, searchGames, fetchUserProfile } from "../services/auth";
import {
  setQuery,
  setTag,
  setMinRating,
  setMaxRating,
  setResults,
} from "../features/search/searchSlice";

function HomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [randomGif, setRandomGif] = useState("");
  const lastSearchTime = useRef(0);
  const [hasSearched, setHasSearched] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const query = useSelector((state) => state.search.query);
  const filters = useSelector((state) => state.search.filters);
  const results = useSelector((state) => state.search.results);

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
          setUser(profile || null);
        } catch {
          removeToken();
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    dispatch(setResults([]));
    navigate("/login");
  };

  const handleSearch = async () => {
    if (isLoading || !user) {
      if (!isLoading && !user) {
        setErrorMessage(t("please_login"));
        setRandomGif(gifs[Math.floor(Math.random() * gifs.length)]);
      }
      return;
    }

    if (Date.now() - lastSearchTime.current < 2000 || isLoading) return;
    lastSearchTime.current = Date.now();

    const appliedFilters = {
      query,
      tags: filters.tags,
      min_rating: filters.min_rating !== "" ? parseFloat(filters.min_rating) : null,
      max_rating: filters.max_rating !== "" ? parseFloat(filters.max_rating) : null,
    };
    setHasSearched(true);

    try {
      const data = await searchGames(appliedFilters);
      dispatch(setResults(data));
    } catch {
      setErrorMessage(t("search_error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-16 px-4">
      <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 shadow-md z-20">
        <Search onSearch={handleSearch} />
        <div className="flex items-center space-x-4">
          {user && <span className="hidden sm:inline text-sm md:text-lg">{t("hello_user", { username: user.username })}</span>}
          {user ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
              {t("logout")}
            </button>
          ) : (
            <Link className="bg-blue-500 text-white px-2 py-2 rounded-lg w-[60px] sm:w-auto" to="/login">
              {t("home.login")}
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
        {results.length > 0 ? (
          [...results]
            .sort((a, b) => {
              const aHasRating = a.rating !== null && a.rating !== undefined;
              const bHasRating = b.rating !== null && b.rating !== undefined;

              if (aHasRating && !bHasRating) return -1;
              if (!aHasRating && bHasRating) return 1;
              if (!aHasRating && !bHasRating) return 0;

              return b.rating - a.rating;
            })
            .map((game) => <GameCard key={game.game_id} game={game} />)
        ) : (
          user && hasSearched && <p className="text-gray-400">{t("no_games_found")}</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
