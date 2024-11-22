"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import SearchPage from "@/components/SearchPage";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = "e71be147c413550ec91b8565d8253a6b";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <SearchPage />
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Popular Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
            <Link
              href={`/movie/${movie.id}`}
              className="text-purple-500 hover:text-purple-700 font-bold mt-4 inline-block"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;
