// frontend/utils/auth.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Required to send cookies
});

// ✅ No interceptor needed now – token is in HTTP-only cookie
export default api;