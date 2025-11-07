import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        
        <footer className="agrisense-footer-minimal">
            <div className="footer-container">
                
              
                <div className="footer-links-minimal">
                    <a href="/privacy">Privacy Policy</a>
                    <span className="separator">|</span>
                    <a href="/support">Support</a>
                    <span className="separator">|</span>
                    <a href="/contact">Contact Us</a>
                </div>

                
                <p className="footer-copyright">
                    &copy; {currentYear} **AgriSense**. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
