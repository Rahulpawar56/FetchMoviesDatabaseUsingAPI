import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const CastDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCast, setVisibleCast] = useState(10);

  const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );

        if (!movieResponse.ok) throw new Error("Failed to fetch movie details.");
        if (!castResponse.ok) throw new Error("Failed to fetch cast information.");

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

  const loadMoreCast = () => setVisibleCast((prev) => prev + 10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <div className="container mt-4">
        <div className="container  " style={{display:'flex'}}> 
           <div className="container" style={{display:"flex",flexDirection:'column'}}>
               <div className="Slider"  style={{display:"flex"}}>
                   <div className="text mb-4" >
                      <img
                            src={posterUrl}
                            alt={movieDetails.title}
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "300px" }}
                          />
                    </div>
                     <div className="text mx-1" style={{width:'300px'}}>
                         <h4 className=" mb-3">{movieDetails.title}</h4>
                            <p style={{color:'blue',fontSize:'15px',marginBottom:'20px'}}><strong style={{color:'blue',fontSize:'15px',marginBottom:'20px'}}>Rating : </strong>
                             {movieDetails.vote_average || "N/A"}</p>

                           <p>{movieDetails.runtime} min {movieDetails.genres.map((element)=>element.name)}</p>
                         <p><strong>Release Date:</strong> {movieDetails.release_date || "Unknown"}</p>
                   </div>
               </div>
    
                   <div className="card mb-4  text-white shadow " style={{backgroundColor:'black',width:'550px'}}>
                       <p ><strong style={{fontSize:'15px'}}>Overview:</strong><br /> {movieDetails.overview || "No overview available."}</p>
        
                    </div>

           </div>
     
                 <div className="container  " style={{width:'100%'}} >
                    <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} style={{width:'100%',height:'75%'}} alt="" />
                      
             </div>
     </div>
      
      <h3 className="mb-3">Cast</h3>
      <div className="row">
        {cast.slice(0, visibleCast).map((member) => (
          <div key={member.cast_id} className="col-md-2  mb-4" style={{width:'200px',marginLeft:'20px'}}> 
            <NavLink style={{textDecoration:'none'}}  to={`/actor/${member.id}`} className="card shadow">
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={member.name}
                className="card-img-top"
              />
              <div className="card-body text-center " style={{backgroundColor:'black',color:'white',fontWeight:'400'}}>
                <h6 style={{fontSize:'15px'}}>{member.name}</h6>
                <p style={{fontSize:'14px',color:'white'}}><strong style={{fontSize:'15px'}}>Character:</strong> {member.character}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      {visibleCast < cast.length && (
        <button onClick={loadMoreCast} className="btn btn-primary">
          Load More
        </button>
      )}
    </div>
  );
};

export default CastDetails;
