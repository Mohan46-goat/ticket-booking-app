// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/primecard');
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center w-50 h-100 entire">
      <div>
        <div className="card login-card shadow-lg p-3 mb-5 bg-white rounded" style={{ border: '3px solid gray' }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4 gradient-text">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-block btn-sm">Login</button>
                {error && <p className="text-danger">{error}</p>}
                <button type="button" className="btn btn-outline-primary btn-block btn-sm">Sign Up</button>
              </div>
              
              <div className="d-grid gap-2 my-2">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    navigate('/primecard');
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>

              <div className="text-center mt-3">
                <button className="btn btn-outline-danger btn-block">Forgot Password?</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
