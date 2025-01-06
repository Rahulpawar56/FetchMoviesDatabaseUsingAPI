import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CastDetails = () => {
  const { id } = useParams(); // Get movie ID from route
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );

        if (!movieResponse.ok || !castResponse.ok) {
          throw new Error("Failed to fetch data.");
        }

        const movieData = await movieResponse.json();
        const castData = await castResponse.json();

        setMovieDetails(movieData);
        setCast(castData.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      {/* Movie Poster */}
      <div className="text-center mb-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="img-fluid rounded shadow"
          style={{ maxHeight: "500px" }}
        />
      </div>

      {/* Movie Title */}
      <h2 className="text-center mb-3">{movieDetails.title}</h2>

      {/* Movie Details */}
      <div className="card mb-4 p-4 shadow">
        <p><strong>Overview:</strong> {movieDetails.overview}</p>
        <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
        <p><strong>Rating:</strong> {movieDetails.vote_average}/10</p>
      </div>

      {/* Casting Section */}
      <h3 className="mb-3">Cast</h3>
      <div className="row">
        {cast.slice(0, 10).map((member) => (
          <div key={member.cast_id} className="col-md-3 mb-4">
            <div className="card shadow">
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={member.name}
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5>{member.name}</h5>
                <p><strong>Character:</strong> {member.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastDetails;
