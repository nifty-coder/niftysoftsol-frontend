import Hero from '../components/Hero';
import './About.css';
import useReveal from '../hooks/useReveal';

const About = () => {
    const [missionRef, missionVisible] = useReveal();
    const [storyRef, storyVisible] = useReveal();
    const [leadershipRef, leadershipVisible] = useReveal();
    const [ctaRef, ctaVisible] = useReveal();

    return (
        <div className="about-page">
            <div ref={missionRef} className={`reveal ${missionVisible ? 'reveal-visible' : ''}`}>
                <Hero
                    title="Our Mission"
                    subtitle="At Nifty Software Solutions, we are dedicated to bridging the technology gap through personalized one-on-one tutoring, expert corporate training in Cloud, Python, and Java, and the development of innovative software solutions that drive growth."
                    image="/images/mission.png"
                    ctaPrimary={{ text: 'Explore Services', link: '/services' }}
                />
            </div>

            <div ref={storyRef} className={`reveal ${storyVisible ? 'reveal-visible' : ''}`}>
                <Hero
                    reverse={true}
                    title="Our Story"
                    subtitle="What started as a passion for teaching has evolved into a global technology partner. From helping individuals master their first line of code in Java or Python to architecting complex cloud migrations for enterprises, our journey is defined by the success of our clients and students."
                    image="/images/Our Story.png"
                />
            </div>

            <div ref={leadershipRef} className={`reveal ${leadershipVisible ? 'reveal-visible' : ''}`}>
                <Hero
                    title="Experienced Leadership"
                    subtitle="The leadership team at Nifty Software Solutions brings together over four decades of combined experience in the software industry working with clients across USA, India, Japan, Africa, Australia and Europe."
                    image="/images/Leadership.png"
                />
            </div>

            <section ref={ctaRef} className={`section cta-banner reveal ${ctaVisible ? 'reveal-visible' : ''}`}>
                <div className="container">
                    <div className="glass cta-card fade-in">
                        <h2 className="hero-title">Ready to Start Your Journey?</h2>
                        <p className="hero-subtitle">Connect with our experts today and transform your business.</p>
                        <a href="https://forms.gle/DZ6C5FZvZ6dXQDZ3A" target="_blank" rel="noopener noreferrer" className="primary-btn">
                            Get Started Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
