import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setTag,
  setMinRating,
  setMaxRating,
  setSearchDescription,
} from "../features/search/searchSlice";
import { FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function GameSearch({ onSearch }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const query = useSelector((state) => state.search.query);
  const filters = useSelector((state) => state.search.filters);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lastSearchTime = useRef(0);

  const handleSearch = async () => {
    if (Date.now() - lastSearchTime.current < 2000 || isLoading) return;
    lastSearchTime.current = Date.now();
    setIsLoading(true);

    const appliedFilters = {
      query,
      tags: filters.tags,
      min_rating:
        filters.min_rating !== "" ? parseFloat(filters.min_rating) : null,
      max_rating:
        filters.max_rating !== "" ? parseFloat(filters.max_rating) : null,
      searchDescription: filters.searchDescription, // добавляем флаг поиска по описанию
    };

    try {
      await onSearch(appliedFilters);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query && typeof onSearch === "function") {
      handleSearch();
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-2 w-full max-w-3xl px-4">
        <input
          type="text"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="p-3 w-full bg-gray-800 rounded-xl text-white placeholder-gray-300 focus:outline-none border-2 border-blue-500 focus:ring-4 focus:ring-blue-600 shadow-lg"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 rounded-xl hover:bg-gray-700 sm:px-4"
        >
          <FaFilter />
          <span className="hidden sm:inline">{t("search.filters")}</span>
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
          {isLoading ? t("search.searching") : t("search.search")}
        </button>
      </div>

      {showFilters && (
        <div className="w-full max-w-3xl px-4 mt-4 bg-gray-800 p-4 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">{t("search.genre")}:</label>
              <select
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.tags}
                onChange={(e) => dispatch(setTag(e.target.value))}
              >
                <option value="">All</option>
                <option>Action</option>
                <option>RPG</option>
                <option>Strategy</option>
                <option>Adventure</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">{t("search.min_rating")}:</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.min_rating}
                onChange={(e) => dispatch(setMinRating(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">{t("search.max_rating")}:</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full p-2 bg-gray-700 rounded-xl"
                value={filters.max_rating}
                onChange={(e) => dispatch(setMaxRating(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">{t("search.search_in_description")}:</label>
              <input
                type="checkbox"
                checked={filters.searchDescription}
                onChange={(e) => dispatch(setSearchDescription(e.target.checked))}
                className="w-full p-2 bg-gray-700 rounded-xl"
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
            {isLoading ? t("search.applying") : t("search.apply")}
          </button>
        </div>
      )}
    </div>
  );
}
