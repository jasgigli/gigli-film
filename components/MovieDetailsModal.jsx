"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const MovieDetailsModal = ({ movie, onClose }) => {
  const {
    title,
    original_title,
    tagline,
    overview,
    runtime,
    release_date,
    genres,
    vote_average,
    vote_count,
    popularity,
    videos,
    recommendations,
  } = movie;

  // Disable background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md z-50 flex justify-center items-center p-4 overflow-auto">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-4xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 text-2xl hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* Header Section */}
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={title}
            className="rounded-t-xl w-full h-64 sm:h-80 md:h-96 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl sm:text-3xl font-bold shadow-lg">
              {title}
            </h2>
            <p className="text-sm text-gray-400">{tagline || "N/A"}</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Overview */}
          <p className="text-gray-300 mb-4">{overview}</p>

          {/* Movie Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <strong>Original Title:</strong> {original_title}
            </div>
            <div>
              <strong>Runtime:</strong> {runtime || "N/A"} minutes
            </div>
            <div>
              <strong>Release Date:</strong> {release_date}
            </div>
            <div>
              <strong>Genres:</strong>{" "}
              {genres.map((genre) => genre.name).join(", ") || "N/A"}
            </div>
            <div>
              <strong>Rating:</strong> ⭐ {vote_average} ({vote_count} votes)
            </div>
            <div>
              <strong>Popularity:</strong> {popularity}
            </div>
          </div>

          {/* Trailers Section */}
          {videos.results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">
                Trailers
              </h3>
              <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
                {videos.results.map((video) => (
                  <Link
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[200px] h-40 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                  >
                    {/* Trailer Thumbnail */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        className="w-full h-full object-cover rounded-xl transition duration-300 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl opacity-40"></div>
                    </div>
                    {/* Trailer Title */}
                    <div className="p-3">
                      <p className="text-sm text-white truncate">
                        {video.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Section */}
          {recommendations.results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Recommended Movies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendations.results.slice(0, 4).map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center space-x-4 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                      alt={rec.title}
                      className="w-16 h-24 object-cover rounded-md"
                    />
                    <p className="text-sm">{rec.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center py-4 bg-gray-800 rounded-b-xl">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
