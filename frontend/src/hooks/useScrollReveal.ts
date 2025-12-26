import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useScrollReveal() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealElement = (element: HTMLElement) => {
            const direction = element.getAttribute('data-animate-direction') || 'up';
            const delay = parseFloat(element.getAttribute('data-animate-delay') || '0');

            let x = 0;
            let y = 0;

            if (direction === 'up') y = 50;
            if (direction === 'down') y = -50;
            if (direction === 'left') x = 50;
            if (direction === 'right') x = -50;

            gsap.fromTo(element,
                {
                    opacity: 0,
                    x: x,
                    y: y,
                    visibility: 'hidden'
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    visibility: 'visible',
                    duration: 0.8,
                    delay: delay,
                    ease: 'power3.out'
                }
            );
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealElement(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('[data-animate-direction]');
        elements.forEach((el) => {
            const element = el as HTMLElement;
            // Set initial state to hidden
            element.style.opacity = '0';
            element.style.visibility = 'hidden';

            // Check if already in view
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                revealElement(element);
            } else {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);
}
