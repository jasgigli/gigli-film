"use client";
import React, { useEffect, useState } from "react";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Load watchlist from localStorage when the page is loaded
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const handleRemoveFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const handleClearWatchlist = () => {
    setWatchlist([]);
    localStorage.removeItem("watchlist");
  };

  // Generate placeholders when the watchlist is empty
  const placeholderCards = Array(4).fill(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1b29] via-[#20212b] to-[#16161e] flex items-center justify-center">
      <div className="container mx-auto p-6 md:p-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Your Watchlist</h1>
        <p className="text-xl mb-6">
          Here's a list of movies you're planning to watch. Enjoy browsing!
        </p>

        <button
          onClick={handleClearWatchlist}
          className="px-6 py-3 bg-red-500 text-white rounded-lg mb-6 hover:bg-red-600 transition duration-300"
        >
          Clear Watchlist
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {/* If watchlist is empty, show 4 empty cards */}
          {watchlist.length === 0
            ? placeholderCards.map((_, index) => (
                <div
                  key={index}
                  className="relative bg-gray-700 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="w-full h-72 bg-gray-600 animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 text-white">
                    <h3 className="text-lg font-semibold bg-gray-700 w-3/4 h-6 animate-pulse"></h3>
                    <p className="text-sm bg-gray-700 w-1/2 h-4 animate-pulse mt-2"></p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="w-16 h-4 bg-gray-700 animate-pulse"></div>
                      <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-full opacity-50 cursor-not-allowed animate-pulse"></button>
                    </div>
                  </div>
                </div>
              ))
            : watchlist.map((movie) => (
                <div
                  key={movie.id}
                  className="relative bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 shadow-lg"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover hover:blur-sm transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 text-white">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm">{movie.release_date}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-yellow-400">
                        ★ {movie.vote_average || "N/A"}
                      </span>
                      <button
                        onClick={() => handleRemoveFromWatchlist(movie.id)}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
