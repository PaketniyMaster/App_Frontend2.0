import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";

export default function GameSearch({ onSearch }) {
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    tags: "",
    min_rating: "",
    max_rating: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const lastSearchTime = useRef(0);

  const handleSearch = async () => {
    if (Date.now() - lastSearchTime.current < 2000 || isLoading) return;
    lastSearchTime.current = Date.now();
    setIsLoading(true);

    const appliedFilters = {
      query,
      tags: filters.tags,
      min_rating: filters.min_rating ? parseFloat(filters.min_rating) : null,
      max_rating: filters.max_rating ? parseFloat(filters.max_rating) : null,
    };

    try {
      await onSearch(appliedFilters);
      localStorage.setItem("searchState", JSON.stringify(appliedFilters));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedSearch = location.state || JSON.parse(localStorage.getItem("searchState"));
    if (savedSearch) {
      setQuery(savedSearch.query || "");
      setFilters({
        tags: savedSearch.tags || "",
        min_rating: savedSearch.min_rating ? String(savedSearch.min_rating) : "",
        max_rating: savedSearch.max_rating ? String(savedSearch.max_rating) : "",
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-2 w-full max-w-3xl px-4 ">
        <input
          type="text"
          placeholder="Введите название игры"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
          disabled={isLoading}
          className={`px-2 py-2 rounded-xl w-[60px] sm:w-auto ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isLoading ? "Поиск..." : "Поиск"}
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
              <label className="block mb-1 text-sm">Рейтинг (мин):</label>
              <input
                type="number"
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.min_rating}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    min_rating: e.target.value,
                  })
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
                  setFilters({
                    ...filters,
                    max_rating: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`mt-4 w-full py-2 rounded-xl ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {isLoading ? "Применение..." : "Применить фильтры"}
          </button>
        </div>
      )}
    </div>
  );
}
