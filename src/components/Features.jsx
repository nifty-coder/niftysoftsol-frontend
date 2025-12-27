import React from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            icon: 'fa-user-graduate',
            title: 'One-on-One Tutoring',
            description: 'Personalized mentoring to master complex concepts at your own pace.'
        },
        {
            icon: 'fa-users',
            title: 'Corporate Training',
            description: 'Empowering teams with industry-leading skills and technologies.'
        },
        {
            icon: 'fa-code',
            title: 'Software Solutions',
            description: 'Custom, scalable software developed for your unique business needs.'
        }
    ];

    return (
        <section className="features-section section">
            <div className="container">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-item fade-in">
                            <div className="feature-icon-wrapper">
                                <i className={`fa-solid ${feature.icon}`}></i>
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
