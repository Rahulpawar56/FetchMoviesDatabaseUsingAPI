import React, { useState } from "react";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date || "N/A"}</p>
              <p>{movie.overview ? movie.overview.substring(0, 100) : "No overview available"}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
