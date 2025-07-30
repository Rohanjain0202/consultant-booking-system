import { useEffect, useState } from "react";
import api from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./ConsultantDashboard.css";

const ConsultantDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my-consultant-bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching consultant bookings:", err);
      }
    };

    if (user?._id) {
      fetchBookings();
    }
  }, [user?._id]);

  const normalize = (str) => str?.toString().trim().toLowerCase();
  const upcoming = bookings.filter((b) => normalize(b.status) === "booked");
  const completed = bookings.filter((b) => normalize(b.status) === "completed");

  const updateBookingStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
    }
  };

  const nextBookings = upcoming.slice(0, 3);

  return (
    <div className="consultantdashboard">
      <header className="dashboard-header">
        <h1>👋 Welcome, <span>{user?.name || "Consultant"}</span></h1>
        <p className="sub">Here’s a quick overview of your booking activity.</p>
      </header>

      <div className="dashboard-stats-wrapper">
        <div className="dashboard-stats">
          <div className="stat-card total">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className="stat-card upcoming">
            <h3>Upcoming</h3>
            <p>{upcoming.length}</p>
          </div>
          <div className="stat-card completed">
            <h3>Completed</h3>
            <p>{completed.length}</p>
          </div>
        </div>
      </div>

      <section className="dashboard-next">
        <div className="next-header">
          <h2>📅 Next Bookings</h2>
          <button className="view-all-btn" onClick={() => navigate("/consultant/bookings")}>
            🔍 View All
          </button>
        </div>

        {nextBookings.length === 0 ? (
          <p className="no-booking">No upcoming bookings</p>
        ) : (
          <div className="booking-grid">
            {nextBookings.map((b) => (
              <div key={b._id} className="booking-card">
                <p><strong>Customer:</strong> {b.customer?.name || "N/A"}</p>
                <p><strong>Service:</strong> {b.service?.title || "N/A"}</p>
                <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {b.timeSlot || "N/A"}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${b.status}`}>{b.status}</span>
                </p>
                {b.status === "booked" && (
                  <div className="btn-group">
                    <button
                      className="complete-btn"
                      onClick={() => updateBookingStatus(b._id, "completed")}
                    >
                      ✅ Complete
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => updateBookingStatus(b._id, "cancelled")}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ConsultantDashboard;
