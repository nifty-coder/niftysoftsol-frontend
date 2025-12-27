import React from 'react';
import './Hero.css';

const Hero = ({ title, subtitle, image, ctaPrimary, ctaSecondary, reverse = false }) => {
    return (
        <section className={`hero-section ${reverse ? 'reverse' : ''}`}>
            <div className="container hero-grid">
                <div className="hero-content fade-in">
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-subtitle">{subtitle}</p>
                    <div className="hero-actions">
                        {ctaPrimary && (
                            <a href={ctaPrimary.link} className="primary-btn">
                                {ctaPrimary.text}
                            </a>
                        )}
                        {ctaSecondary && (
                            <a href={ctaSecondary.link} className="secondary-btn">
                                {ctaSecondary.text}
                            </a>
                        )}
                    </div>
                </div>
                {image && (
                    <div className="hero-image-wrapper">
                        <img src={image} alt={title} className="hero-image" />
                        <div className="image-glow"></div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
