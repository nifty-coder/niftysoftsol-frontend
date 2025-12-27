import { useState, useEffect, useRef } from 'react';

const useReveal = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Once it's visible, we can stop observing if we want it to stay animated
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            }
        }, {
            threshold: 0.1,
            ...options
        });

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return [elementRef, isVisible];
};

export default useReveal;
