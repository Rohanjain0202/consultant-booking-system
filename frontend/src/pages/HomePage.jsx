import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./HomePage.css";

// Images
import medicalImg from "../../public/assets/categories/medical.png";
import legalImg from "../../public/assets/categories/medical.png";
import careerImg from "../../public/assets/categories/career.png";
import astrologyImg from "../../public/assets/categories/Astrology.png";
import fitnessImg from "../../public/assets/categories/Fitness.png";
import financeImg from "../../public/assets/categories/medical.png";
import educationImg from "../../public/assets/categories/medical.png";

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Medical", img: medicalImg },
    { name: "Legal", img: legalImg },
    { name: "Career", img: careerImg },
    { name: "Astrology", img: astrologyImg },
    { name: "Fitness", img: fitnessImg },
    { name: "Finance", img: financeImg },
    { name: "Education", img: educationImg },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <h1>Find the Best Consultants for Your Needs</h1>
        <p>Book a session with verified professionals across various domains.</p>
        <button className="cta-btn" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Consult by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              <img src={cat.img} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Create an account as a customer or consultant.</p>
          </div>
          <div className="step">
            <h3>2. Choose Category</h3>
            <p>Browse consultants in your area of need.</p>
          </div>
          <div className="step">
            <h3>3. Book & Pay</h3>
            <p>Schedule your session and pay securely.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <h2>Why Choose Us?</h2>
        <div className="reasons">
          <div className="reason">
            <h4>✔ Verified Experts</h4>
            <p>All consultants are vetted and verified for quality assurance.</p>
          </div>
          <div className="reason">
            <h4>✔ Secure Payment</h4>
            <p>Your payments are safe and encrypted end-to-end.</p>
          </div>
          <div className="reason">
            <h4>✔ 24/7 Support</h4>
            <p>We're here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
