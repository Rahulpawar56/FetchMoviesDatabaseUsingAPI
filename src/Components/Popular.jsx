import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink to handle routing

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);

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

    fetchMovies();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-center m-5 " style={{ fontWeight: "300" }}>
        Popular Movies
      </h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {/* Make the entire movie card clickable using NavLink */}
            <NavLink style={{textDecoration:'none'}}  to={`/movie/${movie.id}`} className="movie-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h5 className="text-white text-center">
                  {movie.title || movie.original_title || "Untitled"}
                </h5>
                <p className="text-center">Rating: {movie.vote_average}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination"style={{marginLeft:'40%'}}>
        <button style={{padding:'10px',width:'120px',borderRadius:'10px'}} disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button style={{padding:'10px',width:'120px',borderRadius:'10px',marginLeft:'10px'}} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Popular;
