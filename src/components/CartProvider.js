import React, { createContext, useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './LocalStorageHelper.js';

// Create the context
export const CartContext = createContext();

// Helper function to check login status
const isUserLoggedIn = () => getFromLocalStorage('authToken') !== null;

// Create a provider component
export const CartProvider = ({ children }) => {
  // Load cart items and count only if the user is logged in
  const [cartItems, setCartItems] = useState(() => isUserLoggedIn() ? getFromLocalStorage('cartItems') || [] : []);
  const [count, setCount] = useState(() => isUserLoggedIn() ? getFromLocalStorage('cartCount') || 0 : 0);

  useEffect(() => {
    // Save cart items and count to localStorage if the user is logged in
    if (isUserLoggedIn()) {
      saveToLocalStorage('cartItems', cartItems);
      saveToLocalStorage('cartCount', count);
    }
  }, [cartItems, count]);

  // Function to add items to the cart
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
    let updatedCart;

    if (existingItemIndex > -1) {
      // If item already exists, increase its quantity
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // If it's a new item, add it with quantity 1
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }

    // Update state
    setCartItems(updatedCart);
    const newCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setCount(newCount);
  };

  // Function to remove items from the cart
  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === itemToRemove._id) {
        // Decrease quantity if greater than 1
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with 0 quantity

    // Update state
    setCartItems(updatedCart);
    const newCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setCount(newCount);
  };

  // Function to clear cart data on logout
  const clearCartOnLogout = () => {
    removeFromLocalStorage('cartItems');
    removeFromLocalStorage('cartCount');
    setCartItems([]);
    setCount(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, count, addToCart, removeFromCart, clearCartOnLogout }}>
      {children}
    </CartContext.Provider>
  );
};
