import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

function destroyLenis() {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
}

function initLenis() {
    destroyLenis();
    
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        if (lenis) lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenis;
}

function setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement && lenis) {
                lenis.scrollTo(targetElement, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }
        });
    });
}

function initFadeUpAnimations() {
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    fadeUpElements.forEach(element => {
        gsap.set(element, { y: 50, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(element, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                });
            },
            once: true,
        });
    });
}

function initServicesAnimation() {
    const servicesList = document.querySelector('.services-list');
    if (!servicesList) return;
    
    const items = servicesList.querySelectorAll('.service-item');
    
    gsap.set(items, { y: 50, opacity: 0 });
    
    ScrollTrigger.create({
        trigger: servicesList,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(items, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            });
        },
        once: true,
    });
}

function initMagneticLinks() {
    const links = document.querySelectorAll('.magnetic-link');
    
    links.forEach(link => {
        const moveHandler = (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(link, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        };
        
        const leaveHandler = () => {
            gsap.to(link, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        };
        
        link.addEventListener('mousemove', moveHandler);
        link.addEventListener('mouseleave', leaveHandler);
    });
}

function initProjectCardsAnimation() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    const cards = projectsGrid.querySelectorAll('.project-card');
    
    cards.forEach((card, i) => {
        gsap.set(card, { y: 50, opacity: 0 });
        
        ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: (i % 2) * 0.1,
                });
            },
            once: true,
        });
    });
}

export function cleanupAnimations() {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf('*');
    ScrollTrigger.clearScrollMemory();
    destroyLenis();
}

export function initAnimations() {
    cleanupAnimations();
    
    initLenis();
    
    ScrollTrigger.config({
        ignoreMobileResize: true,
    });
    
    setTimeout(() => {
        ScrollTrigger.refresh();
        
        initFadeUpAnimations();
        initServicesAnimation();
        initMagneticLinks();
        initProjectCardsAnimation();
        setupAnchorLinks();
        
        ScrollTrigger.refresh();
    }, 100);
}

export function getLenis() {
    return lenis;
}

export function animateHeroText(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    elements.forEach(element => {
        gsap.fromTo(element, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                delay: 0.3
            }
        );
    });
}
