// src/App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from './utils/api';
import ProtectedRoute from './utils/ProtectedRoute';
import 'react-datepicker/dist/react-datepicker.css';

// AUTH
import Register from './pages/Registerpage/Register';
import Login from './pages/Loginpage/Login';

// DASHBOARDS
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ConsultantDashboard from './pages/Dashboard/ConsultantDashboard';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard';

// COMMON
import Navbar from './components/Navbar/Navbar';

// CUSTOMER
import BrowseServices from './pages/Customer/BrowseServices';
import ConsultantsByService from './pages/Customer/ConsultantsByService';
import ServicesByCategory from './pages/Customer/ServicesByCategory';
import ConsultantProfile from './pages/Customer/ConsultantProfile';
import BookingPage from './pages/Customer/BookingPage';
import BookingForm from './pages/Customer/BookingForm';
import CustomerBooking from './pages/Customer/CustomerBooking';
import CustomerProfile from './pages/Customer/CustomerProfile';
import BookingHistory from './pages/Customer/BookingHistory';
import BookingSuccess from './pages/Customer/BookingSuccess';
import CustomerHome from './pages/Customer/CustomerHome';

// CONSULTANT
import ConsultantSelfProfile from './pages/Consultant/ConsultantProfile';
import ConsultantBookings from './pages/Consultant/ConsultantBookings';
import ConsultantAvailability from './pages/Consultant/ConsultantAvailability';
import ConsultantServices from './pages/Consultant/ConsultantServices';
import ConsultantReviews from './pages/consultant/ConsultantReviews';

// HOMEPAGE
import HomePage from './pages/HomePage';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await api.post('/auth/refresh-token', {}, { withCredentials: true });
        const userData = res.data?.user;

        if (userData) {
          setUser(userData);
        } else {
          throw new Error('User data not returned');
        }
      } catch (err) {
        console.error('Refresh token failed:', err?.response?.data || err.message);
        setUser(null);

        const publicRoutes = ['/', '/login', '/register'];
        if (!publicRoutes.includes(window.location.pathname)) {
          navigate('/login');
        }
      }
    };

    refresh();
  }, [navigate]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute user={user}><AdminDashboard /></ProtectedRoute>
          } />

          {/* Consultant */}
          <Route path="/consultant/dashboard" element={
            <ProtectedRoute user={user}><ConsultantDashboard /></ProtectedRoute>
          } />
          <Route path="/consultant/profile" element={
            <ProtectedRoute user={user}><ConsultantSelfProfile /></ProtectedRoute>
          } />
          <Route path="/consultant/bookings" element={
            <ProtectedRoute user={user}><ConsultantBookings /></ProtectedRoute>
          } />
          <Route path="/consultant/availability" element={
            <ProtectedRoute user={user}><ConsultantAvailability /></ProtectedRoute>
          } />
          <Route path="/consultant/services" element={
            <ProtectedRoute user={user}><ConsultantServices /></ProtectedRoute>
          } />
          <Route path="/consultant/my-reviews" element={
            <ProtectedRoute user={user}><ConsultantReviews /></ProtectedRoute>
          } />

          {/* Customer */}
          <Route path="/customer/dashboard" element={
            <ProtectedRoute user={user}><CustomerDashboard /></ProtectedRoute>
          } />
          <Route path="/customer/profile" element={
            <ProtectedRoute user={user}><CustomerProfile /></ProtectedRoute>
          } />
          <Route path="/customer/book" element={
            <ProtectedRoute user={user}><BookingForm /></ProtectedRoute>
          } />
          <Route path="/customer/bookings" element={
            <ProtectedRoute user={user}><CustomerBooking /></ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute user={user}><BookingHistory /></ProtectedRoute>
          } />
          <Route path="/booking-success" element={
            <ProtectedRoute user={user}><BookingSuccess /></ProtectedRoute>
          } />
          <Route path="/customer/home" element={
            <ProtectedRoute user={user}><CustomerHome /></ProtectedRoute>
          } />

          {/* Public Service Browsing */}
          <Route path="/consultants" element={<BrowseServices />} />
          <Route path="/consultants/by-service/:serviceId" element={<ConsultantsByService />} />
          <Route path="/consultants/:id" element={<ConsultantProfile />} />
          <Route path="/book/:serviceId" element={<BookingPage />} />
          <Route path="/services/category/:category" element={<ServicesByCategory />} />
          <Route path="/consultant/reviews" element={<ConsultantReviews />} />
        </Routes>
      </div>
    </>
  );
};

