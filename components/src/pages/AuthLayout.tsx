import React from "react";
import { motion } from "framer-motion";
import "../../styles/login.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Shared shell for the login/register/reset screens: background image,
 * hero copy and feature chips stay mounted while only the card content
 * (children) swaps between auth views.
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="login-page">
      <div className="login-overlay" />

      <motion.div
        className="login-hero"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-hero-heading" variants={heroItem}>
          <span className="login-flourish">✦</span>
          <h1>
            Preserving Rituals.
            <br />
            Ensuring Devotion.
          </h1>
          <span className="login-flourish">✦</span>
          <p>AI-Powered Verification for Sacred Ritual Practices</p>
        </motion.div>

        <motion.div
          className="login-badge-ring"
          variants={heroItem}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="login-badge-inner">
            <i className="fa-solid fa-spa" />
            <span>
              Sacred Traditions
              <br />
              Powered by AI
            </span>
          </div>
        </motion.div>

        <motion.div className="login-chips" variants={heroItem}>
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
        </motion.div>
      </motion.div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
