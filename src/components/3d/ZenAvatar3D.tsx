"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ZenAvatar3DProps {
  className?: string;
  isTyping?: boolean;
  size?: number; // Kích thước pixel (mặc định 160px)
  visemes?: Array<{ text?: string; viseme?: number; duration?: number }>;
  activeViseme?: number | null;
}

/**
 * ZenAvatar3D: Linh Vật / Thực Thể Năng Lượng Thiền Định (Zen Energy Being / Sacred Geometry Orb)
 * Chuẩn Active Theory với shader phát quang Fresnel, hình học thiêng liêng Icosahedron,
 * sóng thở Simplex noise, các hạt orbital quay quanh quỹ đạo, và tương tác dõi theo chuột (Head Tracking).
 */
export default function ZenAvatar3D({
  className = "",
  isTyping = false,
  size = 160,
  visemes,
  activeViseme = null,
}: ZenAvatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(isTyping);
  const activeVisemeRef = useRef(activeViseme);

  useEffect(() => {
    isTypingRef.current = isTyping;
  }, [isTyping]);

  useEffect(() => {
    activeVisemeRef.current = activeViseme;
  }, [activeViseme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let isRunning = true;
    let animationFrameId: number;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(size, size);
      renderer.setClearColor(0x000000, 0); // Trong suốt hoàn toàn
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("[ZenAvatar3D] WebGL không khả dụng:", err);
      return;
    }

    // Nhóm chính chứa toàn bộ thực thể để xoay theo chuột
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // --- 1. CORE ENERGY BEING: KHỐI CẦU NĂNG LƯỢNG BIẾN THIÊN (MORPHING SPHERE) ---
    const coreGeometry = new THREE.IcosahedronGeometry(2.0, 5);

    // Custom Shader cho hào quang Fresnel và sóng thở năng lượng
    const coreUniforms = {
      uTime: { value: 0 },
      uTypingFactor: { value: 0 },
      uVisemePulse: { value: 0 },
      uColorBase: { value: new THREE.Color("#059669") }, // Xanh ngọc lục bảo sâu
      uColorGlow: { value: new THREE.Color("#34d399") }, // Xanh mint rực rỡ
      uColorCore: { value: new THREE.Color("#6ee7b7") }, // Lõi thiên thanh
      uColorZenGold: { value: new THREE.Color("#fde047") }, // Điểm sáng giác ngộ
    };

    const coreVertexShader = `
      uniform float uTime;
      uniform float uTypingFactor;
      uniform float uVisemePulse;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec3 pos = position;

        // Natural Zen Box-Breathing Curve (Harmonic sinusoidal easing)
        float breathTime = uTime * (1.3 + uTypingFactor * 2.8 + uVisemePulse * 2.4);
        float breathCycle = sin(breathTime) * 0.5 + 0.5;
        float smoothBreath = smoothstep(0.1, 0.9, breathCycle);
        float freq = 2.0 + uTypingFactor * 3.5;
        float amp = (0.12 + uTypingFactor * 0.16 + uVisemePulse * 0.14) * (0.8 + smoothBreath * 0.4);

        // Phức hợp đa sóng Simplex-like trên bề mặt hình cầu
        float wave1 = sin(pos.x * 2.6 + uTime * freq) * cos(pos.y * 2.4 + uTime * freq * 0.85);
        float wave2 = sin(pos.z * 3.0 + uTime * (freq * 1.15)) * 0.45;
        float wave3 = cos(length(pos.xyz) * 3.8 - uTime * freq * 0.7) * 0.32;
        float displacement = (wave1 + wave2 + wave3) * amp;

        vDisplacement = displacement;
        pos += normal * displacement;
        vPosition = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const coreFragmentShader = `
      uniform float uTime;
      uniform float uTypingFactor;
      uniform float uVisemePulse;
      uniform vec3 uColorBase;
      uniform vec3 uColorGlow;
      uniform vec3 uColorCore;
      uniform vec3 uColorZenGold;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;

      void main() {
        // Hiệu ứng viền phát sáng Fresnel (Rim Glow)
        vec3 viewDir = normalize(-vPosition);
        float fresnel = dot(viewDir, vNormal);
        fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
        float fresnelPower = pow(fresnel, 2.2);

        // Hòa trộn màu theo độ cao sóng và trạng thái typing / viseme
        vec3 col = mix(uColorBase, uColorGlow, vDisplacement * 2.5 + 0.4);
        col = mix(col, uColorCore, fresnelPower * 0.85);

        // Ánh vàng điểm xuyết trên đỉnh sóng năng lượng
        if (vDisplacement > 0.11) {
          col = mix(col, uColorZenGold, clamp((vDisplacement - 0.11) * 3.2 + uVisemePulse * 0.4, 0.0, 1.0));
        }

        // Tăng độ sáng bừng lên khi bot đang trả lời hoặc có viseme phát ra
        float brightness = 1.0 + uTypingFactor * 0.65 + uVisemePulse * 0.45 + sin(uTime * 3.0) * 0.08;
        gl_FragColor = vec4(col * brightness, 0.92);
      }
    `;

    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: coreUniforms,
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    avatarGroup.add(coreMesh);

    // --- 2. SACRED GEOMETRY: KHUNG ĐA DIỆN ICOSAHEDRON BAO NGOÀI ---
    const cageGeometry = new THREE.IcosahedronGeometry(2.7, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ee7b7,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    avatarGroup.add(cageMesh);

    // Tạo Texture Điểm Sao Phát Quang Trên Đỉnh Đa Diện (Vertex Star Flares)
    const createStarGlintTexture = (): THREE.CanvasTexture => {
      const cvs = document.createElement("canvas");
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext("2d");
      if (ctx) {
        const cx = 32, cy = 32;
        const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
        rad.addColorStop(0, "rgba(255, 255, 255, 1)");
        rad.addColorStop(0.25, "rgba(254, 240, 138, 0.9)");
        rad.addColorStop(0.6, "rgba(52, 211, 153, 0.35)");
        rad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, 64, 64);

        // 4-pointed diamond star flare
        ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, 4);
        ctx.lineTo(cx, 60);
        ctx.moveTo(4, cy);
        ctx.lineTo(60, cy);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(cvs);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };
    const starTexture = createStarGlintTexture();

    // Đỉnh sao phát sáng nhẹ tại các đỉnh (vertices) của khối Icosahedron
    const cagePointsMaterial = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.36,
      map: starTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cagePoints = new THREE.Points(cageGeometry, cagePointsMaterial);
    avatarGroup.add(cagePoints);

    // --- 3. VÀNH ĐAI QUỸ ĐẠO GIMBAL (ORBITAL RINGS) ---
    const ring1Geo = new THREE.TorusGeometry(3.3, 0.025, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    avatarGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.6, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    avatarGroup.add(ring2);

    // --- 4. HẠT QUỸ ĐẠO PHÁT QUANG (ORBITAL SWARM PARTICLES) ---
    const orbitalCount = 55;
    const orbitalPositions = new Float32Array(orbitalCount * 3);
    const orbitalColors = new Float32Array(orbitalCount * 3);
    const orbitalSpeed = new Float32Array(orbitalCount);
    const orbitalRadius = new Float32Array(orbitalCount);
    const orbitalPhase = new Float32Array(orbitalCount);
    const orbitalTilt = new Float32Array(orbitalCount);

    const orbCol1 = new THREE.Color("#6ee7b7");
    const orbCol2 = new THREE.Color("#fef08a");

    for (let i = 0; i < orbitalCount; i++) {
      orbitalRadius[i] = 2.9 + Math.random() * 1.5;
      orbitalSpeed[i] = (0.7 + Math.random() * 0.9) * (Math.random() > 0.5 ? 1 : -1);
      orbitalPhase[i] = Math.random() * Math.PI * 2;
      orbitalTilt[i] = (Math.random() - 0.5) * Math.PI;

      const c = Math.random() > 0.3 ? orbCol1 : orbCol2;
      orbitalColors[i * 3] = c.r;
      orbitalColors[i * 3 + 1] = c.g;
      orbitalColors[i * 3 + 2] = c.b;
    }

    const orbitalGeo = new THREE.BufferGeometry();
    orbitalGeo.setAttribute("position", new THREE.BufferAttribute(orbitalPositions, 3));
    orbitalGeo.setAttribute("color", new THREE.BufferAttribute(orbitalColors, 3));

    const orbitalMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const orbitalPoints = new THREE.Points(orbitalGeo, orbitalMat);
    avatarGroup.add(orbitalPoints);

    // --- 5. TƯƠNG TÁC CHUỘT (HEAD / EYE TRACKING LOOK-AT) ---
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handlePointerMove = (e: MouseEvent) => {
      // Tọa độ chuẩn hóa từ tâm màn hình [-1, 1]
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // --- ANIMATION LOOP CHÍNH ---
    const clock = new THREE.Clock();
    let typingProgress = 0;
    let visemeProgress = 0;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Cập nhật trạng thái typing chuyển dịch mềm mại
      const targetTyping = isTypingRef.current ? 1.0 : 0.0;
      typingProgress += (targetTyping - typingProgress) * 0.08;

      // Cập nhật nhịp đập năng lượng từ Visemes khi phát ngôn
      const targetViseme =
        activeVisemeRef.current !== null && activeVisemeRef.current !== undefined
          ? 1.0
          : 0.0;
      visemeProgress += (targetViseme - visemeProgress) * 0.18;

      // Quán tính dõi theo chuột
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.08;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.08;

      // Xoay toàn bộ thực thể Avatar theo hướng nhìn của người dùng
      avatarGroup.rotation.y = mouse.currentX * 0.85 + Math.sin(elapsedTime * 0.5) * 0.15;
      avatarGroup.rotation.x = -mouse.currentY * 0.65 + Math.cos(elapsedTime * 0.6) * 0.12;

      // Nhịp thở mượt mà theo đường cong sinh học (Harmonized Zen breathing curve)
      const breathTime = elapsedTime * (1.3 + typingProgress * 1.8 + visemeProgress * 1.5);
      const rawBreath = Math.sin(breathTime) * 0.5 + 0.5;
      const smoothBreath = THREE.MathUtils.smootherstep(rawBreath, 0.0, 1.0);

      const breathScale =
        1.0 +
        (smoothBreath - 0.5) * (0.07 + typingProgress * 0.1) +
        visemeProgress * 0.06;
      avatarGroup.scale.set(breathScale, breathScale, breathScale);
      avatarGroup.position.y = (smoothBreath - 0.5) * 0.2;

      // Cập nhật Uniforms của khối cầu năng lượng
      coreUniforms.uTime.value = elapsedTime;
      coreUniforms.uTypingFactor.value = typingProgress;
      coreUniforms.uVisemePulse.value = visemeProgress;

      // Xoay khung đa diện hình học thiêng liêng đối xứng & nhịp nhấp nháy đỉnh sao
      cageMesh.rotation.y = -elapsedTime * (0.35 + typingProgress * 0.7 + visemeProgress * 0.4);
      cageMesh.rotation.z = Math.sin(elapsedTime * 0.4) * 0.3;
      cagePoints.rotation.copy(cageMesh.rotation);
      cageMaterial.opacity = 0.38 + typingProgress * 0.35 + visemeProgress * 0.25;

      // Điểm sao đỉnh đa diện phát sáng nhẹ và phập phồng cùng nhịp thở và viseme
      cagePointsMaterial.size =
        0.32 +
        smoothBreath * 0.16 +
        visemeProgress * 0.14 +
        Math.sin(elapsedTime * 4.0) * 0.04;
      cagePointsMaterial.opacity = 0.72 + smoothBreath * 0.28;

      // Xoay các vành đai năng lượng
      ring1.rotation.z = elapsedTime * (0.8 + typingProgress * 1.5);
      ring2.rotation.x = -elapsedTime * (0.6 + typingProgress * 1.2);

      // Cập nhật quỹ đạo các hạt năng lượng orbital motes
      const posAttr = orbitalGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const speedMultiplier = 1.0 + typingProgress * 2.0;

      for (let i = 0; i < orbitalCount; i++) {
        const theta = orbitalPhase[i] + elapsedTime * orbitalSpeed[i] * speedMultiplier;
        const rad = orbitalRadius[i] + Math.sin(elapsedTime * 2.0 + i) * 0.2;
        const tilt = orbitalTilt[i];

        // Quỹ đạo hình cầu 3D
        posArray[i * 3] = Math.cos(theta) * rad * Math.cos(tilt);
        posArray[i * 3 + 1] = Math.sin(theta) * rad + Math.sin(elapsedTime * 3.0 + i) * 0.15;
        posArray[i * 3 + 2] = Math.cos(theta) * rad * Math.sin(tilt);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- DỌN DẸP BỘ NHỚ WEBGL SẠCH SẼ KHI UNMOUNT ---
    return () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousemove", handlePointerMove);

      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      cagePointsMaterial.dispose();
      starTexture.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      orbitalGeo.dispose();
      orbitalMat.dispose();

      renderer.forceContextLoss?.();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-label="3D Zen Energy Avatar"
    />
  );
}
