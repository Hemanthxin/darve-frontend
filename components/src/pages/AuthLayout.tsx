import React from "react";
import "../../styles/login.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Shared shell for the login/register/reset screens: background image,
 * hero copy and feature chips stay mounted while only the card content
 * (children) swaps between auth views.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="login-page">
      <div className="login-overlay" />

      <div className="login-hero">
        <div className="login-hero-heading">
          <span className="login-flourish">✦</span>
          <h1>
            Preserving Rituals.
            <br />
            Ensuring Devotion.
          </h1>
          <span className="login-flourish">✦</span>
          <p>AI-Powered Verification for Sacred Ritual Practices</p>
        </div>

        <div className="login-badge-ring">
          <div className="login-badge-inner">
            <i className="fa-solid fa-spa" />
            <span>
              Sacred Traditions
              <br />
              Powered by AI
            </span>
          </div>
        </div>

        <div className="login-chips">
          <div className="login-chip">
            <span className="login-chip-icon">
              <i className="fa-solid fa-shield-halved" />
            </span>
            Authentic
            <br />
            Verification
          </div>
          <div className="login-chip">
            <span className="login-chip-icon">
              <i className="fa-solid fa-microchip" />
            </span>
            AI-Powered
            <br />
            Accuracy
          </div>
          <div className="login-chip">
            <span className="login-chip-icon">
              <i className="fa-solid fa-lock" />
            </span>
            Secure &amp;
            <br />
            Reliable
          </div>
        </div>
      </div>

      <div className="login-card">{children}</div>
    </div>
  );
};

export default AuthLayout;
