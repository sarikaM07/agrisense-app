import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="agrisense-footer" id="contact">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">AgriSense</div>
          <p className="footer-tagline">Smart Agriculture, Smarter Tomorrow.</p>
          <p className="footer-description">
            AgriSense is a modern AI-powered agriculture management system that helps
            farmers monitor crop health, detect diseases, and forecast yield —
            all in one smart platform.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="footer-links-col">
          <h4>Navigate</h4>
          <ul>
            <li><a href="/#home">HOME</a></li>
            <li><a href="/#about">ABOUT</a></li>
            <li><a href="/#features">FEATURES</a></li>
            <li><a href="/#testimonials">TESTIMONIALS</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="footer-links-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="/feedback">FEEDBACK</a></li>
            <li><a href="/privacy">PRIVACY POLICY</a></li>
            <li><a href="/#contact">CONTACT US</a></li>
            <li><a href="/terms">TERMS OF USE</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AgriSense. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/support">Support</a>
          <a href="/#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
