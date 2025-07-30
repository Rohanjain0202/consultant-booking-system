import { useEffect, useState } from 'react';
import api from '../../utils/auth';
import './ConsultantBookings.css'; // Reusing base styles

const TIME_OPTIONS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

const ConsultantAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  // Fetch current availability
  const fetchAvailability = async () => {
    try {
      const res = await api.get('/api/availability/me');
      setAvailability(res.data);
    } catch (err) {
      alert("❌ Failed to load availability");
    }
  };

  // Add slot
  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!date || !start || !end) return setError("All fields are required");
    if (start === end) return setError("Start and end time cannot be same");

    const slot = `${start} - ${end}`;
    try {
      await api.post('/api/availability', { date, slots: [slot] });
      setDate('');
      setStart('');
      setEnd('');
      setError('');
      fetchAvailability();
    } catch (err) {
      alert("❌ Failed to add slot");
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="consultant-dashboard">
      <h2>🕒 Manage Your Availability</h2>
      <form onSubmit={handleAddSlot} className="availability-form">
        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Start Time:</label>
          <select value={start} onChange={(e) => setStart(e.target.value)} required>
            <option value="">Select</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>End Time:</label>
          <select value={end} onChange={(e) => setEnd(e.target.value)} required>
            <option value="">Select</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="add-btn">➕ Add Slot</button>
      </form>

      <hr className="divider" />

      <h3>📅 My Availability Schedule</h3>
      {availability.length === 0 ? (
        <p className="no-slots">No availability slots added yet.</p>
      ) : (
        <div className="availability-list">
          {availability.map((entry) => (
            <div key={entry._id} className="availability-card">
              <h4>{entry.date}</h4>
              <ul>
                {entry.slots.map((slot, idx) => (
                  <li key={idx} className="slot-item">🕓 {slot}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantAvailability;
