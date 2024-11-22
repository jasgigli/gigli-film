"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "e71be147c413550ec91b8565d8253a6b";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);
    setSearchResults([]);
    setError("");

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`
      );
      setSearchResults(response.data.results);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 my-8 bg-gradient-to-r from-[#1c1b29] via-[#20212b] to-[#16161e] text-white">
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          🔍 Search Movies
        </h1>

        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row justify-center mb-6"
        >
          <input
            type="text"
            className="px-4 py-2 w-full sm:w-80  rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 mb-4 sm:mb-0 sm:mr-4"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
          >
            Search
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {/* Search Results */}
        {isLoading ? (
          <div className="flex justify-center">
            <p className="text-white text-lg">Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-lg mb-4 w-full"
                />
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-gray-300">{movie.release_date}</p>
                <Link
                  href={`/movie/${movie.id}`}
                  className="text-purple-500 hover:text-purple-700 hover:underline mt-2 block text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">
            No movies found for "{query}".
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
