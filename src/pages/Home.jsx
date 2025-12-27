import Hero from '../components/Hero';
import Features from '../components/Features';
import './Home.css';
import useReveal from '../hooks/useReveal';

const Home = () => {
    const [heroRef, heroVisible] = useReveal();
    const [featuresRef, featuresVisible] = useReveal();
    const [ctaRef, ctaVisible] = useReveal();

    return (
        <div className="home-page">
            <div ref={heroRef} className={`reveal ${heroVisible ? 'reveal-visible' : ''}`}>
                <Hero
                    title="Empowering Your Digital Transformation Journey"
                    subtitle="Nifty Software Solutions offers comprehensive training, software solutions, and tutoring services to help businesses and individuals harness the power of cloud technologies."
                    image="/images/tech-hero.png"
                    ctaPrimary={{ text: 'Explore Services', link: '/services' }}
                    ctaSecondary={{ text: 'Learn More', link: '/about' }}
                />
            </div>

            <div ref={featuresRef} className={`reveal ${featuresVisible ? 'reveal-visible' : ''}`}>
                <Features />
            </div>

            <div ref={ctaRef} className={`reveal ${ctaVisible ? 'reveal-visible' : ''}`}>
                <Hero
                    reverse={true}
                    title="Personalized Tutoring & Corporate Excellence"
                    subtitle="From one-on-one sessions to comprehensive corporate training in Cloud, Python, and Java, we provide the expertise needed to excel in today's digital landscape."
                    image="/images/General.jpg"
                    ctaPrimary={{ text: 'Get Started', link: '/contact' }}
                />
            </div>
        </div>
    );
};

export default Home;
