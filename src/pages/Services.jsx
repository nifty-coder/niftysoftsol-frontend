import ServiceCard from '../components/ServiceCard';
import './Services.css';
import useReveal from '../hooks/useReveal';

const Services = () => {
    const [headerRef, headerVisible] = useReveal();
    const [gridRef, gridVisible] = useReveal();

    const services = [
        {
            title: "One-on-One Tutoring",
            description: "Unlock your potential with tailored learning experiences. Our personalized tutoring sessions focus on deep conceptual clarity in Cloud Technologies, Python, and Java, designed to meet your specific career goals and learning pace.",
            image: "/images/General.jpg",
            linkText: "Get Started",
        },
        {
            title: "Corporate Training",
            description: "Empower your workforce with industry-leading expertise. We deliver comprehensive training programs in Cloud Architecture, Modern Programming, and DevOps, enabling teams to scale operations and drive digital innovation.",
            image: "/images/cloud.jpeg",
            linkText: "Schedule Training",
        },
        {
            title: "Software Solutions",
            description: "Transform your vision into reality with our end-to-end development services. From cloud-native applications to scalable enterprise architectures, we build robust, extensible software that solves complex business challenges.",
            image: "/images/Software solutions.jpg",
            linkText: "Discuss Your Project",
        }
    ];

    return (
        <div className="services-page">
            <section ref={headerRef} className={`section page-header-section reveal ${headerVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    <h1 className="hero-title text-gradient">Our Services</h1>
                </div>
            </section>

            <section ref={gridRef} className={`section services-grid-section reveal ${gridVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} link="/contact" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
