import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MovieDB = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
  const BASE_URL = "https://api.themoviedb.org/3/movie";

  const navigate = useNavigate();

  const fetchMovies = async (endpoint, setMovies, page) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      console.log(data.results); // Debug API data
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("popular", setPopularMovies, popularPage);
    fetchMovies("top_rated", setTopRatedMovies, topRatedPage);
    fetchMovies("upcoming", setUpcomingMovies, upcomingPage);
  }, [popularPage, topRatedPage, upcomingPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <section>
        <h2  className="text-center m-5 " style={{fontWeight:'300'}} >All Movies </h2>
        <div className="movie-grid">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
        <PaginationControls currentPage={popularPage} setPage={setPopularPage} />
      </section>

      <section>
        <div className="movie-grid">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
        <PaginationControls currentPage={topRatedPage} setPage={setTopRatedPage} />
      </section>

      <section>
        <div className="movie-grid">
          {upcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
        <PaginationControls currentPage={upcomingPage} setPage={setUpcomingPage} />
      </section>
    </div>
  );
};

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || "No Title"}
        className="movie-poster"
      />
      <div className="movie-details">
      <h3 className="text-black text-center">{movie.title || movie.original_title || "Untitled"}</h3>
      <p className=" text-center">Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};

const PaginationControls = ({ currentPage, setPage }) => {
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button>
      <button onClick={() => setPage(currentPage + 1)}>Next</button>
    </div>
  );
};

export default MovieDB;
