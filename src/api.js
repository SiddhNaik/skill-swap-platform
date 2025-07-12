// api.js - Centralized API calls

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const fetchSkills = () => API.get('skills/');
export const fetchRequests = () => API.get('swap-requests/');

export default API; 