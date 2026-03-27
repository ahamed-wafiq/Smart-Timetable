import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiClock, FiTarget, FiTrendingUp } from "react-icons/fi";
import "../styles/home-page.css";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiTarget,
      title: "Smart Generation",
      description:
        "AI-powered timetable generation that optimizes schedules intelligently",
      color: "#6366f1",
    },
    {
      icon: FiClock,
      title: "Time Management",
      description:
        "Efficiently manage time slots and avoid conflicts automatically",
      color: "#ec4899",
    },
    {
      icon: FiTrendingUp,
      title: "Analytics & Insights",
      description:
        "Detailed stress analysis and optimization metrics for better planning",
      color: "#f59e0b",
    },
  ];

  const benefits = [
    {
      number: "500+",
      label: "Institutions Using",
    },
    {
      number: "50K+",
      label: "Schedules Generated",
    },
    {
      number: "99%",
      label: "Conflict-Free Rate",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Smart Timetable Generation Made Simple</h1>
          st
          <p className="hero-subtitle">
            Create conflict-free timetables in minutes. Our AI-powered platform
            optimizes schedules with intelligent constraint management and
            stress analysis.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/generator")}
            >
              Get Started Now
              <FiArrowRight size={18} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/generator")}
            >
              View Features
            </button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        {benefits.map((benefit, index) => (
          <div key={index} className="stat-item">
            <div className="stat-number">{benefit.number}</div>
            <div className="stat-label">{benefit.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">CORE FEATURES</span>
          <h2>Powerful Tools for Perfect Scheduling</h2>
          <p>Everything you need to create optimal timetables with ease</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div
                  className="feature-icon-wrapper"
                  style={{ borderColor: feature.color }}
                >
                  <Icon size={32} color={feature.color} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Scheduling?</h2>
        <p>
          Start creating optimized timetables today with our intelligent
          platform
        </p>
        <button
          className="btn btn-primary btn-large"
          onClick={() => navigate("/generator")}
        >
          Generate Your First Timetable
          <FiArrowRight size={20} />
        </button>
      </section>

      {/* Features Highlight */}
      <section className="highlight-section">
        <div className="highlight-content">
          <h2>Why Choose SmartTimetable?</h2>
          <ul className="highlight-list">
            <li>
              <span className="check-icon">✓</span>
              <div>
                <h4>Intelligent Optimization</h4>
                <p>
                  AI analyzes constraints and generates optimal schedules
                  automatically
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <h4>Real-time Analytics</h4>
                <p>
                  Track stress distribution and optimization metrics in
                  real-time
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <h4>Easy Management</h4>
                <p>
                  Intuitive interface for managing constraints and preferences
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <h4>Export & Share</h4>
                <p>
                  Export timetables in multiple formats and share with
                  stakeholders
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
