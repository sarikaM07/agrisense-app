import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        // Footer ko main layout mein use kiya gaya hai
        <footer className="agrisense-footer-minimal">
            <div className="footer-container">
                
                {/* 1. Quick Links / Navigation */}
                <div className="footer-links-minimal">
                    <a href="/privacy">Privacy Policy</a>
                    <span className="separator">|</span>
                    <a href="/support">Support</a>
                    <span className="separator">|</span>
                    <a href="/contact">Contact Us</a>
                </div>

                {/* 2. Copyright and Branding */}
                <p className="footer-copyright">
                    &copy; {currentYear} **AgriSense**. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