export default App;






// import { useEffect, useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import api from './utils/api.js'; // ✅
// import ProtectedRoute from './utils/ProtectedRoute.jsx'; // ✅
// import 'react-datepicker/dist/react-datepicker.css';

// import Register from './pages/Registerpage/Register.jsx';
// import Login from './pages/Loginpage/Login.jsx';
// import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
// import ConsultantDashboard from "./pages/Dashboard/ConsultantDashboard.jsx";
// import CustomerDashboard from "./pages/Dashboard/CustomerDashboard.jsx";
// import Navbar from './components/Navbar/Navbar.jsx';

// import BrowseServices from './pages/Customer/BrowseServices.jsx';
// import ConsultantsByService from './pages/Customer/ConsultantsByService.jsx';
// import ServicesByCategory from './pages/Customer/ServicesByCategory.jsx';
// import ConsultantProfile from './pages/Customer/ConsultantProfile.jsx';
// import BookingPage from './pages/Customer/BookingPage.jsx';
// import BookingForm from './pages/Customer/BookingForm.jsx';
// import CustomerBooking from './pages/Customer/BookingForm.jsx';
// import CustomerProfile from './pages/Customer/CustomerProfile.jsx';
// import BookingHistory from "./pages/Customer/BookingHistory.jsx";

// import ConsultantSelfProfile from './pages/Consultant/ConsultantProfile.jsx';
// import ConsultantBookings from './pages/Consultant/ConsultantBookings.jsx';
// import ConsultantAvailability from './pages/Consultant/ConsultantAvailability.jsx';
// import ConsultantServices from './pages/Consultant/ConsultantServices.jsx';

// import HomePage from './pages/HomePage.jsx';
// import BookingSuccess from './pages/Customer/BookingSuccess.jsx';
// import CustomerHome from './pages/Customer/CustomerHome.jsx';
// import ConsultantReviews from "./pages/Consultant/ConsultantReviews.jsx";

// const App = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // On initial load: Try refreshing token
//   useEffect(() => {
//     const refresh = async () => {
//       try {
//         const res = await api.post('/auth/refresh-token');
//         localStorage.setItem('accessToken', res.data.accessToken);

//         const stored = localStorage.getItem('user');
//         if (stored) setUser(JSON.parse(stored));
//       } catch (err) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('user');
//         navigate('/login');
//       }
//     };

//     refresh();
//   }, [navigate]);

//   return (
//     <>
//       <Navbar user={user} setUser={setUser} />
//       <div style={{ paddingTop: '70px' }}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login setUser={setUser} />} />

//           <Route path="/admin/dashboard" element={
//             <ProtectedRoute user={user}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           } />

//           <Route path="/consultant/dashboard" element={
//             <ProtectedRoute user={user}>
//               <ConsultantDashboard />
//             </ProtectedRoute>
//           } />

//           <Route path="/customer/dashboard" element={
//             <ProtectedRoute user={user}>
//               <CustomerDashboard />
//             </ProtectedRoute>
//           } />

//           {/* Protected routes */}
//           <Route path="/consultants" element={<BrowseServices />} />
//           <Route path="/consultants/by-service/:serviceId" element={<ConsultantsByService />} />
//           <Route path="/consultants/:id" element={<ConsultantProfile />} />
//           <Route path="/book/:serviceId" element={<BookingPage />} />
//           <Route path="/customer/book" element={<BookingForm />} />
//           <Route path="/customer/bookings" element={<CustomerBooking />} />
//           <Route path="/my-bookings" element={<BookingHistory />} />
//           <Route path="/services/category/:category" element={<ServicesByCategory />} />
//           <Route path="/customer/profile" element={<CustomerProfile />} />

//           <Route path="/consultant/profile" element={<ConsultantSelfProfile />} />
//           <Route path="/consultant/bookings" element={<ConsultantBookings />} />
//           <Route path="/consultant/availability" element={<ConsultantAvailability />} />
//           <Route path="/consultant/services" element={<ConsultantServices />} />
//           <Route path="/booking-success" element={<BookingSuccess />} />
//           <Route path="/customer/home" element={<CustomerHome />} />
//           <Route path="/consultant/my-reviews" element={<ConsultantReviews />} />
//         </Routes>
//       </div>
//     </>
//   );
// };

