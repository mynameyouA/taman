"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface DreamPortal3DProps {
  className?: string;
  isWarping?: boolean;
  activity?: number; // phản hồi độ dài hoặc nhịp gõ phím của giấc mơ
}

/**
 * DreamPortal3D: Cổng Vũ Trụ Mộng Cảnh (Astral Dream Vortex / Nebula)
 * Thiết kế chuẩn Active Theory với hệ hạt thiên hà đa tầng (12,000+ hạt sao)
 * Tinh vân huyền bí Deep Purple & Mystic Indigo Stardust
 * Hỗ trợ quán tính tương tác chuột (Inertia Parallax) và hiệu ứng gia tốc bẻ cong không thời gian (Warp Surge)
 */
export default function DreamPortal3D({
  className = "",
  isWarping = false,
  activity = 0,
}: DreamPortal3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isWarpingRef = useRef(isWarping);
  const activityRef = useRef(activity);

  useEffect(() => {
    isWarpingRef.current = isWarping;
  }, [isWarping]);

  useEffect(() => {
    activityRef.current = activity;
  }, [activity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dọn dẹp DOM canvas trước đó nếu có (Bảo vệ HMR Fast Refresh)
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let isRunning = true;
    let animationFrameId: number;

    // --- Khởi tạo Scene & Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0414, 0.005);

    const width = container.clientWidth || window.innerWidth || 1920;
    const height = container.clientHeight || window.innerHeight || 1080;
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1500);
    camera.position.set(0, 0, 95);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x0c0414, 0);
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("[DreamPortal3D] WebGL không khả dụng:", err);
      return;
    }

    // --- Tạo Texture Hạt Phát Quang Thủ Công (Tránh Phụ Thuộc Tệp Ngoài) ---
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(224, 185, 255, 0.85)");
        gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.4)");
        gradient.addColorStop(0.8, "rgba(79, 70, 229, 0.1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const particleTexture = createGlowTexture();

    // --- LỚP 1: CỔNG XOÁY THIÊN HÀ MỘNG CẢNH (ASTRAL SPIRAL VORTEX) ---
    const particleCount = 14000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const randomRadii = new Float32Array(particleCount);
    const randomAngles = new Float32Array(particleCount);
    const armIndices = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    // Bảng màu vũ trụ huyền bí: Deep Indigo, Cosmic Violet, Fuchsia Glow, Starlight Cream Gold
    const colorPalette = [
      new THREE.Color("#4338ca"), // Indigo huyền bí
      new THREE.Color("#7e22ce"), // Tím đậm vô thức
      new THREE.Color("#c084fc"), // Tím thạch anh sáng
      new THREE.Color("#e879f9"), // Fuchsia dạ quang
      new THREE.Color("#fef08a"), // Ánh vàng tinh vân điểm xuyết
      new THREE.Color("#818cf8"), // Xanh thiên thanh vũ trụ
    ];

    const arms = 3; // 3 cánh tay xoắn ốc vàng (Golden Spiral)
    const maxRadius = 85;
    const minRadius = 4;

    for (let i = 0; i < particleCount; i++) {
      // Phân bổ hạt tập trung nhiều hơn về tâm xoáy
      const r = Math.pow(Math.random(), 1.6) * (maxRadius - minRadius) + minRadius;
      const arm = i % arms;
      const armAngle = (arm * 2 * Math.PI) / arms;
      // Góc xoắn ốc logarithm: càng ra xa xoắn càng cuộn
      const spiralOffset = Math.log(r + 1) * 2.8;
      const spread = (Math.random() - 0.5) * (0.35 + r * 0.015);
      const angle = armAngle + spiralOffset + spread;

      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      // Dao động trục Z tạo độ sâu 3D uốn lượn
      const z = (Math.random() - 0.5) * (8 + r * 0.15) + Math.sin(r * 0.25) * 4;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      randomRadii[i] = r;
      randomAngles[i] = angle;
      armIndices[i] = arm;
      speeds[i] = (0.5 + Math.random() * 0.8) * (18 / (r + 8)); // Luật vận tốc Kepler

      // Phối màu theo bán kính từ tâm ra biên
      const colorProgress = Math.min(1, Math.max(0, r / maxRadius));
      let pColor: THREE.Color;
      if (r < 12) {
        // Tâm xoáy phát sáng trắng tím rực rỡ
        pColor = Math.random() > 0.4 ? colorPalette[2] : colorPalette[4];
      } else {
        const idx = Math.floor(colorProgress * (colorPalette.length - 1));
        pColor = colorPalette[idx].clone().lerp(colorPalette[(idx + 1) % colorPalette.length], Math.random() * 0.5);
      }

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;

      // Kích thước hạt
      scales[i] = Math.random() * 2.2 + 0.8;
    }

    const vortexGeometry = new THREE.BufferGeometry();
    vortexGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    vortexGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    vortexGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // Custom Shader cho hiệu ứng xoáy cực nhuyễn và bẻ cong không thời gian (Warp)
    const vortexUniforms = {
      uTime: { value: 0 },
      uWarpFactor: { value: 0 },
      uActivity: { value: 0 },
      uMouseOffset: { value: new THREE.Vector2(0, 0) },
      uPointTexture: { value: particleTexture },
    };

    const vortexVertexShader = `
      uniform float uTime;
      uniform float uWarpFactor;
      uniform float uActivity;
      uniform vec2 uMouseOffset;
      attribute float aScale;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vec3 pos = position;

        // Bán kính từ tâm
        float r = length(pos.xy);
        float currentAngle = atan(pos.y, pos.x);

        // Gia tốc xoay Kepler với ảnh hưởng của Warp Surge
        float rotationSpeed = (0.4 + uWarpFactor * 3.2 + uActivity * 0.15) * (14.0 / (r + 7.0));
        float totalAngle = currentAngle + uTime * rotationSpeed;

        // Tụ năng lượng kéo hạt về tâm hoặc phóng tia khi Warp
        float warpRadius = r * (1.0 - uWarpFactor * 0.35);
        pos.x = cos(totalAngle) * warpRadius;
        pos.y = sin(totalAngle) * warpRadius;

        // Sóng không gian 3D uốn lượn hình sin
        float waveZ = sin(r * 0.18 - uTime * (1.8 + uWarpFactor * 2.5)) * (4.0 + uWarpFactor * 9.0);
        float shockwave = sin(length(pos.xy - vec3(uMouseOffset * 20.0, 0.0).xy) * 0.25 - uTime * 3.0) * (1.5 + uActivity * 0.5);
        pos.z += waveZ + shockwave;

        // Phóng hạt theo luồng ánh sáng khi Warp kích hoạt
        if (uWarpFactor > 0.01) {
          pos.z += sin(pos.x * 0.1 + pos.y * 0.1 + uTime * 6.0) * uWarpFactor * 16.0;
        }

        // Tương tác chuột làm nghiêng tâm xoáy
        pos.x += uMouseOffset.x * (r * 0.2);
        pos.y += uMouseOffset.y * (r * 0.2);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Độ lớn điểm sao phản hồi chiều sâu và hiệu ứng phóng đại khi Warp
        float pSize = aScale * (1.0 + uWarpFactor * 1.5 + uActivity * 0.3);
        gl_PointSize = pSize * (350.0 / -mvPosition.z);

        // Alpha mờ dần ở viền ngoài vô cực
        float edgeFade = smoothstep(95.0, 35.0, r);
        vAlpha = edgeFade * (0.7 + uWarpFactor * 0.3);
      }
    `;

    const vortexFragmentShader = `
      uniform sampler2D uPointTexture;
      uniform float uWarpFactor;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec4 texColor = texture2D(uPointTexture, gl_PointCoord);
        if (texColor.a < 0.03) discard;

        // Tăng cường phát sáng trắng ở tâm hạt khi Warp kích hoạt
        vec3 finalColor = mix(vColor, vec3(1.0, 0.95, 1.0), uWarpFactor * 0.5);
        gl_FragColor = vec4(finalColor * (1.2 + uWarpFactor * 0.8), texColor.a * vAlpha);
      }
    `;

    const vortexMaterial = new THREE.ShaderMaterial({
      uniforms: vortexUniforms,
      vertexShader: vortexVertexShader,
      fragmentShader: vortexFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const vortexPoints = new THREE.Points(vortexGeometry, vortexMaterial);
    scene.add(vortexPoints);

    // --- LỚP 2: DẢI MÂY TINH VÂN TRẦM TĨNH (VOLUMETRIC COSMIC NEBULA) ---
    const nebulaCount = 600;
    const nebPositions = new Float32Array(nebulaCount * 3);
    const nebColors = new Float32Array(nebulaCount * 3);
    const nebScales = new Float32Array(nebulaCount);

    const nebColorsList = [
      new THREE.Color("#581c87"), // Tím đậm vô cực
      new THREE.Color("#3730a3"), // Lam chàm sâu thẳm
      new THREE.Color("#701a75"), // Mận huyền bí
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const radius = Math.random() * 75 + 10;
      const theta = Math.random() * Math.PI * 2;
      nebPositions[i * 3] = Math.cos(theta) * radius;
      nebPositions[i * 3 + 1] = Math.sin(theta) * radius;
      nebPositions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;

      const c = nebColorsList[i % nebColorsList.length];
      nebColors[i * 3] = c.r;
      nebColors[i * 3 + 1] = c.g;
      nebColors[i * 3 + 2] = c.b;

      nebScales[i] = Math.random() * 7.0 + 4.0;
    }

    const nebGeometry = new THREE.BufferGeometry();
    nebGeometry.setAttribute("position", new THREE.BufferAttribute(nebPositions, 3));
    nebGeometry.setAttribute("color", new THREE.BufferAttribute(nebColors, 3));
    nebGeometry.setAttribute("aScale", new THREE.BufferAttribute(nebScales, 1));

    const nebMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: vortexUniforms.uTime,
        uPointTexture: vortexUniforms.uPointTexture,
      },
      vertexShader: `
        uniform float uTime;
        attribute float aScale;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec3 pos = position;
          pos.z += sin(uTime * 0.4 + pos.x * 0.05) * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aScale * (260.0 / -mvPosition.z);
          vAlpha = 0.28;
        }
      `,
      fragmentShader: `
        uniform sampler2D uPointTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 tex = texture2D(uPointTexture, gl_PointCoord);
          if (tex.a < 0.02) discard;
          gl_FragColor = vec4(vColor, tex.a * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebulaPoints = new THREE.Points(nebGeometry, nebMaterial);
    scene.add(nebulaPoints);

    // --- LỚP 3: VÀNH ĐAI HÌNH HỌC THIÊNG LIÊNG Ở TÂM CỔNG (SACRED GATE RIM) ---
    const ringGeometry = new THREE.TorusGeometry(12, 0.2, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const gateRing = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(gateRing);

    const innerRingGeometry = new THREE.TorusGeometry(6, 0.15, 12, 80);
    const innerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    // --- LỚP 4: HỆ THỐNG VỆT SAO BĂNG MỘNG CẢNH (ASTRAL SHOOTING STAR TRAILS) ---
    const maxShootingStars = 3;
    interface ShootingStar {
      line: THREE.Line;
      geometry: THREE.BufferGeometry;
      material: THREE.LineBasicMaterial;
      headMesh: THREE.Points;
      headGeo: THREE.BufferGeometry;
      headMat: THREE.PointsMaterial;
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      trail: THREE.Vector3[];
      active: boolean;
      life: number;
      maxLife: number;
      spawnTimer: number;
    }

    const shootingStars: ShootingStar[] = [];
    const trailLength = 20;

    for (let s = 0; s < maxShootingStars; s++) {
      const trailPoints: THREE.Vector3[] = [];
      for (let p = 0; p < trailLength; p++) {
        trailPoints.push(new THREE.Vector3(-9999, -9999, -9999));
      }
      const sGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const starColors = [0xfef08a, 0xe879f9, 0x38bdf8];
      const sColor = starColors[s % starColors.length];

      const sMat = new THREE.LineBasicMaterial({
        color: sColor,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        linewidth: 2,
      });
      const sLine = new THREE.Line(sGeo, sMat);
      scene.add(sLine);

      // Star luminous head glint
      const hGeo = new THREE.BufferGeometry();
      hGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
      const hMat = new THREE.PointsMaterial({
        size: 3.2,
        map: particleTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const hPoints = new THREE.Points(hGeo, hMat);
      scene.add(hPoints);

      shootingStars.push({
        line: sLine,
        geometry: sGeo,
        material: sMat,
        headMesh: hPoints,
        headGeo: hGeo,
        headMat: hMat,
        pos: new THREE.Vector3(-999, -999, -999),
        vel: new THREE.Vector3(0, 0, 0),
        trail: trailPoints,
        active: false,
        life: 0,
        maxLife: 1.2,
        spawnTimer: 1.5 + s * 2.2, // Staggered initial spawn
      });
    }

    const spawnShootingStar = (star: ShootingStar) => {
      // Spawn at outer rim on random diagonal vector
      const side = Math.random() > 0.5 ? 1 : -1;
      const startX = side * (50 + Math.random() * 40);
      const startY = 35 + Math.random() * 30;
      const startZ = (Math.random() - 0.5) * 30;

      star.pos.set(startX, startY, startZ);
      // Shoot towards center-downwards
      const angle = side > 0 ? (Math.PI * 1.25) + (Math.random() - 0.5) * 0.4 : (Math.PI * 1.75) + (Math.random() - 0.5) * 0.4;
      const speed = 140 + Math.random() * 80;
      star.vel.set(Math.cos(angle) * speed, Math.sin(angle) * speed * 0.7, (Math.random() - 0.5) * 20);

      for (let p = 0; p < trailLength; p++) {
        star.trail[p].copy(star.pos);
      }
      star.active = true;
      star.life = 0;
      star.maxLife = 0.9 + Math.random() * 0.5;
    };

    // --- QUẢN LÝ QUÁN TÍNH CHUỘT (INERTIA PARALLAX) ---
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Xử lý thay đổi kích thước màn hình
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP CHÍNH ---
    const clock = new THREE.Clock();
    let currentWarp = 0;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Cập nhật quán tính mượt mà độc lập với tần số quét (Frame-rate independent exponential damping)
      const dampingFactor = 1.0 - Math.exp(-6.8 * delta);
      mouse.currentX += (mouse.targetX - mouse.currentX) * dampingFactor;
      mouse.currentY += (mouse.targetY - mouse.currentY) * dampingFactor;

      // Chuyển mượt trạng thái Warp Factor khi bấm Giải Mã
      const targetWarp = isWarpingRef.current ? 1.0 : 0.0;
      currentWarp += (targetWarp - currentWarp) * 0.08;

      // Cập nhật Uniforms
      vortexUniforms.uTime.value = elapsedTime;
      vortexUniforms.uWarpFactor.value = currentWarp;
      vortexUniforms.uActivity.value = THREE.MathUtils.lerp(
        vortexUniforms.uActivity.value,
        Math.min(activityRef.current / 80, 1.5),
        0.05
      );
      vortexUniforms.uMouseOffset.value.set(mouse.currentX, mouse.currentY);

      // Xoay các vòng đai linh thiêng ở tâm cổng
      gateRing.rotation.z = elapsedTime * (0.2 + currentWarp * 1.5);
      gateRing.rotation.x = Math.sin(elapsedTime * 0.3) * 0.3 + mouse.currentY * 0.3;
      gateRing.rotation.y = Math.cos(elapsedTime * 0.4) * 0.3 + mouse.currentX * 0.3;
      ringMaterial.opacity = 0.35 + currentWarp * 0.45 + Math.sin(elapsedTime * 2) * 0.1;

      innerRing.rotation.z = -elapsedTime * (0.35 + currentWarp * 2.0);
      innerRing.rotation.x = Math.cos(elapsedTime * 0.5) * 0.4 - mouse.currentY * 0.2;
      innerRing.rotation.y = Math.sin(elapsedTime * 0.6) * 0.4 - mouse.currentX * 0.2;
      innerRingMaterial.opacity = 0.25 + currentWarp * 0.5;

      // Cập nhật dải vệt sao băng (Shooting Star Trails)
      shootingStars.forEach((star) => {
        if (!star.active) {
          star.spawnTimer -= delta;
          if (star.spawnTimer <= 0) {
            spawnShootingStar(star);
          }
        } else {
          star.life += delta;
          // Di chuyển đầu sao
          star.pos.addScaledVector(star.vel, delta);

          // Cập nhật mảng vệt đuôi
          for (let p = trailLength - 1; p > 0; p--) {
            star.trail[p].copy(star.trail[p - 1]);
          }
          star.trail[0].copy(star.pos);
          star.geometry.setFromPoints(star.trail);

          // Vị trí đầu sao sáng
          const hPos = star.headGeo.attributes.position.array as Float32Array;
          hPos[0] = star.pos.x;
          hPos[1] = star.pos.y;
          hPos[2] = star.pos.z;
          star.headGeo.attributes.position.needsUpdate = true;

          // Độ trong suốt mờ dần theo thời gian
          const lifeProgress = star.life / star.maxLife;
          const alpha = Math.sin(lifeProgress * Math.PI);
          star.material.opacity = alpha * 0.85;
          star.headMat.opacity = alpha * 0.95;

          if (star.life >= star.maxLife) {
            star.active = false;
            star.material.opacity = 0;
            star.headMat.opacity = 0;
            star.spawnTimer = 2.5 + Math.random() * 4.0;
          }
        }
      });

      // Parallax chuyển động camera theo chuột 3D
      camera.position.x = mouse.currentX * 14;
      camera.position.y = mouse.currentY * 10;
      // Khi Warp, camera tiến gần lại tâm cổng tạo cảm giác siêu tốc
      camera.position.z = 95 - currentWarp * 25;
      camera.lookAt(mouse.currentX * 4, mouse.currentY * 3, 0);

      // Xoay nhẹ nhàng mây tinh vân
      nebulaPoints.rotation.z = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // --- DỌN DẸP BỘ NHỚ WEBGL TRIỆT ĐỂ KHI UNMOUNT ---
    return () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      vortexGeometry.dispose();
      vortexMaterial.dispose();
      nebGeometry.dispose();
      nebMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeometry.dispose();
      innerRingMaterial.dispose();
      particleTexture.dispose();

      // Dispose shooting star trails
      shootingStars.forEach((star) => {
        scene.remove(star.line);
        star.geometry.dispose();
        star.material.dispose();
        scene.remove(star.headMesh);
        star.headGeo.dispose();
        star.headMat.dispose();
      });

      renderer.forceContextLoss?.();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
