"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrendingPage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const [isClient, setIsClient] = useState(false);
  const apiKey = "e71be147c413550ec91b8565d8253a6b";

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Load watchlist from localStorage when the component is mounted
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);

    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        setError("Unable to fetch trending movies.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isClient) {
      fetchTrendingMovies();
    }
  }, [isClient]);

  const handleMovieClick = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  const handleAddToWatchlist = (e, movie) => {
    e.stopPropagation(); // Prevent the click event from triggering movie detail navigation

    const newList = [...watchlist, movie];
    setWatchlist(newList);
    localStorage.setItem("watchlist", JSON.stringify(newList)); // Save updated watchlist to localStorage
    toast.success(`${movie.title} added to watchlist!`); // Success toast
  };

  const handleRemoveFromWatchlist = (e, movieId) => {
    e.stopPropagation(); // Prevent the click event from triggering movie detail navigation

    const newList = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(newList);
    localStorage.setItem("watchlist", JSON.stringify(newList)); // Save updated watchlist to localStorage
    toast.error("Movie removed from watchlist!"); // Error toast
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-[#1c1b29] via-[#20212b] to-[#16161e] py-8">
      <div className="container mx-auto px-6 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10">
          Trending Movies
        </h1>

        {/* Loading or Error States */}
        {isLoading && (
          <div className="text-lg text-gray-300">
            Loading trending movies...
          </div>
        )}
        {error && <div className="text-lg text-red-500">{error}</div>}

        {/* Movie Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          {trendingMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-72 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-300 mt-2">
                {movie.overview.slice(0, 100)}...
              </p>
              <div className="mt-4">
                <button
                  onClick={(e) => handleAddToWatchlist(e, movie)}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 mr-2 my-2"
                >
                  Add to Watchlist
                </button>
                {/* <button
                  onClick={(e) => handleRemoveFromWatchlist(e, movie.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  Remove from Watchlist
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default TrendingPage;
