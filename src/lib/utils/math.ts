/**
 * Math helpers tuned for animation-heavy frontends.
 */

export const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(Math.max(value, min), max);

export const lerp = (start: number, end: number, t: number): number =>
  start + (end - start) * clamp(t);

export const damp = (current: number, target: number, smoothing = 12, dt = 1 / 60): number => {
  const lambda = 1 - Math.exp(-smoothing * dt);
  return current + (target - current) * lambda;
};

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampResult = true
): number => {
  const mapped =
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin + Number.EPSILON) + outMin;
  return clampResult ? clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax)) : mapped;
};

export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export const randomInRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const modulo = (value: number, length: number): number =>
  ((value % length) + length) % length;
