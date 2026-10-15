"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ActiveTheoryBackgroundProps {
  className?: string;
  interactive?: boolean;
  ecoMode?: boolean;
}

export default function ActiveTheoryBackground({
  className = "",
  interactive = true,
  ecoMode = false,
}: ActiveTheoryBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous canvas if re-mounted (Fast Refresh protection)
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let isRunning = true;
    let animationFrameId: number;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.007);

    const aspect =
      (window.innerWidth || 1920) / (window.innerHeight || 1080);
    const camera = new THREE.PerspectiveCamera(55, aspect, 1, 1000);
    camera.position.set(0, -55, 45);
    camera.lookAt(0, 10, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        powerPreference: ecoMode ? "low-power" : "high-performance",
        antialias: !ecoMode,
        alpha: true,
      });
      renderer.setPixelRatio(ecoMode ? 1.0 : Math.min(window.devicePixelRatio || 1, 2.5));
      renderer.setSize(window.innerWidth || 1920, window.innerHeight || 1080);
      renderer.setClearColor(0x060913, 1);

      // Studio Cinematic Grade Tone Mapping & Color Management
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("[ActiveTheoryBackground] WebGL not available or supported:", err);
      return;
    }

    // --- Shaders for Active Theory Interactive Wave Field ---
    const waveVertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseSpeed;
      attribute float aScale;
      attribute vec3 aColor;

      varying vec3 vColor;
      varying float vAlpha;
      varying float vHeight;

      void main() {
        vec3 pos = position;

        // Multi-frequency Fluid Simplex-like Waves
        float wave1 = sin(pos.x * 0.045 + uTime * 0.85) * cos(pos.y * 0.04 + uTime * 0.7) * 8.5;
        float wave2 = sin((pos.x + pos.y) * 0.025 + uTime * 1.15) * 5.0;
        float wave3 = cos(length(pos.xy) * 0.035 - uTime * 0.6) * 4.0;
        float baseZ = wave1 + wave2 + wave3;
        pos.z += baseZ;

        // Real-time Mouse Repulsion & Dynamic Splash Shockwave
        // Project normalized mouse (-1 to 1) into ground plane coordinates (-70 to 70)
        vec2 mouseWorld = uMouse * vec2(65.0, 45.0);
        float dist = distance(pos.xy, mouseWorld);
        float repulsionRadius = 32.0;

        if (dist < repulsionRadius) {
          float normDist = dist / repulsionRadius;
          float force = smoothstep(1.0, 0.0, normDist);
          
          // Repel outward laterally
          vec2 dir = normalize(pos.xy - mouseWorld + vec2(0.001));
          pos.xy += dir * force * (7.0 + uMouseSpeed * 8.0);

          // Crest ripple wave on mouse impact
          float ripple = sin(dist * 0.45 - uTime * 4.0) * force * (8.0 + uMouseSpeed * 6.0);
          pos.z += ripple;
        }

        vHeight = pos.z;

        // Dynamic Color Blending based on height and wave tension
        // Warm Gold for crests, Sage Green for calm body, Deep Purple for troughs
        vec3 colorGold = vec3(0.83, 0.69, 0.22);    // #d4af37
        vec3 colorSage = vec3(0.56, 0.62, 0.49);    // #8f9e7d
        vec3 colorPurple = vec3(0.40, 0.18, 0.65);  // #662ea6
        vec3 colorStar = vec3(0.95, 0.92, 0.75);

        float heightNorm = clamp((pos.z + 10.0) / 22.0, 0.0, 1.0);
        vec3 mixedColor = mix(colorPurple, colorSage, smoothstep(0.1, 0.55, heightNorm));
        mixedColor = mix(mixedColor, colorGold, smoothstep(0.55, 0.9, heightNorm));
        
        // High crest sparkles
        if (heightNorm > 0.92) {
          mixedColor = mix(mixedColor, colorStar, (heightNorm - 0.92) * 10.0);
        }

        vColor = mix(aColor, mixedColor, 0.75);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Size Attenuation with Camera Distance
        float distToCam = -mvPosition.z;
        gl_PointSize = (aScale * 140.0) / distToCam;

        // Depth atmospheric fade
        vAlpha = smoothstep(150.0, 15.0, distToCam) * 0.9;
      }
    `;

    const waveFragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;
      varying float vHeight;

      void main() {
        // High-Fidelity Circular Point with smooth antialiased rim for 4K / Retina
        vec2 coord = gl_PointCoord - vec2(0.5);
        float d = length(coord);
        if (d > 0.5) discard;

        // Sub-pixel antialiased edge falloff to eliminate jagged edges on ultra-high DPI
        float rimAntialias = smoothstep(0.5, 0.46, d);

        // Inner core intensity + soft luminous outer aura
        float core = smoothstep(0.40, 0.0, d);
        float aura = pow(clamp(1.0 - d * 2.0, 0.0, 1.0), 2.2);
        float totalAlpha = (core * 0.45 + aura * 0.55) * vAlpha * rimAntialias;

        vec3 glowColor = vColor * (1.0 + aura * 0.5);
        gl_FragColor = vec4(glowColor, totalAlpha);
      }
    `;

    // --- Build Main Particle Grid (Eco: 45 x 36 = 1,620 | Normal: 110 x 90 = 9,900 particles) ---
    const gridX = ecoMode ? 45 : 110;
    const gridY = ecoMode ? 36 : 90;
    const particleCount = gridX * gridY;
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const width = 160;
    const height = 120;
    const stepX = width / gridX;
    const stepY = height / gridY;

    let index = 0;
    for (let ix = 0; ix < gridX; ix++) {
      for (let iy = 0; iy < gridY; iy++) {
        const x = ix * stepX - width / 2 + (Math.random() - 0.5) * 0.4;
        const y = iy * stepY - height / 2 + (Math.random() - 0.5) * 0.4;
        const z = (Math.random() - 0.5) * 1.5;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Varied particle scale
        scales[index] = 0.8 + Math.random() * 1.6;

        // Base color variation (subtle teal / gold / sage base)
        const randHue = Math.random();
        if (randHue > 0.65) {
          // Warm Gold base
          colors[index * 3] = 0.85;
          colors[index * 3 + 1] = 0.72;
          colors[index * 3 + 2] = 0.35;
        } else if (randHue > 0.25) {
          // Sage Green base
          colors[index * 3] = 0.52;
          colors[index * 3 + 1] = 0.62;
          colors[index * 3 + 2] = 0.50;
        } else {
          // Indigo/Purple base
          colors[index * 3] = 0.38;
          colors[index * 3 + 1] = 0.22;
          colors[index * 3 + 2] = 0.68;
        }

        index++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    waveGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    waveGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseSpeed: { value: 0 },
    };

    const waveMaterial = new THREE.ShaderMaterial({
      vertexShader: waveVertexShader,
      fragmentShader: waveFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // --- Drifting Celestial Floating Dust Field (Eco: 100 motes | Normal: 500 motes) ---
    const dustCount = ecoMode ? 100 : 500;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 140;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      dustPositions[i * 3 + 2] = Math.random() * 50 - 10;

      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.03;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
      dustVelocities[i * 3 + 2] = 0.02 + Math.random() * 0.04;

      const isGold = Math.random() > 0.5;
      dustColors[i * 3] = isGold ? 0.95 : 0.65;
      dustColors[i * 3 + 1] = isGold ? 0.82 : 0.85;
      dustColors[i * 3 + 2] = isGold ? 0.45 : 0.75;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );
    dustGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(dustColors, 3)
    );

    // Canvas sprite for soft star glow (128x128 for 4K / Retina fidelity)
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.2, "rgba(254, 240, 138, 0.85)");
        grad.addColorStop(0.5, "rgba(212, 175, 55, 0.4)");
        grad.addColorStop(0.8, "rgba(143, 151, 121, 0.15)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      return texture;
    };

    const dustTexture = createStarTexture();
    const dustMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: dustTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // --- Dynamic Mouse Physics & Interaction ---
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      speed: 0,
      prevX: 0,
      prevY: 0,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      // Normalized coordinates (-1 to 1)
      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // --- Window Resize Handler ---
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(ecoMode ? 1.0 : Math.min(window.devicePixelRatio || 1, 2.5));
    };

    window.addEventListener("resize", handleResize);

    // --- Render Loop (Locked 60 FPS Engine / Throttled 30 FPS in Eco Mode) ---
    const clock = new THREE.Clock();
    let lastRenderTime = 0;
    const frameInterval = ecoMode ? 1000 / 30 : 0; // Throttle rendering to ~30 FPS in Eco Mode for low CPU/battery consumption

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      if (ecoMode) {
        const now = performance.now();
        if (now - lastRenderTime < frameInterval) {
          return;
        }
        lastRenderTime = now;
      }

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Mouse Physics Lerp
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.06;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.06;

      const deltaX = mouse.currentX - mouse.prevX;
      const deltaY = mouse.currentY - mouse.prevY;
      const instantSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      mouse.speed += (instantSpeed - mouse.speed) * 0.1;
      mouse.prevX = mouse.currentX;
      mouse.prevY = mouse.currentY;

      uniforms.uMouse.value.set(mouse.currentX, mouse.currentY);
      uniforms.uMouseSpeed.value = Math.min(mouse.speed * 8.0, 2.5);

      // Subtle parallax camera rotation following mouse
      camera.position.x = mouse.currentX * 6.0;
      camera.position.y = -55 + mouse.currentY * 4.0;
      camera.lookAt(0, 10 + mouse.currentY * 3.0, 0);

      // Drifting dust update
      const dustPosAttr = dustGeometry.attributes.position as THREE.BufferAttribute;
      const dPositions = dustPosAttr.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        dPositions[i * 3] += dustVelocities[i * 3];
        dPositions[i * 3 + 1] += dustVelocities[i * 3 + 1];
        dPositions[i * 3 + 2] += dustVelocities[i * 3 + 2];

        // Wrap around ceiling
        if (dPositions[i * 3 + 2] > 40) {
          dPositions[i * 3 + 2] = -10;
        }
      }
      dustPosAttr.needsUpdate = true;

      // Slow orbital drift
      wavePoints.rotation.z = Math.sin(elapsedTime * 0.08) * 0.04;
      dustPoints.rotation.z = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // --- Clean Up Resources ---
    return () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      scene.clear();
      waveGeometry.dispose();
      waveMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      dustTexture.dispose();

      renderer.forceContextLoss?.();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [interactive, ecoMode]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
