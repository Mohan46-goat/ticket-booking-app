import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null); 


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://backend-crud-one.vercel.app/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id]); 

  if (!movie) {
    return <div>Loading...</div>;
  }

  // const handleDecrement = () => {
  //   if (count > 0) {
  //     setCount(prevCount => prevCount - 1);
  //   }
  // };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <img src={movie.image} alt='movie poster' className='img-fluid ms-lg-5 mt-lg-2' style={{height:'500px'}} />
        </div>

        <div className='col-6'>
          <h2 className='display-4 my-3'>{movie.title}</h2>
          <p>{movie.description}</p>
          <p className='display-6'>Rating: <span className='h4'>{movie.rating}</span></p>
          <p className='display-6'>Year: <span className='h4'>{movie.releasedate}</span></p>
          <p className='display-6'>Director: <span className='h4'>{movie.director}</span></p>
          {/* <p>Count in Cart: <span className='h4'>{count}</span></p>
          <button onClick={handleDecrement} className="btn special btn-warning">Remove From Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
