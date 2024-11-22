"use client";
import React from "react";

const Card = ({ src, title, genres, rating, onClick }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-full shadow-lg">
          ⭐ {rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white text-center truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">{genres}</p>
      </div>
    </div>
  );
};

export default Card;
