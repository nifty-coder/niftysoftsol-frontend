import React, { useState, useEffect } from 'react';
import './Products.css';
import useReveal from '../hooks/useReveal';

const Products = () => {
    const [headerRef, headerVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
                const response = await fetch(`${apiUrl}/api/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-page">
            <section ref={headerRef} className={`section page-header-section reveal ${headerVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    <h1 className="hero-title text-gradient">Our Products</h1>
                    <p className="section-subtitle">Innovative software solutions built with cutting-edge technology.</p>
                </div>
            </section>

            <section ref={gridRef} className={`section products-grid-section reveal ${gridVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    {loading ? (
                        <div className="text-center" style={{ padding: '4rem 0' }}>
                            <div className="loading-spinner"></div>
                            <p>Loading products...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center" style={{ padding: '4rem 0', color: 'var(--error-color)' }}>
                            <p>Error: {error}</p>
                            <button onClick={() => window.location.reload()} className="primary-btn" style={{ marginTop: '1rem' }}>
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map((product, index) => (
                                <div key={product._id || index} className="product-card">
                                    <div className="product-info">
                                        <h2>{product.title}</h2>
                                        <h4 className="text-gradient" style={{ marginBottom: '1rem' }}>{product.subtitle}</h4>
                                        <p>{product.description}</p>
                                        <div className="product-links">
                                            <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="primary-btn"
                                            >
                                                {product.linkText}
                                            </a>
                                            {product.linkedInPost && (
                                                <a
                                                    href={product.linkedInPost}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="product-link"
                                                >
                                                    <i className="fa-brands fa-linkedin"></i> Learn More <i className="fa-solid fa-arrow-right"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};


export default Products;
