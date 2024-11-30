import React, { createContext, useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './LocalStorageHelper.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

// Helper function to check if user is logged in
const isUserLoggedIn = () => {
  return getFromLocalStorage('authToken') !== null;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => isUserLoggedIn() ? getFromLocalStorage('cartItems') || [] : []);
  const [count, setCount] = useState(() => isUserLoggedIn() ? getFromLocalStorage('cartCount') || 0 : 0);

  const addToCart = (item) => {
    const itemExists = cartItems.some(cartItem => cartItem._id === item._id);

    if (itemExists) {
      toast.error("Item already added");
    } else {
      const updatedItem = { ...item, seatCount: 0, totalPrice: 0 }; // Initialize seatCount and totalPrice
      const updatedCart = [...cartItems, updatedItem];
      setCartItems(updatedCart);
      setCount(prevCount => prevCount + 1);
      toast.success("Item added to cart");
    }
  };

  const incrementSeats = (itemId, ticketPrice) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === itemId) {
        const newSeatCount = item.seatCount + 1;
        return { ...item, seatCount: newSeatCount, totalPrice: newSeatCount * ticketPrice };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const decrementSeats = (itemId, ticketPrice) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === itemId && item.seatCount > 0) {
        const newSeatCount = item.seatCount - 1;
        return { ...item, seatCount: newSeatCount, totalPrice: newSeatCount * ticketPrice };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item._id !== itemToRemove._id);
    setCartItems(updatedCart);
    setCount(prevCount => Math.max(prevCount - 1, 0));
  };

  // Save to local storage only if the user is logged in
  useEffect(() => {
    if (isUserLoggedIn()) {
      saveToLocalStorage('cartItems', cartItems);
      saveToLocalStorage('cartCount', count);
    }
  }, [cartItems, count]);

  const clearCartOnLogout = () => {
    removeFromLocalStorage('cartItems');
    removeFromLocalStorage('cartCount');
    setCartItems([]);
    setCount(0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        count, 
        addToCart, 
        removeFromCart, 
        clearCartOnLogout,
        incrementSeats, 
        decrementSeats 
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
