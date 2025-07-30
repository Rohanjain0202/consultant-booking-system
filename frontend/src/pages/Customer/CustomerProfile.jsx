// src/components/CustomerProfile.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import "./Profile.css";

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [customerDetail, setCustomerDetail] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: {
      city: "",
      state: "",
      pincode: ""
    },
    preferredLanguage: "",
    occupation: "",
    timeZone: "",
    consultationMode: "",
    preferredSlots: [],
    specialNeeds: "",
    emergencyContact: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/users/me");
        setUser(userRes.data);
        setBasicInfo({
          name: userRes.data.name,
          email: userRes.data.email,
          phone: userRes.data.phone || ""
        });

        const detailRes = await api.get("/customer-details/me");
        if (detailRes.data) {
          setCustomerDetail({
            ...detailRes.data,
            address: detailRes.data.address || { city: "", state: "", pincode: "" },
            preferredSlots: detailRes.data.preferredSlots || []
          });
        }
      } catch (err) {
        console.error("❌ Error loading data:", err?.response?.data || err.message);
        setError("Session expired or unauthorized. Please log in again.");
      }
    };
    fetchData();
  }, []);

  const handleBasicChange = (e) =>
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setCustomerDetail((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else {
      setCustomerDetail({ ...customerDetail, [name]: value });
    }
  };

  const handleSlotChange = (e) => {
    const { value, checked } = e.target;
    setCustomerDetail((prev) => {
      const updated = checked
        ? [...prev.preferredSlots, value]
        : prev.preferredSlots.filter((slot) => slot !== value);
      return { ...prev, preferredSlots: updated };
    });
  };

  const handlePasswordInput = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const updateBasicInfo = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", basicInfo);
      alert("✅ Profile updated");
    } catch {
      alert("❌ Failed to update profile");
    }
  };

  const updateCustomerDetail = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customer-details/me", customerDetail);
      alert("✅ Details saved");
    } catch {
      alert("❌ Failed to save details");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("❌ Passwords do not match");
    }

    try {
      await api.put("/users/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert("✅ Password updated");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      alert("❌ Failed to update password");
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-dashboard">
      <div className="sidebar">
        <h2>My Account</h2>
        <ul>
          <li onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>
            👤 Edit Profile
          </li>
          <li onClick={() => setActiveTab("details")} className={activeTab === "details" ? "active" : ""}>
            📋 Additional Details
          </li>
          <li onClick={() => setActiveTab("password")} className={activeTab === "password" ? "active" : ""}>
            🔐 Change Password
          </li>
        </ul>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <form className="card" onSubmit={updateBasicInfo}>
            <h2>👤 Basic Info</h2>
            <label>Name</label>
            <input name="name" value={basicInfo.name} onChange={handleBasicChange} required />
            <label>Email</label>
            <input name="email" value={basicInfo.email} onChange={handleBasicChange} required />
            <label>Phone</label>
            <input name="phone" value={basicInfo.phone} onChange={handleBasicChange} />
            <button type="submit">Save</button>
          </form>
        )}

        {activeTab === "details" && (
          <form className="card" onSubmit={updateCustomerDetail}>
            <h2>📋 Additional Details</h2>
            <label>Full Name</label>
            <input name="fullName" value={customerDetail.fullName} onChange={handleDetailChange} required />
            <label>Date of Birth</label>
            <input type="date" name="dob" value={customerDetail.dob?.slice(0, 10) || ""} onChange={handleDetailChange} />
            <label>Gender</label>
            <input name="gender" value={customerDetail.gender} onChange={handleDetailChange} />
            <label>City</label>
            <input name="address.city" value={customerDetail.address.city} onChange={handleDetailChange} />
            <label>State</label>
            <input name="address.state" value={customerDetail.address.state} onChange={handleDetailChange} />
            <label>Pincode</label>
            <input name="address.pincode" value={customerDetail.address.pincode} onChange={handleDetailChange} />
            <label>Preferred Language</label>
            <input name="preferredLanguage" value={customerDetail.preferredLanguage} onChange={handleDetailChange} />
            <label>Occupation</label>
            <input name="occupation" value={customerDetail.occupation} onChange={handleDetailChange} />
            <label>Time Zone</label>
            <input name="timeZone" value={customerDetail.timeZone} onChange={handleDetailChange} />
            <label>Consultation Mode</label>
            <input name="consultationMode" value={customerDetail.consultationMode} onChange={handleDetailChange} />
            <label>Preferred Slots</label>
            <div className="slots-group">
              {["Morning", "Afternoon", "Evening"].map((slot) => (
                <label key={slot}>
                  <input
                    type="checkbox"
                    value={slot}
                    checked={customerDetail.preferredSlots.includes(slot)}
                    onChange={handleSlotChange}
                  />
                  {slot}
                </label>
              ))}
            </div>
            <label>Special Needs</label>
            <input name="specialNeeds" value={customerDetail.specialNeeds} onChange={handleDetailChange} />
            <label>Emergency Contact</label>
            <input name="emergencyContact" value={customerDetail.emergencyContact} onChange={handleDetailChange} />
            <button type="submit">Save</button>
          </form>
        )}

        {activeTab === "password" && (
          <form className="card" onSubmit={updatePassword}>
            <h2>🔐 Change Password</h2>
            <label>Current Password</label>
            <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordInput} required />
            <label>New Password</label>
            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordInput} required />
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordInput} required />
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
