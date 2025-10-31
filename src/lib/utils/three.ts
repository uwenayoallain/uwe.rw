import { Clock, Color, PerspectiveCamera, Scene, WebGLRenderer, type Vector3 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import Stats from 'stats.js';

type RendererConfig = {
  canvas: HTMLCanvasElement;
  clearColor?: string | number | Color;
  pixelRatio?: number;
  alpha?: boolean;
};

export type ThreeContext = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  composer: EffectComposer;
  stats?: Stats;
  clock: Clock;
  resize: () => void;
  destroy: () => void;
};

export const createThreeContext = ({
  canvas,
  clearColor = 0x000000,
  pixelRatio = Math.min(window.devicePixelRatio, 2),
  alpha = false
}: RendererConfig): ThreeContext => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(0, 0, 5);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha });
  renderer.setClearColor(clearColor as Color);
  renderer.setPixelRatio(pixelRatio);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const clock = new Clock();

  const stats =
    process.env.NODE_ENV === 'development'
      ? (() => {
          const instance = new Stats();
          instance.showPanel(0);
          document.body.appendChild(instance.dom);
          return instance;
        })()
      : undefined;

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height || 1;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
  };

  const destroy = () => {
    if (stats) {
      document.body.removeChild(stats.dom);
    }
    composer.dispose();
    renderer.dispose();
  };

  resize();
  window.addEventListener('resize', resize);

  return {
    scene,
    camera,
    renderer,
    composer,
    stats,
    clock,
    resize,
    destroy: () => {
      window.removeEventListener('resize', resize);
      destroy();
    }
  };
};

export const updateOrbitTarget = (camera: PerspectiveCamera, target: Vector3) => {
  camera.lookAt(target);
};
