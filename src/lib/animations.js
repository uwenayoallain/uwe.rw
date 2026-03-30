import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let globalResizeObserver = null;
let hasInitialized = false;

function destroyLenis() {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initLenis() {
    destroyLenis();

    if (prefersReducedMotion()) return null;

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

    gsap.ticker.lagSmoothing(500, 33);

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

function initFadeUpAnimations(isFirstLoad) {
    if (prefersReducedMotion()) return;

    const fadeUpElements = document.querySelectorAll('.fade-up');

    fadeUpElements.forEach(element => {
        // On view transitions, show elements already in viewport immediately
        if (!isFirstLoad) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                gsap.set(element, { y: 0, opacity: 1, clearProps: "transform" });
                return;
            }
        }

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
                    onComplete: () => {
                        // Clear transform so CSS hover effects can work
                        if (getComputedStyle(element).transition !== 'all 0s ease 0s') {
                            gsap.set(element, { clearProps: "transform" });
                        }
                    }
                });
            },
            once: true,
        });
    });
}

function initServicesAnimation() {
    if (prefersReducedMotion()) return;

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
                onComplete: () => {
                    gsap.set(items, { clearProps: "transform" });
                }
            });
        },
        once: true,
    });
}

function initMagneticLinks() {
    if (prefersReducedMotion()) return;

    const links = document.querySelectorAll('.magnetic-link');

    links.forEach(link => {
        if (link._moveHandler) link.removeEventListener('mousemove', link._moveHandler);
        if (link._leaveHandler) link.removeEventListener('mouseleave', link._leaveHandler);

        const moveHandler = (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(link, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true,
            });
        };

        const leaveHandler = () => {
            gsap.to(link, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                overwrite: true,
            });
        };

        link._moveHandler = moveHandler;
        link._leaveHandler = leaveHandler;

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
                    onComplete: () => {
                        gsap.set(card, { clearProps: "transform" });
                    }
                });
            },
            once: true,
        });
    });
}

export function cleanupAnimations() {
    document.querySelectorAll('.magnetic-link').forEach(link => {
        if (link._moveHandler) link.removeEventListener('mousemove', link._moveHandler);
        if (link._leaveHandler) link.removeEventListener('mouseleave', link._leaveHandler);
    });
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf('*');
    ScrollTrigger.clearScrollMemory();
    destroyLenis();
    if (globalResizeObserver) {
        globalResizeObserver.disconnect();
        globalResizeObserver = null;
    }
}

export function initAnimations() {
    // NOTE: Do NOT call cleanupAnimations() here.
    // Component scripts (Hero, Footer, etc.) register their own ScrollTriggers
    // during astro:page-load BEFORE this function runs. Calling cleanup here
    // would kill those animations. Cleanup is handled by astro:before-swap
    // in Layout.astro instead.

    const isFirstLoad = !hasInitialized;
    hasInitialized = true;

    initLenis();

    ScrollTrigger.config({
        ignoreMobileResize: true,
    });

    initFadeUpAnimations(isFirstLoad);
    initServicesAnimation();
    initMagneticLinks();
    initProjectCardsAnimation();
    setupAnchorLinks();

    ScrollTrigger.refresh();

    // Mark as loaded so CSS pre-hiding doesn't apply on subsequent view transitions
    document.documentElement.classList.add('js-loaded');

    // Backup refresh to handle font/image loading shifts
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    // Robust observer for layout shifts (e.g., lazy loaded images in View Transitions)
    if (!globalResizeObserver) {
        let resizeTimer = null;
        globalResizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        });
    }
    globalResizeObserver.observe(document.body);
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
