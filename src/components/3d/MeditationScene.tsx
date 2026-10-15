"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type BreathingPhase = "inhale" | "hold-in" | "exhale" | "hold-out";

interface MeditationSceneProps {
  phase?: BreathingPhase;
  progress?: number; // 0 to 1 within the current 4s phase
  isStarted?: boolean;
  onStrikeBowl?: () => void;
  strikeTrigger?: number; // increments on each bowl strike
}

export default function MeditationScene({
  phase = "inhale",
  progress = 0,
  isStarted = true,
  onStrikeBowl,
  strikeTrigger = 0,
}: MeditationSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const strikeTriggerRef = useRef(strikeTrigger);
  const onStrikeBowlRef = useRef(onStrikeBowl);
  const phaseRef = useRef(phase);
  const progressRef = useRef(progress);
  const isStartedRef = useRef(isStarted);

  useEffect(() => {
    strikeTriggerRef.current = strikeTrigger;
  }, [strikeTrigger]);

  useEffect(() => {
    onStrikeBowlRef.current = onStrikeBowl;
  }, [onStrikeBowl]);

  useEffect(() => {
    phaseRef.current = phase;
    progressRef.current = progress;
    isStartedRef.current = isStarted;
  }, [phase, progress, isStarted]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let isRunning = true;
    let animationFrameId: number;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 8.5);
    camera.lookAt(0, 0.4, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x060913, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("Meditation WebGL init error:", e);
      return;
    }

    // --- Lighting Architecture ---
    const ambientLight = new THREE.AmbientLight(0x94a3b8, 0.8);
    scene.add(ambientLight);

    const centerBowlLight = new THREE.PointLight(0xfef08a, 3.2, 12);
    centerBowlLight.position.set(0, 1.2, 0);
    scene.add(centerBowlLight);

    const jadeAccentLight = new THREE.PointLight(0x728f7d, 2.0, 16);
    jadeAccentLight.position.set(-4, 3, 2);
    scene.add(jadeAccentLight);

    const warmGoldLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    warmGoldLight.position.set(4, 7, 5);
    scene.add(warmGoldLight);

    // --- 1. Authentic Tibetan Singing Bowl (Chuông Xoay Tây Tạng Cổ) ---
    // Constructed via precision Spline Lathe geometry
    const bowlPoints: THREE.Vector2[] = [];
    // Base thickness & curving profile of antique Himalayan singing bowl
    bowlPoints.push(new THREE.Vector2(0.01, -0.65));
    bowlPoints.push(new THREE.Vector2(0.65, -0.65));
    bowlPoints.push(new THREE.Vector2(1.25, -0.45));
    bowlPoints.push(new THREE.Vector2(1.65, -0.05));
    bowlPoints.push(new THREE.Vector2(1.85, 0.55));
    bowlPoints.push(new THREE.Vector2(1.92, 0.95));
    bowlPoints.push(new THREE.Vector2(1.88, 1.05)); // thick rim lip
    bowlPoints.push(new THREE.Vector2(1.78, 1.02));
    bowlPoints.push(new THREE.Vector2(1.72, 0.75)); // inner wall
    bowlPoints.push(new THREE.Vector2(1.50, 0.25));
    bowlPoints.push(new THREE.Vector2(1.10, -0.25));
    bowlPoints.push(new THREE.Vector2(0.55, -0.52));
    bowlPoints.push(new THREE.Vector2(0.01, -0.55));

    const bowlGeometry = new THREE.LatheGeometry(bowlPoints, 64);
    bowlGeometry.computeVertexNormals();

    // Procedural Hammered Antique Bronze & Inscribed Sanskrit Texture
    const bowlTextureCanvas = document.createElement("canvas");
    bowlTextureCanvas.width = 1024;
    bowlTextureCanvas.height = 512;
    const bCtx = bowlTextureCanvas.getContext("2d");
    if (bCtx) {
      // Bronze brass gradient
      const bgGrad = bCtx.createLinearGradient(0, 0, 1024, 512);
      bgGrad.addColorStop(0, "#8a6d2b");
      bgGrad.addColorStop(0.3, "#c9a44c");
      bgGrad.addColorStop(0.7, "#e5c368");
      bgGrad.addColorStop(1, "#9c7931");
      bCtx.fillStyle = bgGrad;
      bCtx.fillRect(0, 0, 1024, 512);

      // Engraved Tibetan sacred bands
      bCtx.strokeStyle = "rgba(45, 30, 8, 0.65)";
      bCtx.lineWidth = 6;
      bCtx.strokeRect(0, 80, 1024, 40);
      bCtx.strokeRect(0, 160, 1024, 50);

      // Decorative dots & lotus petals
      bCtx.fillStyle = "rgba(255, 240, 180, 0.5)";
      for (let i = 0; i < 32; i++) {
        bCtx.beginPath();
        bCtx.arc(i * 32 + 16, 100, 5, 0, Math.PI * 2);
        bCtx.fill();
      }

      // Inscribed Sanskrit Om Mani Padme Hum stylized glyphs
      bCtx.fillStyle = "rgba(50, 35, 10, 0.75)";
      bCtx.font = "bold 28px serif";
      for (let i = 0; i < 8; i++) {
        bCtx.fillText("ॐ मणि पद्मे हूँ", i * 130 + 10, 195);
      }
    }
    const bowlTexture = new THREE.CanvasTexture(bowlTextureCanvas);

    const bowlMaterial = new THREE.MeshStandardMaterial({
      map: bowlTexture,
      color: 0xe0be65,
      metalness: 0.88,
      roughness: 0.28,
    });

    const bowlMesh = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowlMesh.position.set(0, 0.45, 0);

    const bowlGroup = new THREE.Group();
    bowlGroup.add(bowlMesh);
    scene.add(bowlGroup);

    // Cushion base (Đệm thiền gấm vàng sen dưới đáy chuông)
    const cushionGeo = new THREE.CylinderGeometry(0.95, 1.25, 0.22, 32);
    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x852a36, // deep crimson Tibetan silk
      roughness: 0.85,
      metalness: 0.1,
    });
    const cushionMesh = new THREE.Mesh(cushionGeo, cushionMat);
    cushionMesh.position.set(0, -0.22, 0);
    bowlGroup.add(cushionMesh);

    // --- 1.2 Tibetan Wooden Puja Striker Mallet (Dùi Gõ Chuông Bằng Gỗ Tây Tạng Cổ) ---
    const malletGroup = new THREE.Group();
    // Base hovering coordinates beside bowl rim
    const malletRestPos = new THREE.Vector3(2.25, 1.35, 0.65);
    const malletRestRot = new THREE.Euler(0.35, -0.38, -0.58);
    malletGroup.position.copy(malletRestPos);
    malletGroup.rotation.copy(malletRestRot);

    // Hardwood Handle (Gỗ hồng sắc / Teakwood đánh bóng)
    const handleGeo = new THREE.CylinderGeometry(0.065, 0.08, 1.85, 24);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0x5a311b, // Rich Tibetan rosewood
      roughness: 0.38,
      metalness: 0.12,
    });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.set(0, 0.75, 0);
    malletGroup.add(handleMesh);

    // Rounded Pommel Top Cap
    const pommelGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const pommelMesh = new THREE.Mesh(pommelGeo, handleMat);
    pommelMesh.position.set(0, 1.68, 0);
    malletGroup.add(pommelMesh);

    // Brass Collar / Ferrule (Vành đồng khảm vàng nối giữa thân gỗ & đầu bọc dạ)
    const collarGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.14, 24);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.88,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.set(0, -0.15, 0);
    malletGroup.add(collarMesh);

    // Suede / Leather Wrapped Striker Head (Đầu dùi bọc dạ nỉ nhung cao cấp để gõ êm vang)
    const strikerHeadGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.85, 24);
    const strikerHeadMat = new THREE.MeshStandardMaterial({
      color: 0x2b1c14, // Dark Tibetan leather/felt
      roughness: 0.92,
      metalness: 0.05,
    });
    const strikerHeadMesh = new THREE.Mesh(strikerHeadGeo, strikerHeadMat);
    strikerHeadMesh.position.set(0, -0.62, 0);
    malletGroup.add(strikerHeadMesh);

    // Striker Head Rounded Tip
    const tipGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const tipMesh = new THREE.Mesh(tipGeo, strikerHeadMat);
    tipMesh.position.set(0, -1.04, 0);
    malletGroup.add(tipMesh);

    scene.add(malletGroup);

    // --- 2. Sacred Mandala Quantum Wave Rings (Vòng Sóng Lượng Tử Mandala) ---
    const mandalaGroup = new THREE.Group();
    mandalaGroup.position.set(0, 0.5, 0);
    scene.add(mandalaGroup);

    // Ring 1: Inner Sacred Hexagram Star & Concentric Ring
    const innerRingGeo = new THREE.RingGeometry(2.1, 2.14, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = Math.PI / 2;
    mandalaGroup.add(innerRingMesh);

    // Ring 2: Sri Yantra 12-Fold Sacred Flower Polygon
    const petalsCount = 12;
    const petalPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= petalsCount; i++) {
      const angle = (i * Math.PI * 2) / petalsCount;
      const rOuter = 2.85;
      const rInner = 2.45;
      petalPoints.push(new THREE.Vector3(Math.cos(angle) * rOuter, 0, Math.sin(angle) * rOuter));
      const midAngle = angle + Math.PI / petalsCount;
      petalPoints.push(new THREE.Vector3(Math.cos(midAngle) * rInner, 0, Math.sin(midAngle) * rInner));
    }
    const petalGeo = new THREE.BufferGeometry().setFromPoints(petalPoints);
    const petalMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const petalLine = new THREE.Line(petalGeo, petalMat);
    mandalaGroup.add(petalLine);

    // Ring 3: Concentric Quantum Wave Orbitals (Dotted Points)
    const orbitalPointsCount = 280;
    const orbitalGeo = new THREE.BufferGeometry();
    const orbitalPositions = new Float32Array(orbitalPointsCount * 3);
    const orbitalColors = new Float32Array(orbitalPointsCount * 3);

    const cGold = new THREE.Color(0xd4af37);
    const cJade = new THREE.Color(0x728f7d);

    for (let i = 0; i < orbitalPointsCount; i++) {
      const angle = (i * Math.PI * 2) / orbitalPointsCount;
      const radius = 3.6 + Math.sin(i * 0.4) * 0.15;
      orbitalPositions[i * 3] = Math.cos(angle) * radius;
      orbitalPositions[i * 3 + 1] = Math.sin(angle * 6) * 0.12;
      orbitalPositions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = i % 2 === 0 ? cGold : cJade;
      orbitalColors[i * 3] = col.r;
      orbitalColors[i * 3 + 1] = col.g;
      orbitalColors[i * 3 + 2] = col.b;
    }
    orbitalGeo.setAttribute("position", new THREE.BufferAttribute(orbitalPositions, 3));
    orbitalGeo.setAttribute("color", new THREE.BufferAttribute(orbitalColors, 3));

    const orbitalMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const orbitalPointsMesh = new THREE.Points(orbitalGeo, orbitalMat);
    mandalaGroup.add(orbitalPointsMesh);

    // Ring 4: Outer Infinite Luminous Ring (Radius 4.7)
    const outerRingGeo = new THREE.RingGeometry(4.65, 4.75, 96);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x728f7d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2;
    mandalaGroup.add(outerRingMesh);

    // --- 3. Shaders: Mặt Nước Thiền Zen & Sóng Gợn Chuột (Zen Water Ripple Plane) ---
    const waterVertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseSpeed;
      uniform float uRippleTime;
      uniform vec2 uRipplePos;
      uniform float uBreathScale;

      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vWorldPosition;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Ambient gentle fluid ripples
        float wave1 = sin(pos.x * 0.65 + uTime * 0.85) * cos(pos.y * 0.65 + uTime * 0.75) * 0.09;
        float wave2 = sin(length(pos.xy) * 0.85 - uTime * 1.1) * 0.06;
        float height = wave1 + wave2;

        // Interactive mouse ripples
        float distToMouse = distance(pos.xy, uMouse);
        if (distToMouse < 4.5) {
          float normDist = distToMouse / 4.5;
          float mouseForce = smoothstep(1.0, 0.0, normDist);
          float mouseRipple = sin(distToMouse * 5.0 - uTime * 4.5) * mouseForce * (0.16 + uMouseSpeed * 0.15);
          height += mouseRipple;
        }

        // Bowl Strike shockwave ripple
        if (uRippleTime > 0.0 && uRippleTime < 4.0) {
          float distToOrigin = length(pos.xy);
          float ringDist = abs(distToOrigin - uRippleTime * 3.8);
          if (ringDist < 1.2) {
            float ringForce = smoothstep(1.2, 0.0, ringDist);
            float strikeRipple = sin(ringDist * 4.0) * ringForce * 0.28 * exp(-uRippleTime * 0.8);
            height += strikeRipple;
          }
        }

        // Breathing modulation
        pos.z += height * uBreathScale;
        vElevation = pos.z;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const waterFragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vWorldPosition;

      void main() {
        // Distance from center for radial vignette
        float dist = length(vUv - vec2(0.5));
        float alpha = smoothstep(0.48, 0.15, dist);

        // Water Colors
        vec3 deepWater = vec3(0.024, 0.035, 0.075);   // #060913
        vec3 goldCrest  = vec3(0.83, 0.69, 0.22);     // #d4af37
        vec3 jadeShine  = vec3(0.45, 0.56, 0.49);     // #728f7d

        // Elevation-based coloring (crests reflect gold/jade)
        float crestFactor = smoothstep(0.01, 0.14, vElevation);
        vec3 color = mix(deepWater, jadeShine, crestFactor * 0.8);
        color = mix(color, goldCrest, smoothstep(0.08, 0.22, vElevation));

        // High-frequency Zen Water Optical Caustics (Gold & Emerald Caustics)
        vec2 cp1 = vUv * 38.0;
        vec2 cp2 = vUv * 26.0;
        float waveC1 = sin(cp1.x * 0.85 + uTime * 1.5) * cos(cp1.y * 0.85 - uTime * 1.3);
        float waveC2 = cos(cp2.x * 1.35 - uTime * 1.1) * sin(cp2.y * 1.35 + uTime * 1.6);
        float waveC3 = sin((cp1.x + cp2.y) * 0.75 + uTime * 2.0);
        float causticsFactor = pow(abs(waveC1 + waveC2 + waveC3) / 3.0, 3.2) * 2.6;

        // Luminous gold & emerald chromatic dispersion
        vec3 goldCaustic = vec3(0.99, 0.94, 0.56);    // Shimmering Gold #fef08a
        vec3 emeraldCaustic = vec3(0.20, 0.85, 0.58); // Shimmering Jade/Emerald #34d399
        vec3 causticCol = mix(goldCaustic, emeraldCaustic, sin(uTime * 1.6 + vUv.x * 7.0) * 0.5 + 0.5);

        float causticMask = (0.28 + crestFactor * 0.72) * (1.0 - smoothstep(0.42, 0.49, dist));
        color += causticCol * causticsFactor * causticMask * 0.75;

        // Center lotus reflection glow
        float centerDist = length(vWorldPosition.xz);
        float centerGlow = smoothstep(3.2, 0.0, centerDist) * 0.25;
        color += goldCrest * centerGlow;

        gl_FragColor = vec4(color, alpha * 0.88);
      }
    `;

    const waterUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseSpeed: { value: 0 },
      uRippleTime: { value: -1 },
      uRipplePos: { value: new THREE.Vector2(0, 0) },
      uBreathScale: { value: 1.0 },
    };

    const waterGeo = new THREE.PlaneGeometry(16, 16, 90, 90);
    const waterMat = new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: waterUniforms,
      transparent: true,
      depthWrite: false,
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.set(0, -0.65, 0);
    waterMesh.rotation.x = -Math.PI / 2;
    scene.add(waterMesh);

    // --- 4. Spiritual Prana Dust Vortex (Hào Quang Hạt Tâm Linh) ---
    const pranaCount = 1200;
    const pranaGeo = new THREE.BufferGeometry();
    const pranaPositions = new Float32Array(pranaCount * 3);
    const pranaColors = new Float32Array(pranaCount * 3);
    const pranaVelocities = new Float32Array(pranaCount * 3);

    for (let i = 0; i < pranaCount; i++) {
      const radius = 0.8 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      pranaPositions[i * 3] = Math.cos(angle) * radius;
      pranaPositions[i * 3 + 1] = -0.5 + Math.random() * 3.8;
      pranaPositions[i * 3 + 2] = Math.sin(angle) * radius;

      pranaVelocities[i * 3] = -Math.sin(angle) * 0.004; // swirl velocity
      pranaVelocities[i * 3 + 1] = 0.004 + Math.random() * 0.008; // upward ascent
      pranaVelocities[i * 3 + 2] = Math.cos(angle) * 0.004;

      const pCol = Math.random() > 0.4 ? cGold : cJade;
      pranaColors[i * 3] = pCol.r;
      pranaColors[i * 3 + 1] = pCol.g;
      pranaColors[i * 3 + 2] = pCol.b;
    }
    pranaGeo.setAttribute("position", new THREE.BufferAttribute(pranaPositions, 3));
    pranaGeo.setAttribute("color", new THREE.BufferAttribute(pranaColors, 3));

    const pranaMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pranaPoints = new THREE.Points(pranaGeo, pranaMat);
    scene.add(pranaPoints);

    // --- 5. Bowl Strike Shockwave Rings (Vòng Sóng Xung Kích Khi Gõ Chuông) ---
    const shockwavesList: {
      mesh: THREE.Mesh;
      scale: number;
      maxScale: number;
      opacity: number;
      life: number;
    }[] = [];

    const createStrikeShockwave = () => {
      const shockGeo = new THREE.RingGeometry(1.85, 1.95, 64);
      const shockMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      shockMesh.position.set(0, 1.05, 0);
      shockMesh.rotation.x = Math.PI / 2;
      scene.add(shockMesh);

      shockwavesList.push({
        mesh: shockMesh,
        scale: 1.0,
        maxScale: 3.8,
        opacity: 0.95,
        life: 0,
      });

      // Trigger water shader shockwave
      waterUniforms.uRippleTime.value = 0.0;
    };

    // --- Mouse & Raycasting Interactions ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0 };
    let lastMousePos = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;

      mouseNDC.x = mouse.targetX;
      mouseNDC.y = mouse.targetY;

      // Convert to water plane world coords (-8 to 8)
      waterUniforms.uMouse.value.set(mouse.targetX * 7.5, mouse.targetY * 7.5);

      const dx = clientX - lastMousePos.x;
      const dy = clientY - lastMousePos.y;
      mouse.speed = Math.sqrt(dx * dx + dy * dy) * 0.05;
      lastMousePos = { x: clientX, y: clientY };
    };

    let strikeAnimTimer = -1;

    const triggerStrike = () => {
      strikeAnimTimer = 0.0;
      bowlVibration = 1.0;
      createStrikeShockwave();
    };

    const onClick = () => {
      raycaster.setFromCamera(mouseNDC, camera);
      const interactiveTargets = [bowlMesh, handleMesh, collarMesh, strikerHeadMesh, tipMesh];
      const intersects = raycaster.intersectObjects(interactiveTargets);

      if (intersects.length > 0) {
        // Direct click on Tibetan bowl or puja mallet
        triggerStrike();
        onStrikeBowlRef.current?.();
      }
    };

    window.addEventListener("mousemove", onPointerMove);
    container.addEventListener("click", onClick);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Track previous strike trigger prop changes
    let lastLocalStrikeTrigger = strikeTriggerRef.current;

    // --- Animation Loop ---
    let startTime = performance.now();
    let previousTime = startTime;
    let bowlVibration = 0;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const delta = (currentTime - previousTime) * 0.001;
      previousTime = currentTime;
      const time = (currentTime - startTime) * 0.001;

      // Handle strike trigger prop changes
      if (strikeTriggerRef.current !== lastLocalStrikeTrigger) {
        lastLocalStrikeTrigger = strikeTriggerRef.current;
        triggerStrike();
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.speed *= 0.92;
      waterUniforms.uMouseSpeed.value = mouse.speed;

      // Camera parallax
      camera.position.x = mouse.x * 0.8;
      camera.position.y = 3.8 + mouse.y * 0.4;
      camera.lookAt(0, 0.4, 0);

      // --- 4-4 Breathing Cycle Computation ---
      let breathScale = 1.0;
      const currentPhase = phaseRef.current;
      const currentProg = progressRef.current;

      if (currentPhase === "inhale") {
        breathScale = 1.0 + currentProg * 0.45;
      } else if (currentPhase === "hold-in") {
        breathScale = 1.45;
      } else if (currentPhase === "exhale") {
        breathScale = 1.45 - currentProg * 0.45;
      } else {
        breathScale = 1.0;
      }

      waterUniforms.uBreathScale.value = breathScale;
      waterUniforms.uTime.value = time;

      // Update bowl strike ripple in shader
      if (waterUniforms.uRippleTime.value >= 0.0) {
        waterUniforms.uRippleTime.value += delta;
      }

      // --- Puja Striker Mallet Dynamic Strike Physics ---
      if (strikeAnimTimer >= 0) {
        strikeAnimTimer += delta;
        // Strike Motion:
        // 0.0s - 0.12s: subtle wind-up arc
        // 0.12s - 0.28s: swift downward strike onto bowl rim lip
        // 0.28s - 0.65s: elastic acoustic rebound back to resting hover
        if (strikeAnimTimer < 0.12) {
          const p = strikeAnimTimer / 0.12;
          malletGroup.position.set(
            malletRestPos.x + 0.22 * p,
            malletRestPos.y + 0.28 * p,
            malletRestPos.z + 0.15 * p
          );
          malletGroup.rotation.set(
            malletRestRot.x - 0.18 * p,
            malletRestRot.y - 0.12 * p,
            malletRestRot.z + 0.18 * p
          );
        } else if (strikeAnimTimer < 0.28) {
          const p = (strikeAnimTimer - 0.12) / 0.16;
          const targetContactPos = new THREE.Vector3(1.82, 1.06, 0.22);
          const targetContactRot = new THREE.Euler(0.22, -0.62, -0.92);
          const windupPos = new THREE.Vector3(malletRestPos.x + 0.22, malletRestPos.y + 0.28, malletRestPos.z + 0.15);
          malletGroup.position.lerpVectors(windupPos, targetContactPos, p * p);
          malletGroup.rotation.x = THREE.MathUtils.lerp(malletRestRot.x - 0.18, targetContactRot.x, p);
          malletGroup.rotation.y = THREE.MathUtils.lerp(malletRestRot.y - 0.12, targetContactRot.y, p);
          malletGroup.rotation.z = THREE.MathUtils.lerp(malletRestRot.z + 0.18, targetContactRot.z, p);
        } else if (strikeAnimTimer < 0.65) {
          const p = (strikeAnimTimer - 0.28) / 0.37;
          const contactPos = new THREE.Vector3(1.82, 1.06, 0.22);
          const easeOut = 1 - Math.pow(1 - p, 2);
          malletGroup.position.lerpVectors(contactPos, malletRestPos, easeOut);
          malletGroup.rotation.x = THREE.MathUtils.lerp(0.22, malletRestRot.x, easeOut);
          malletGroup.rotation.y = THREE.MathUtils.lerp(-0.62, malletRestRot.y, easeOut);
          malletGroup.rotation.z = THREE.MathUtils.lerp(-0.92, malletRestRot.z, easeOut);
        } else {
          strikeAnimTimer = -1;
        }
      } else {
        // Idle serene floating levitation in harmony with breath & mouse
        const bob = Math.sin(time * 1.5) * 0.055;
        const sway = Math.cos(time * 1.2) * 0.035;
        malletGroup.position.set(
          malletRestPos.x + mouse.x * 0.08,
          malletRestPos.y + bob + (breathScale - 1.0) * 0.12,
          malletRestPos.z
        );
        malletGroup.rotation.set(
          malletRestRot.x + sway * 0.4,
          malletRestRot.y + bob * 0.4,
          malletRestRot.z + sway
        );
      }

      // Mandala Rings dynamic scale & rotation
      mandalaGroup.scale.set(breathScale, breathScale, breathScale);
      innerRingMesh.rotation.z = time * 0.15;
      petalLine.rotation.y = -time * 0.08;
      orbitalPointsMesh.rotation.y = time * 0.22;
      outerRingMesh.rotation.z = -time * 0.05;

      // Update light pulsation
      centerBowlLight.intensity = 2.4 + (breathScale - 1.0) * 2.2 + bowlVibration * 1.5;

      // Singing Bowl Vibration & Subtle Levitation
      if (bowlVibration > 0) {
        bowlVibration *= 0.94;
        const vib = Math.sin(time * 65.0) * bowlVibration * 0.03;
        bowlMesh.scale.set(1 + vib, 1 - vib * 0.5, 1 + vib);
      } else {
        bowlMesh.scale.set(1, 1, 1);
      }
      bowlMesh.rotation.y = time * 0.06;
      bowlGroup.position.y = Math.sin(time * 1.2) * 0.05;

      // Update Shockwaves
      for (let s = shockwavesList.length - 1; s >= 0; s--) {
        const sw = shockwavesList[s];
        sw.life += delta;
        sw.scale += delta * 1.8;
        sw.opacity = Math.max(0, 1 - sw.life / 2.2);

        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        (sw.mesh.material as THREE.MeshBasicMaterial).opacity = sw.opacity;

        if (sw.life >= 2.2) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          (sw.mesh.material as THREE.MeshBasicMaterial).dispose();
          shockwavesList.splice(s, 1);
        }
      }

      // Update Prana Floating Particles
      const pArr = pranaGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pranaCount; i++) {
        pArr[i * 3] += pranaVelocities[i * 3];
        pArr[i * 3 + 1] += pranaVelocities[i * 3 + 1];
        pArr[i * 3 + 2] += pranaVelocities[i * 3 + 2];

        // Recycle particles that float above
        if (pArr[i * 3 + 1] > 3.8) {
          pArr[i * 3 + 1] = -0.5;
        }
      }
      pranaGeo.attributes.position.needsUpdate = true;
      pranaPoints.rotation.y = time * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup WebGL Resources on Unmount ---
    return () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("click", onClick);

      // Dispose shockwaves
      shockwavesList.forEach((sw) => {
        scene.remove(sw.mesh);
        sw.mesh.geometry.dispose();
        (sw.mesh.material as THREE.MeshBasicMaterial).dispose();
      });

      // Dispose Bowl
      bowlGeometry.dispose();
      bowlMaterial.dispose();
      bowlTexture.dispose();
      cushionGeo.dispose();
      cushionMat.dispose();

      // Dispose Mallet
      handleGeo.dispose();
      handleMat.dispose();
      pommelGeo.dispose();
      collarGeo.dispose();
      collarMat.dispose();
      strikerHeadGeo.dispose();
      strikerHeadMat.dispose();
      tipGeo.dispose();

      // Dispose Mandala
      innerRingGeo.dispose();
      innerRingMat.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      orbitalGeo.dispose();
      orbitalMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();

      // Dispose Water
      waterGeo.dispose();
      waterMat.dispose();

      // Dispose Prana
      pranaGeo.dispose();
      pranaMat.dispose();

      renderer.forceContextLoss?.();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none">
      <div
        ref={containerRef}
        className="w-full h-full cursor-pointer relative z-10"
        title="Nhấp vào Chuông Xoay Tây Tạng để gõ chuông 432Hz"
      />
    </div>
  );
}