// export default App;








// import { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css';


// import Register from './pages/Registerpage/Register.jsx';
// import Login from './pages/Loginpage/Login.jsx';
// import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
// import ConsultantDashboard from "./pages/Dashboard/ConsultantDashboard.jsx";
// import CustomerDashboard from "./pages/Dashboard/CustomerDashboard.jsx";
// import Navbar from './components/Navbar/Navbar.jsx';

// import BrowseServices from './pages/Customer/BrowseServices.jsx';
// import ConsultantsByService from './pages/Customer/ConsultantsByService.jsx';
// import ServicesByCategory from './pages/Customer/ServicesByCategory.jsx';
// import ConsultantProfile from './pages/Customer/ConsultantProfile.jsx';
// import BookingPage from './pages/Customer/BookingPage.jsx';
// import BookingForm from './pages/Customer/BookingForm.jsx';
// import CustomerBooking from './pages/Customer/BookingForm.jsx';
// import CustomerProfile from './pages/Customer/CustomerProfile.jsx';
// import BookingHistory from "./pages/Customer/BookingHistory.jsx";

// import ConsultantSelfProfile from './pages/Consultant/ConsultantProfile.jsx';
// import ConsultantBookings from './pages/Consultant/ConsultantBookings.jsx';
// import ConsultantAvailability from './pages/Consultant/ConsultantAvailability.jsx';
// import ConsultantServices from './pages/Consultant/ConsultantServices.jsx';

// import AdminRoute from './utils/PrivateRoute.jsx';
// import HomePage from './pages/HomePage.jsx'; // ✅ Make sure this exists
// import BookingSuccess from './pages/Customer/BookingSuccess.jsx';
// import CustomerHome from './pages/Customer/CustomerHome.jsx';
// import ConsultantReviews from "./pages/Consultant/ConsultantReviews.jsx"; // ✅ add this


// const App = () => {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   });

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       setUser(JSON.parse(stored));
//     }
//   }, []);

//   return (
//     <>
//       <Navbar user={user} setUser={setUser} />
//       <div style={{ paddingTop: '70px' }}>
//         <Routes>
//           {/* Home */}
//           <Route path="/" element={<HomePage />} />

//           {/* Auth */}
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login setUser={setUser} />} />

//           {/* Dashboards */}
//           <Route
//             path="/admin/dashboard"
//             element={
//               <AdminRoute user={user}>
//                 <AdminDashboard />
//               </AdminRoute>
//             }
//           />
//           <Route path="/consultant/dashboard" element={<ConsultantDashboard />} />
//           <Route path="/customer/dashboard" element={<CustomerDashboard />} />

//           {/* Customer Routes */}
//           <Route path="/consultants" element={<BrowseServices />} />
//           <Route path="/consultants/by-service/:serviceId" element={<ConsultantsByService />} />
//           <Route path="/consultants/:id" element={<ConsultantProfile />} />
//           <Route path="/book/:serviceId" element={<BookingPage />} />
//           <Route path="/customer/book" element={<BookingForm />} />
//           <Route path="/customer/bookings" element={<CustomerBooking />} />
//           <Route path="/my-bookings" element={<BookingHistory />} />
//           <Route path="/services/category/:category" element={<ServicesByCategory />} />
//           <Route path="/customer/profile" element={<CustomerProfile />} />

//           {/* Consultant Routes */}
//           <Route path="/consultant/profile" element={<ConsultantSelfProfile />} />
//           <Route path="/consultant/bookings" element={<ConsultantBookings />} />
//           <Route path="/consultant/availability" element={<ConsultantAvailability />} />
//           <Route path="/consultant/services" element={<ConsultantServices />} />
//           <Route path="/booking-success" element={<BookingSuccess />} />
//           <Route path="/customer/home" element={<CustomerHome />} />
//           <Route path="/consultant/my-reviews" element={<ConsultantReviews />} />
//         </Routes>
//       </div>
//     </>
//   );
// };

// export default App;
