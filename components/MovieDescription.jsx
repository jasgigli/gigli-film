import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const MovieDescription = () => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [trailers, setTrailers] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);

  const playerRef = useRef(null);
  const apiKey = "e71be147c413550ec91b8565d8253a6b";
  const defaultHorrorTrailer = "uSaBssx0LTs";

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );

        const fetchedTrailers = await Promise.all(
          response.data.results.slice(0, 3).map(async (movie) => {
            const trailerResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
            );

            const trailer = trailerResponse.data.results.find(
              (video) => video.type === "Trailer"
            );
            return trailer ? trailer.key : null;
          })
        );

        const validTrailers = fetchedTrailers.filter((key) => key);
        setTrailers(validTrailers);
        setTrailerUrl(
          validTrailers.length > 0
            ? `https://www.youtube.com/embed/${validTrailers[0]}`
            : `https://www.youtube.com/embed/${defaultHorrorTrailer}`
        );
      } catch (error) {
        console.error("Error fetching trailers:", error);
        setTrailerUrl(`https://www.youtube.com/embed/${defaultHorrorTrailer}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrailers();
  }, []);

  const loadNextTrailer = () => {
    const nextMovieIndex = (movieIndex + 1) % trailers.length;
    setMovieIndex(nextMovieIndex);
    setTrailerUrl(`https://www.youtube.com/embed/${trailers[nextMovieIndex]}`);
  };

  // Load the YouTube IFrame Player API
  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      if (playerRef.current && window.YT) {
        new window.YT.Player(playerRef.current, {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                loadNextTrailer();
              }
            },
          },
        });
      }
    };

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      // Assign global function for YouTube API
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  }, [movieIndex, trailers]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#1c1b29] via-[#20212b] to-[#16161e]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {trailerUrl && (
          <iframe
            src={`${trailerUrl}?enablejsapi=1&autoplay=1&muted=1&modestbranding=1&rel=0`}
            title="Hero Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen;"
            allowFullScreen
            className="w-full h-full object-cover opacity-70"
            ref={playerRef}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-white">
            <h1 className="text-4xl mt-8 md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide">
              🎬 Welcome to{" "}
              <span className="text-purple-500">Gigli Film Finder</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              Discover the best collection of must-watch movies and TV shows!
              Curated with care, this list includes all-time favorites. Have
              suggestions? I’d love to hear them! 📩
            </p>
            <button className="mt-6 px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-300">
              🎥 Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
