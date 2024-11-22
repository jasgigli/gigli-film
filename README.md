# Gigli Film Application

The **Gigli Film Application** is a web-based platform that provides information about movies from around the world, including release dates, trending titles, and personalized watchlists. This responsive app is built with modern web technologies and offers a user-friendly interface for desktop and mobile users.

## Features

### 🎥 Core Features

- **Home Page**: Explore a curated list of movies with key information.
- **Movies Page**: Discover movies from various genres, industries, and countries.
- **Trending Section**: Stay updated on popular and trending movies.
- **Watchlist**: Create a personalized list of movies you plan to watch.

### 📱 Responsive Design

- Fully optimized for desktop and mobile screens.
- Sticky header for quick navigation.
- Smooth transitions for mobile menu toggling.

### ⚙️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org) for server-side rendering and static site generation.
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for fast and responsive styling.
- **Icons and Animations**: Delightful animations using Tailwind classes.

---

## Getting Started

### 🛠 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn for package management

### 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jasgigli/gigli-film.git
   cd gigli-film
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

### 📦 Build for Production

To create a production build:

```bash
npm run build
npm start
```

---

## Project Structure

```
gigli-film/
├── app/
│   ├── layout.jsx      # Shared layout and sticky header
│   ├── page.jsx        # Home page
│   ├── movie/          # Movie details and listing
│   └── trending/       # Trending movies page
├── components/
│   ├── Header.jsx      # Responsive header with navigation
│   └── ErrorBoundary.jsx # Error handling component
├── public/             # Static assets
├── styles/             # Global styles
└── README.md           # Project documentation
```

---

## Usage

### Navigation

- **Sticky Header**: Navigate between pages seamlessly with a sticky top navigation bar.
- **Mobile Menu**: Expandable menu for mobile users.

### Watchlist

- Add movies to your watchlist for easy tracking.

---

## Contribution

### 🌟 Contributions Are Welcome!

If you'd like to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your feature description here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or suggestions, feel free to reach out at:

- Email: overview.jjj@gmail.com
- GitHub: [Your GitHub Profile](https://github.com/jasgigli)

---

Happy coding! 🎉
