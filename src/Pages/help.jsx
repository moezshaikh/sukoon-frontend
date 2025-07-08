import React from "react";
import "../style/help.css";
import { Phone, AlertTriangle, Heart } from "react-feather";

const EmergencyHelp = () => {
  return (
    <div className="emergency-help-container">
      <h1>Emergency Helpline</h1>
      <p className="subtitle">
        If you're in distress or facing a mental health crisis, immediate help is available.
      </p>

      <div className="emergency-grid">
        <div className="emergency-card soft-blue">
          <Phone className="emergency-icon" />
          <h3>Call 24/7 Helpline</h3>
          <p>
            Our professionals are available round the clock. Don’t hesitate to reach out.
          </p>
          <a className="emergency-btn" href="tel:18004251234">📞 1800-425-1234</a>
        </div>

        <div className="emergency-card soft-orange">
          <AlertTriangle className="emergency-icon" />
          <h3>In Immediate Danger?</h3>
          <p>
            Please contact your local emergency services or visit the nearest hospital.
          </p>
          <a
            className="emergency-btn"
            href="https://maps.google.com?q=nearest+hospital"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Nearby Hospital
          </a>
        </div>

        <div className="emergency-card soft-green">
          <Heart className="emergency-icon" />
          <h3>Talk to a Volunteer</h3>
          <p>
            Sometimes just talking helps. Connect with trained volunteers anonymously.
          </p>
          <a
            className="emergency-btn"
            href="https://www.7cups.com"
            target="_blank"
            rel="noopener noreferrer"
          >
             Chat Now
          </a>
        </div>
      </div>

      <p className="note">
        Your safety is important. Everything you share remains private and secure. 🤝
      </p>
    </div>
  );
};

export default EmergencyHelp;
