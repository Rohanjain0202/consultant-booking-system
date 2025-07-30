import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/auth'; // Axios instance with baseURL set to /api
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Trying to login with:", email, password);


    try {
      const res = await api.post('/auth/login', { email, password });

      const userData = res.data.user;

      if (!userData) {
        throw new Error('Invalid login response from server');
      }

      // Save user info
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Navigate based on role
      const role = userData.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'consultant') navigate('/consultant/dashboard');
      else navigate('/customer/dashboard');

    } catch (err) {
      console.error('Login error:', err);

      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        (status === 400
          ? 'Invalid email, password, or account not approved yet'
          : 'Login failed. Please try again.');

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left section */}
      <div className="login-left">
        <div className="welcome-text">
          <h1>Welcome Back 👋</h1>
          <p>Access your dashboard and manage your consultations effortlessly.</p>
        </div>
        <img src="/assets/login-image.png" alt="Login Illustration" className="left-image" />
        <div className="image-glow" />
      </div>

      {/* Right section */}
      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-pass">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p>
            Don’t have an account?{' '}
            <Link to="/register" className="register-link">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
