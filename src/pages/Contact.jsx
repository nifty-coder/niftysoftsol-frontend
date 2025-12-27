import React, { useState, useEffect } from 'react';
import Mailcheck from 'mailcheck';
import './Contact.css';
import useReveal from '../hooks/useReveal';

const Contact = () => {
    const [heroRef, heroVisible] = useReveal();
    const [formRef, formVisible] = useReveal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'Cloud Solutions',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [suggestion, setSuggestion] = useState(null);

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const services = [
        'Corporate Training',
        'Cloud Training',
        'Software Development',
        'Other'
    ];

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (value && !/^[a-zA-Z\s]*$/.test(value)) {
                    error = 'Name can only contain letters and spaces';
                }
                break;
            case 'phone':
                if (value && !/^\d{0,10}$/.test(value)) {
                    // This case is handled by blocking input in handleChange, 
                    // but we validate length on blur or submit
                }
                break;
            case 'email':
                if (value && !/\S+@\S+\.\S+/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Specific handling for name (no numbers)
        if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
            return;
        }

        // Specific handling for phone (only digits, max 10)
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length > 10) return;
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            setErrors(prev => ({ ...prev, phone: digitsOnly.length === 10 || digitsOnly.length === 0 ? '' : 'Phone must be 10 digits' }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Email suggestion check
        if (name === 'email') {
            Mailcheck.run({
                email: value,
                suggested: (suggested) => {
                    setSuggestion(suggested.full);
                },
                empty: () => {
                    setSuggestion(null);
                }
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }

        if (name === 'phone' && value && value.length !== 10) {
            setErrors(prev => ({ ...prev, phone: 'Phone number must be exactly 10 digits' }));
        }
    };

    const validateEmailServer = async (email) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/validate-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            return data.valid;
        } catch (error) {
            console.error('Email validation error:', error);
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation check
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';

        if (formData.phone && formData.phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.message) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus({ submitting: false, submitted: false, error: 'Please fix the errors before submitting.' });
            return;
        }

        setStatus({ submitting: true, submitted: false, error: null });

        // Server-side reputation check
        const isEmailValid = await validateEmailServer(formData.email);
        if (!isEmailValid) {
            setErrors(prev => ({ ...prev, email: 'This email appears to be undeliverable or temporary.' }));
            setStatus({ submitting: false, submitted: false, error: 'Email validation failed.' });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus({ submitting: false, submitted: true, error: null });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: 'Cloud Solutions',
                    message: ''
                });
                setSuggestion(null);
            } else {
                setStatus({ submitting: false, submitted: false, error: data.message || 'Something went wrong. Please try again later.' });
            }
        } catch (error) {
            setStatus({ submitting: false, submitted: false, error: 'Failed to connect to the server. Please try again later.' });
        }
    };

    return (
        <div className="contact-page">
            <section ref={heroRef} className={`contact-hero reveal ${heroVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    <h1 className="text-gradient fade-in">Let's Build Something Nifty</h1>
                    <p className="subtitle fade-in">Ready to transform your digital landscape? Reach out to us for expert consulting, custom solutions, or professional training.</p>
                </div>
            </section>

            <section ref={formRef} className={`contact-section reveal ${formVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info glass fade-in">
                            <div className="info-item">
                                <span className="icon">📍</span>
                                <div>
                                    <h3>Our Location</h3>
                                    <p>Based in Texas | Virtual Business</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon">📞</span>
                                <div>
                                    <h3>Call Us</h3>
                                    <a href="tel:+19729870390">+1 (972) 987-0390</a>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon">📧</span>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>contact@niftysoftsol.com</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon">📱</span>
                                <div>
                                    <h3>Connect With Us</h3>
                                    <div className="contact-social-links">
                                        <a href="https://www.linkedin.com/company/nifty-software-solutions" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </a>
                                        <a href="https://instagram.com/niftysoftsol" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-instagram"></i>
                                        </a>
                                        <a href="https://www.facebook.com/profile.php?id=61568823336304" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container glass fade-in">
                            {status.submitted ? (
                                <div className="success-message text-center">
                                    <div className="success-icon">✓</div>
                                    <h2>Message Sent!</h2>
                                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setStatus({ ...status, submitted: false })}
                                        className="primary-btn success-btn"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="John Doe"
                                            className={errors.name ? 'input-error' : ''}
                                            required
                                        />
                                        {errors.name && <span className="field-error">{errors.name}</span>}
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="john@example.com"
                                                className={errors.email ? 'input-error' : ''}
                                                required
                                            />
                                            {suggestion && (
                                                <div className="mailcheck-suggestion">
                                                    Did you mean <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, email: suggestion }));
                                                            setSuggestion(null);
                                                            setErrors(prev => ({ ...prev, email: '' }));
                                                        }}
                                                    >
                                                        {suggestion}
                                                    </button>?
                                                </div>
                                            )}
                                            {errors.email && <span className="field-error">{errors.email}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="1234567890"
                                                className={errors.phone ? 'input-error' : ''}
                                            />
                                            {errors.phone && <span className="field-error">{errors.phone}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="service">Interested Service</label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                        >
                                            {services.map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Your Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="How can we help you?"
                                            rows="5"
                                            className={errors.message ? 'input-error' : ''}
                                            required
                                        ></textarea>
                                        {errors.message && <span className="field-error">{errors.message}</span>}
                                    </div>

                                    {status.error && <p className="status-error-message">{status.error}</p>}

                                    <button
                                        type="submit"
                                        className="primary-btn submit-btn"
                                        disabled={status.submitting}
                                    >
                                        {status.submitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
