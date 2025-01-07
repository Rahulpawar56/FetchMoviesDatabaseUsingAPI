import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MovieSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Get query from URL
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovies = async () => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (query) fetchMovies();
  }, [query]); // Re-fetch whenever the query changes

  return (
    <div className="container">
      <h2 className="text-white">Search Results for "{query}"</h2>
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.id}>
              <div className="card bg-dark text-white h-100">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.overview.slice(0, 100)}...
                  </p>
                  <a
                    href={`/movie/${movie.id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
