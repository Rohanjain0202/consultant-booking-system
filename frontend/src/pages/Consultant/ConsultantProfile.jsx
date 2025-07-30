import { useEffect, useState } from "react";
import api from "../../utils/auth";
import "./ConsultantProfile.css";

const ConsultantProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    api.get("/users/me") // ✅ FIXED this line — removed extra /api
      .then((res) => {
        setUser(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
      });
  }, []);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePasswordInput = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", form); // ✅ Also no /api here
      alert("✅ Profile updated successfully!");
    } catch {
      alert("❌ Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("❌ Passwords do not match");
    }
    try {
      await api.put("/users/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      alert("✅ Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      alert("❌ Failed to update password");
    }
  };

  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className={`consultant-dashboard ${sidebarOpen ? "" : "collapsed"}`}>
      <div className="sidebar">
        <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "⏪" : "☰"}
        </div>
        {sidebarOpen && (
          <>
            <h2>My Account</h2>
            <ul>
              <li
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                👤 Edit Profile
              </li>
              <li
                className={activeTab === "password" ? "active" : ""}
                onClick={() => setActiveTab("password")}
              >
                🔐 Change Password
              </li>
            </ul>
          </>
        )}
      </div>

      <div className="consultant-content">
        {activeTab === "profile" && (
          <form className="card form" onSubmit={handleSubmit}>
            <h2>👤 Update Profile</h2>
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleInput} />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        )}

        {activeTab === "password" && (
          <form className="card form" onSubmit={handlePasswordChange}>
            <h2>🔐 Change Password</h2>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInput}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInput}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInput}
                required
              />
            </div>
            <button type="submit">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConsultantProfile;
