import React, { useState } from 'react';
import './Registration.css';
import { URLS } from '../../URL';
import axiosInstance from '../../utils/axios'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setConfPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const registerUser = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (password !== password2) {
      setError('Passwords do not match.');
      return; // Stop further execution
    }

    try {
      const payload = {
        username,
        email,
        password,
        password2,
        role: parseInt(role, 10), // Convert role to integer
      };

      await axiosInstance.post(URLS.REGISTER, payload);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
<div className="div">
  <form className="Auth-form registration-form" onSubmit={registerUser}>
    {error && <p>{error}</p>}
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">Register</h3>
      <div className="form-group mt-3">
        <label>Username</label>
        <input
          className="form-control mt-1"
          placeholder="Enter Username"
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Email</label>
        <input
          className="form-control mt-1"
          placeholder="Enter Email"
          type="text"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          className="form-control mt-1"
          placeholder="Enter password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Confirm Password</label>
        <input
          className="form-control mt-1"
          placeholder="Confirm password"
          type="password"
          value={password2}
          required
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Role</label>
        <input
          className="form-control mt-1"
          placeholder="Role"
          type="text"
          value={role}
          required
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  </form>
</div>
  );
};

export {Register};