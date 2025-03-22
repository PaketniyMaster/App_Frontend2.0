import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";

export default function GameSearch({ onSearch }) {
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    tags: "",
    date: "",
    min_rating: "",
    max_rating: "",
  });

  const lastSearchTime = useRef(0);
  const isInitialRender = useRef(true);

  const handleSearch = () => {
    if (Date.now() - lastSearchTime.current < 2000) {
      console.log("Пропуск из-за частоты запросов");
      return;
    }
    lastSearchTime.current = Date.now();
    const appliedFilters = { query, ...filters };
    onSearch(appliedFilters);
    localStorage.setItem("searchState", JSON.stringify(appliedFilters));
  };

  useEffect(() => {
    const savedState = localStorage.getItem("searchState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setQuery(parsedState.query || "");
      setFilters({
        tags: parsedState.tags || "",
        date: parsedState.date || "",
        min_rating: parsedState.min_rating || "",
        max_rating: parsedState.max_rating || "",
      });
      if (parsedState.query && isInitialRender.current) {
        isInitialRender.current = false;
        onSearch(parsedState);
      }
    }
  }, [onSearch]);
  

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-2 w-full max-w-3xl px-4">
        <input
          type="text"
          placeholder="Введите название игры"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 w-full bg-gray-800 rounded-xl text-white placeholder-gray-300 focus:outline-none border-2 border-blue-500 focus:ring-4 focus:ring-blue-600 shadow-lg"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 rounded-xl hover:bg-gray-700 sm:px-4"
        >
          <FaFilter />
          <span className="hidden sm:inline">Фильтры</span>
        </button>
        <button
          onClick={handleSearch}
          className="px-2 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 w-[60px] sm:w-auto"
        >
          Поиск
        </button>
      </div>


      {showFilters && (
        <div className="w-full max-w-3xl px-4 mt-4 bg-gray-800 p-4 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Жанры:</label>
              <select
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.tags}
                onChange={(e) =>
                  setFilters({ ...filters, tags: e.target.value })
                }
              >
                <option value="">Все</option>
                <option>Action</option>
                <option>RPG</option>
                <option>Strategy</option>
                <option>Adventure</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Дата:</label>
              <input
                type="date"
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Рейтинг (мин):</label>
              <input
                type="number"
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.min_rating}
                onChange={(e) =>
                  setFilters({ ...filters, min_rating: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Рейтинг (макс):</label>
              <input
                type="number"
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.max_rating}
                onChange={(e) =>
                  setFilters({ ...filters, max_rating: e.target.value })
                }
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 w-full bg-blue-600 py-2 rounded-xl hover:bg-blue-500"
          >
            Применить фильтры
          </button>
        </div>
      )}
    </div>
  );
}
