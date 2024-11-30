import { useContext } from 'react';
import { CartContext } from '../components/CardContext';
import { Link } from 'react-router-dom';
import './Primecard.css'; // Add custom CSS here if needed
import { useState, useEffect } from 'react';

const Primecard = () => {
  const [data, setData] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://backend-crud-one.vercel.app/product')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {data.map(item => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
            <div className="card h-100">
              {/* Image */}
              <img 
                src={item.image} 
                className="card-img-top img-fluid" 
                alt={item.title} 
                style={{ height: 'auto', maxHeight: '350px' }} 
              />

              {/* Card Body */}
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{item.title}</h6>
                <p className="card-text"><span className='h6'>Directed By:</span> {item.director}</p>
                <p className="card-text" style={{ fontSize: '10px' }}>
                  <span>Release Date:</span> {item.releasedate}
                </p>

                {/* Buttons */}
                <div className="mt-auto">
                  <div className='row'>
                    <div className='col ms-1'>
                      <button 
                        className='btn btn-primary btn-sm change' style={{fontSize:'10px'}} 
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className='col ms-3'>
                      <Link to={`/movie/${item._id}`} className='btn btn-warning btn-sm change'>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Primecard;
