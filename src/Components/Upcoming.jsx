import React, { useState, useEffect } from "react";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
  const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;

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
      <h1>Upcoming Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Upcoming;
