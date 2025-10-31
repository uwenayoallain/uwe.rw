type Cleanup = () => void;

export const on = <K extends keyof WindowEventMap>(
  target: Window | Document | HTMLElement,
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
): Cleanup => {
  target.addEventListener(type, handler as EventListener, options);
  return () => target.removeEventListener(type, handler as EventListener, options);
};

export const onResize = (handler: () => void, options?: AddEventListenerOptions) =>
  on(window, 'resize', handler, options);

export const onVisibilityChange = (handler: (hidden: boolean) => void): Cleanup => {
  const listener = () => handler(document.hidden);
  document.addEventListener('visibilitychange', listener, { passive: true });
  return () => document.removeEventListener('visibilitychange', listener);
};

export const onIntersect = (
  element: Element,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): Cleanup => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => callback(entry));
  }, options);
  observer.observe(element);
  return () => observer.disconnect();
};

export const lockScroll = () => {
  const original = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  return () => {
    document.documentElement.style.overflow = original;
  };
};

export const setCSSVar = (name: string, value: string | number, element: HTMLElement | null = null) => {
  const target = element ?? document.documentElement;
  target.style.setProperty(name, typeof value === 'number' ? `${value}` : value);
};

export const prefersDark = () =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;

export const isTouchDevice = () =>
  typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false;
