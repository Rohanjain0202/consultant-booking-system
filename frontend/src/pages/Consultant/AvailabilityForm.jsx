import { useState } from "react";
import api from "../../utils/auth";
import "./AvailabilityForm.css";

const TIME_OPTIONS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

const AvailabilityForm = ({ serviceId, onClose, onSuccess }) => {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || !start || !end) return setError("All fields are required.");
    if (start === end) return setError("Start and End times must differ.");

    const slot = `${start} - ${end}`;

    try {
      await api.post("/availability", {
        service: serviceId,
        date,
        slots: [slot],
      });
      alert("✅ Availability added!");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError("Failed to add availability.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="availability-form">
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Start Time:</label>
      <select value={start} onChange={(e) => setStart(e.target.value)} required>
        <option value="">Select</option>
        {TIME_OPTIONS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label>End Time:</label>
      <select value={end} onChange={(e) => setEnd(e.target.value)} required>
        <option value="">Select</option>
        {TIME_OPTIONS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {error && <p className="error-text">{error}</p>}

      <button type="submit">➕ Add</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AvailabilityForm;
