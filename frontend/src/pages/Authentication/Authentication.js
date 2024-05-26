import { React, useState } from 'react';
import './Authentication.css';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { URLS, FrontURLS } from '../../URL';
import axiosInstance from '../../utils/axios'

export function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const loginUser = async (event) => {
      event.preventDefault();
      const credentials = { username, password };

      try {
          const { data } = await axiosInstance.post(URLS.TOKEN, credentials, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          });

          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
          history(FrontURLS.HOME);
          setError('');
      } catch (err) {
          setError(err.response?.data?.message || 'Error logging in');
      }
  };

  return (
    <div className="div">
        <form className="Auth-form" onSubmit={loginUser}>
        {error && <p>{error}</p>}
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                className="btn btn-primary">Login</button>
            </div>
          </div>
      </form>
    </div>
  );
}

export const Logout = () => {
  useEffect(() => {
      async function performLogout() {
          try {
              if(localStorage.getItem('access_token'))
              await axiosInstance.post(
                  URLS.LOGOUT, 
                  { refresh_token: localStorage.getItem('refresh_token') }, 
                  {withCredentials: true} 
              );
              // After successfully notifying the server about logout,
              // clear local storage and reset auth headers
              localStorage.clear();
              delete axiosInstance.defaults.headers.common['Authorization'];
              // Redirect user to login page
              window.location.href = FrontURLS.LOGIN;
          } catch (error) {
              // Handling errors if the logout process fails
              console.error('Logout failed', error);
              // Optionally, handle the user experience here, e.g., showing an error message
          }
      }

      performLogout();
  }, []);

  return <div>Logging out...</div>;
}
