import "./globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gigli • Film",
  description: "Explore movies from around the world",
  metadataBase: new URL("https://gigli-film.vercel.app"),
  openGraph: {
    title: "Gigli • Film",
    description: "Explore movies from around the world",
    url: "https://gigli-film.vercel.app",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa_NCiW4gHE7AJAUwawOh5B7jwl-54V3K3nw&s",
    siteName: "Gigli Film",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigli • Film",
    description: "Explore movies from around the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa_NCiW4gHE7AJAUwawOh5B7jwl-54V3K3nw&s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JasGigli" />
        <meta name="keywords" content="movies, film, watchlist, trending" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a202c" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta property="og:url" content="https://gigli-film.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gigli • Film" />
        <meta
          name="twitter:description"
          content="Explore movies from around the world"
        />
        <meta name="twitter:image" content="/path/to/twitter-image.jpg" />
      </Head>

      <body className={`bg-gray-900 text-white ${inter.className}`}>
        <Header />
        <main className="px-4 py-6 sm:px-10 sm:py-8 md:px-16 md:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
