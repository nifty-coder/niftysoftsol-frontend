import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ title, description, image, linkText, link }) => {
    return (
        <div className="service-card glass fade-in">
            <div className="service-image-container">
                <img src={image} alt={title} className="service-image" />
            </div>
            <div className="service-content">
                <h3 className="service-title">{title}</h3>
                <p className="service-description">{description}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="primary-btn">
                    {linkText}
                </a>
            </div>
        </div>
    );
};

export default ServiceCard;
