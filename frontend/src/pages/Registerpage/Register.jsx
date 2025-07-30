import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/auth'; // Axios instance
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);

      if (form.role === 'consultant') {
        alert('Registration successful! Please wait for admin approval before logging in.');
      } else {
        alert('Registration successful!');
      }

      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.message || 'Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-left-content">
          <h1>Join Us 🎉</h1>
          <p>Create your account and start booking consultations effortlessly.</p>
          <img
            src="/assets/login-image.png"
            alt="Register Illustration"
            className="register-image"
          />
        </div>
      </div>

      <div className="register-right">
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="consultant">Consultant</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            <div className="footer">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
