// frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Register a new user
export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
};

// Login a user
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

// Load user data
export const loadUserData = async (token) => {
  const response = await axios.get(`${API_URL}/user/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Save user data
export const saveUserData = async (data, token) => {
  const response = await axios.put(`${API_URL}/user/data`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};