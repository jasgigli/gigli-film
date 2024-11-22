"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieDetailsPage = ({ params }) => {
  const { id } = params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = "e71be147c413550ec91b8565d8253a6b";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`
        );
        setMovieDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1b29] text-white">
        Loading movie details...
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1b29] text-white">
        Failed to load movie details.
      </div>
    );
  }

  const {
    title,
    overview,
    release_date,
    genres,
    videos,
    poster_path,
    credits,
  } = movieDetails;

  const trailer = videos.results.find((video) => video.type === "Trailer");

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#1c1b29] via-[#20212b] to-[#16161e] text-white">
      <div className="container mx-auto px-6 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <a
            href="/movie"
            className="text-purple-500 hover:text-purple-700 font-bold"
          >
            ← Back to Movies
          </a>
        </div>

        {/* Movie Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left - Movie Poster */}
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Right - Movie Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold">{title}</h1>
            <p className="text-gray-400">{release_date}</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-purple-600 rounded-full text-sm font-bold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-300">{overview}</p>

            {trailer && (
              <div className="mt-4">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${title} Trailer`}
                  frameBorder="0"
                  allow="autoplay; fullscreen;"
                  allowFullScreen
                  className="w-full h-72 rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {credits.cast.slice(0, 10).map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-40 object-cover rounded-lg shadow-lg"
                />
                <p className="text-sm mt-2">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
