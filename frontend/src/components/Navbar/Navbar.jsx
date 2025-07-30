import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import api from '../../utils/api';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout'); // Cookies are sent due to withCredentials: true
      setUser(null); // Clear user context
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo">ConsultPro</NavLink>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            {user.role === 'customer' && (
              <>
                <NavLink to="/customer/home">Home</NavLink>
                <NavLink to="/consultants">Browse</NavLink>
                <NavLink to="/my-bookings">My Bookings</NavLink>
                <NavLink to="/customer/profile">My Profile</NavLink>
              </>
            )}
            {user.role === 'consultant' && (
              <>
                <NavLink to="/consultant/dashboard">Dashboard</NavLink>
                <NavLink to="/consultant/services">My Services</NavLink>
                <NavLink to="/consultant/bookings">Bookings</NavLink>
                <NavLink to="/consultant/reviews">My Reviews</NavLink>
                <NavLink to="/consultant/profile">My Profile</NavLink>
              </>
            )}
            {user.role === 'admin' && (
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
