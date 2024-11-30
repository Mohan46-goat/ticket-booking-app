import React, { useContext } from 'react';
import { CartProvider } from '../src/components/CardContext';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Primecard from '../src/components/Primecard';
import CartDetails from './components/CartDetails';
import Navbar from '../src/components/Navbar';
import MovieDetails from './components/MovieDetails';
import { AuthProvider , AuthContext } from './components/AuthProvider';
import Login from './components/Login'


function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/primecard" element={<RequireAuth><Primecard /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

// Helper component to restrict access
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};


export default App;
