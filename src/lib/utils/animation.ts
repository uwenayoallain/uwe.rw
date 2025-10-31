import Lenis from 'lenis';
import type { LenisOptions } from 'lenis';
import gsap from 'gsap';

import { clamp } from './math';

type RAFCallback = (time: number) => void;

const rafCallbacks = new Set<RAFCallback>();
let rafId: number | undefined;

const loop = (time: number) => {
  rafCallbacks.forEach((cb) => cb(time));
  rafId = requestAnimationFrame(loop);
};

const ensureLoop = () => {
  if (rafId === undefined && rafCallbacks.size) {
    rafId = requestAnimationFrame(loop);
  }
};

export const addToRaf = (callback: RAFCallback) => {
  rafCallbacks.add(callback);
  ensureLoop();
  return () => {
    rafCallbacks.delete(callback);
    if (!rafCallbacks.size && rafId !== undefined) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }
  };
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export const createLenis = (options?: LenisOptions) => {
  const lenis = new Lenis({
    duration: 1.2,
    gestureOrientation: 'vertical',
    smoothWheel: true,
    ...options
  });

  if (!prefersReducedMotion()) {
    const removeFromRaf = addToRaf((time) => lenis.raf(time));
    const destroy = lenis.destroy.bind(lenis);
    lenis.destroy = () => {
      removeFromRaf();
      destroy();
    };
  }

  return lenis;
};

export const createTimeline = (vars?: gsap.TimelineVars) =>
  gsap.timeline({
    defaults: { ease: 'power2.out', duration: 0.9 },
    paused: true,
    ...vars
  });

export const animateIn = (element: Element, delay = 0, y = 40) =>
  gsap.fromTo(
    element,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay
    }
  );

export const scrubValue = ({
  progress,
  from = 0,
  to = 1,
  ease = 'power2.out'
}: {
  progress: number;
  from?: number;
  to?: number;
  ease?: gsap.EaseString;
}) => {
  const eased = gsap.parseEase(ease)(clamp(progress));
  return from + (to - from) * eased;
};

export const scrollTo = (target: number | string | Element, vars?: gsap.TweenVars) =>
  import('gsap/ScrollToPlugin').then(({ ScrollToPlugin }) => {
    gsap.registerPlugin(ScrollToPlugin);
    return gsap.to(window, {
      duration: 1,
      ease: 'power2.out',
      scrollTo: target,
      ...vars
    });
  });
