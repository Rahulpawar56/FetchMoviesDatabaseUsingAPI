import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search(props) {
    const [movies, setMovies] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);

    const Api_key = "c45a857c193f6302f2b5061c3b85e743";

    useEffect(() => {
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${props.search}&page=${count}`;
        setLoad(true);
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return response.json();
            })
            .then((data) => {
                setMovies(data.results || []);
                setLoad(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoad(false);
            });
    }, [count, props.search]);

    if (load) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;

    function handlePrev() {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    function handleNext() {
        setCount(count + 1);
    }

    const handleClick = (movie) => {
        props.setMovie(movie);
    };

    return (
        <>
            <div className="container text-center my-5">
                {movies.length === 0 && <p>No movies found for "{props.search}".</p>}
                
                <div className="row text-center">
                    {movies.map((movie) => (
                        <div className="col-3 g-5 my-2" key={movie.id}>
                            <Link
                                className="nav-link"
                                to={`/movie/${movie.id}`}
                                onClick={() => handleClick({ id: movie.id })}
                            >
                                <div className="card">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title m-0">{movie.title}</h5>
                                        <p className="card-text">Rating: {movie.vote_average}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination d-flex justify-content-center my-4">
                    <button
                        className="btn btn-primary me-2"
                        disabled={count === 1}
                        onClick={handlePrev}
                    >
                        Previous
                    </button>
                    <span className="align-self-center mx-2"></span>
                    <button  className="btn btn-primary" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default Search;
