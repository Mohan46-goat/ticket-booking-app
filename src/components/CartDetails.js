import React, { useContext } from 'react';
import { CartContext } from '../components/CardContext';

const CartDetails = () => {
  const { cartItems, removeFromCart, incrementSeats, decrementSeats } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <div className="row">
        {cartItems.length === 0 ? (
          <div className="col-12 text-center">
            <h3>Your cart is empty</h3>
            <strong className="display-6">
              Total Price: <span className="h4 ms-3">$0</span>
            </strong>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div className="col-12 mb-4" key={index}>
              <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <img src={item.image} alt={item.title} className="img-fluid" style={{ maxHeight: '300px' }} />
                </div>
                
                <div className="col-6">
                  <ul>
                    <li className="list-unstyled m-4">
                      <span className="h3">{item.title}</span>
                    </li>
                    
                    <li className="list-unstyled m-4">
                      <span>{item.releasedate}</span>
                    </li>
                    
                    <li className="list-unstyled m-4">
                      <span>{item.price}</span>
                    </li>
                    
                    <li className="list-unstyled m-4">
                      <span>
                        <strong className="display-6">
                          Price: <span className="h4 ms-3">${item.ticketprice}</span>
                        </strong>
                        <p>
                          Book seats: <span className="ms-3">{item.seatCount}</span>
                          <button 
                            className="btn" 
                            style={{ border: '0' }} 
                            onClick={() => incrementSeats(item._id, item.ticketprice)}
                          >
                            +
                          </button>
                          <button 
                            className="btn" 
                            style={{ border: '0' }} 
                            onClick={() => decrementSeats(item._id, item.ticketprice)}
                          >
                            -
                          </button>
                        </p>
                      </span>
                    </li>
                    <li className="list-unstyled m-4">
                      <button className="btn btn-outline-danger btn-block" onClick={() => removeFromCart(item)}>
                        Remove From Cart
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-4 text-center">
          <strong className="display-6">
            Total Price: <span className="h4 ms-3">${cartItems.reduce((total, item) => total + item.totalPrice, 0)}</span>
          </strong>
          <div className="mt-2">
            <button className="btn btn-primary" onClick={() => {/* Add checkout logic here */}}>
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
