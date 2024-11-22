"use client";

import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <span className="animate-bounce text-purple-500 text-5xl">🎬</span>
          <h1 className="text-3xl font-extrabold tracking-wide">
            <span className="text-purple-500 hover:text-purple-400 transition duration-300">
              Gigli
            </span>{" "}
            <span className="text-white hover:text-gray-300 transition duration-300">
              Film
            </span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link
            href="/"
            className="text-gray-300 hover:text-purple-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/movie"
            className="text-gray-300 hover:text-purple-500 transition duration-300"
          >
            Movies
          </Link>
          <Link
            href="/trending"
            className="text-gray-300 hover:text-purple-500 transition duration-300"
          >
            Trending
          </Link>
          <Link
            href="/watchlist"
            className="text-gray-300 hover:text-purple-500 transition duration-300"
          >
            Watchlist
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-gray-900 shadow-lg z-50 md:hidden">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-white text-2xl font-bold">Menu</h2>
            <button
              className="text-gray-300 text-3xl focus:outline-none"
              onClick={toggleMenu}
            >
              &times;
            </button>
          </div>
          <nav className="space-y-4 px-6">
            <Link
              href="/"
              className="block text-gray-300 hover:text-purple-500 transition duration-300"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/movie"
              className="block text-gray-300 hover:text-purple-500 transition duration-300"
              onClick={closeMenu}
            >
              Movies
            </Link>
            <Link
              href="/trending"
              className="block text-gray-300 hover:text-purple-500 transition duration-300"
              onClick={closeMenu}
            >
              Trending
            </Link>
            <Link
              href="/watchlist"
              className="block text-gray-300 hover:text-purple-500 transition duration-300"
              onClick={closeMenu}
            >
              Watchlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
