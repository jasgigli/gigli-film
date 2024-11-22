"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import MovieDetailsModal from "./MovieDetailsModal";

const CardContainer = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = "e71be147c413550ec91b8565d8253a6b";
  const movieApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const genresApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, genreRes] = await Promise.all([
          fetch(movieApiUrl),
          fetch(genresApiUrl),
        ]);

        if (!movieRes.ok || !genreRes.ok) {
          throw new Error("Failed to fetch data.");
        }

        const movieData = await movieRes.json();
        const genreData = await genreRes.json();

        setMovies(movieData.results);
        setGenres(genreData.genres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const fetchMovieDetails = async (movieId) => {
    const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos,recommendations`;
    try {
      const res = await fetch(detailUrl);
      if (!res.ok) throw new Error("Failed to fetch movie details.");

      const data = await res.json();
      setSelectedMovie(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <h2 className="text-2xl text-white mb-4">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            genres={getGenreNames(movie.genre_ids)}
            rating={movie.vote_average}
            onClick={() => fetchMovieDetails(movie.id)}
          />
        ))}
      </div>

      {isModalOpen && selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CardContainer;
