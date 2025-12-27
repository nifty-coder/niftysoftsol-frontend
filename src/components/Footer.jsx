import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <img src="/images/NiftySS Logo.png" alt="NiftySS Logo" className="footer-logo" />
                    <p className="footer-desc">
                        Empowering your digital transformation journey with expert cloud training,
                        tailored software solutions, and strategic consultancy.
                    </p>
                    <div className="footer-social-links">
                        <a href="https://www.linkedin.com/company/nifty-software-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61568823336304" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/niftysoftsol" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-links-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-contact-section">
                    <h4>Contact Us</h4>
                    <ul className="footer-contact">
                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <a href="mailto:contact@niftysoftsol.com">contact@niftysoftsol.com</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-phone"></i>
                            <a href="tel:+19729870390">+1 (972) 987-0390</a>
                        </li>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Based in Texas | Virtual Business</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Nifty Software Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
