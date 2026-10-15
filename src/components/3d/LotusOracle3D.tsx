"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { zenAudio } from "@/utils/zenAudio";

export interface LotusGateDefinition {
  index: number;
  name: string; // Tên Bát Môn: Sinh, Khai, Hưu, Cảnh, Đỗ, Thương, Kinh, Tử
  directionName: string; // Phương vị: Đông Bắc, Tây Bắc...
  element: string; // Ngũ Hành: Thổ, Kim, Thủy, Hỏa, Mộc
  quality: "Đại Cát" | "Trung Cát" | "Tiểu Cát" | "Bình Hòa" | "Thứ Hung" | "Hung" | "Đại Hung";
  colorHex: string;
}

export const LOTUS_GATES_LIST: LotusGateDefinition[] = [
  { index: 0, name: "Sinh Môn", directionName: "Đông Bắc (Cấn)", element: "Thổ", quality: "Đại Cát", colorHex: "#34d399" },
  { index: 1, name: "Khai Môn", directionName: "Tây Bắc (Càn)", element: "Kim", quality: "Đại Cát", colorHex: "#fef08a" },
  { index: 2, name: "Hưu Môn", directionName: "Chính Bắc (Khảm)", element: "Thủy", quality: "Đại Cát", colorHex: "#38bdf8" },
  { index: 3, name: "Cảnh Môn", directionName: "Chính Nam (Ly)", element: "Hỏa", quality: "Trung Cát", colorHex: "#f97316" },
  { index: 4, name: "Đỗ Môn", directionName: "Đông Nam (Tốn)", element: "Mộc", quality: "Bình Hòa", colorHex: "#a78bfa" },
  { index: 5, name: "Thương Môn", directionName: "Chính Đông (Chấn)", element: "Mộc", quality: "Hung", colorHex: "#fb7185" },
  { index: 6, name: "Kinh Môn", directionName: "Chính Tây (Đoài)", element: "Kim", quality: "Hung", colorHex: "#e879f9" },
  { index: 7, name: "Tử Môn", directionName: "Tây Nam (Khôn)", element: "Thổ", quality: "Đại Hung", colorHex: "#cbd5e1" },
];

interface LotusOracle3DProps {
  isBlooming: boolean;
  selectedGateIndex?: number | null;
  onSelectGate?: (index: number) => void;
  soundEnabled?: boolean;
}

export default function LotusOracle3D({
  isBlooming,
  selectedGateIndex = null,
  onSelectGate,
  soundEnabled = true,
}: LotusOracle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredGate, setHoveredGate] = useState<number | null>(null);

  const isBloomingRef = useRef(isBlooming);
  useEffect(() => {
    isBloomingRef.current = isBlooming;
  }, [isBlooming]);

  const selectedGateIndexRef = useRef(selectedGateIndex);
  useEffect(() => {
    selectedGateIndexRef.current = selectedGateIndex;
  }, [selectedGateIndex]);

  const onSelectGateRef = useRef(onSelectGate);
  useEffect(() => {
    onSelectGateRef.current = onSelectGate;
  }, [onSelectGate]);

  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.2, 5.8);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 3.5, 12, 1.2);
    goldPointLight.position.set(0, 1.2, 0);
    scene.add(goldPointLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    blueRimLight.position.set(-6, -2, -5);
    scene.add(blueRimLight);

    // --- MASTER LOTUS GROUP ---
    const lotusRootGroup = new THREE.Group();
    scene.add(lotusRootGroup);

    // Helper: Build curved petal geometry
    function createPetalShape(): THREE.Shape {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.35, 0.4, 0.75, 1.2, 0.45, 2.1);
      shape.bezierCurveTo(0.25, 2.6, 0.0, 2.9, 0.0, 3.0);
      shape.bezierCurveTo(-0.0, 2.9, -0.25, 2.6, -0.45, 2.1);
      shape.bezierCurveTo(-0.75, 1.2, -0.35, 0.4, 0, 0);
      return shape;
    }

    const petalShape = createPetalShape();
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    petalGeometry.center();
    // Shift pivot to base of petal
    petalGeometry.translate(0, 1.45, 0);

    // Materials
    const goldPetalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"),
      metalness: 0.65,
      roughness: 0.28,
      emissive: new THREE.Color("#78521a"),
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
    });

    const innerPetalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fef08a"),
      metalness: 0.5,
      roughness: 0.2,
      emissive: new THREE.Color("#d97706"),
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    });

    // 8 Petal Pivot Groups for Bát Diệp
    interface PetalInstance {
      index: number;
      pivot: THREE.Group;
      mesh: THREE.Mesh;
      innerPivot: THREE.Group;
      innerMesh: THREE.Mesh;
      angle: number;
      targetOpen: number;
      currentOpen: number;
      targetScale: number;
      currentScale: number;
    }

    const petalInstances: PetalInstance[] = [];
    const raycastMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;

      // Outer Petal Pivot
      const outerPivot = new THREE.Group();
      outerPivot.rotation.y = angle;

      const outerMesh = new THREE.Mesh(petalGeometry, goldPetalMaterial.clone());
      outerMesh.scale.set(0.65, 0.65, 0.65);
      outerMesh.userData = { gateIndex: i };
      outerPivot.add(outerMesh);
      lotusRootGroup.add(outerPivot);
      raycastMeshes.push(outerMesh);

      // Inner Petal Pivot (staggered slightly)
      const innerPivot = new THREE.Group();
      innerPivot.rotation.y = angle + Math.PI / 8;
      const innerMesh = new THREE.Mesh(petalGeometry, innerPetalMaterial.clone());
      innerMesh.scale.set(0.48, 0.52, 0.48);
      innerPivot.add(innerMesh);
      lotusRootGroup.add(innerPivot);

      petalInstances.push({
        index: i,
        pivot: outerPivot,
        mesh: outerMesh,
        innerPivot,
        innerMesh,
        angle,
        targetOpen: 0.35,
        currentOpen: 0.35,
        targetScale: 1.0,
        currentScale: 1.0,
      });
    }

    // --- CENTRAL LOTUS JEWEL & STAMEN ---
    const stamenGroup = new THREE.Group();
    lotusRootGroup.add(stamenGroup);

    // Glowing Sacred Jewel
    const jewelGeo = new THREE.IcosahedronGeometry(0.42, 3);
    const jewelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fef08a"),
      emissive: new THREE.Color("#eab308"),
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.9,
    });
    const jewelMesh = new THREE.Mesh(jewelGeo, jewelMat);
    jewelMesh.position.y = 0.45;
    stamenGroup.add(jewelMesh);

    // Jewel halo ring
    const haloGeo = new THREE.TorusGeometry(0.65, 0.02, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#fef08a"),
      transparent: true,
      opacity: 0.6,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.y = 0.45;
    stamenGroup.add(haloMesh);

    // --- SACRED MANDALA FLOOR RINGS (BÁT QUÁI CỬU CUNG) ---
    const mandalaGroup = new THREE.Group();
    mandalaGroup.position.y = -0.15;
    lotusRootGroup.add(mandalaGroup);

    const ringCount = 3;
    const ringRadii = [1.8, 2.5, 3.2];
    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(idx === 1 ? "#d4af37" : "#8f9779"),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.28 - idx * 0.06,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      mandalaGroup.add(ringMesh);
    });

    // 8 Directional Mandala Dots
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const gateData = LOTUS_GATES_LIST[i];
      const dotMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(gateData.colorHex),
        emissive: new THREE.Color(gateData.colorHex),
        emissiveIntensity: 0.7,
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.set(Math.sin(angle) * 2.5, 0, Math.cos(angle) * 2.5);
      mandalaGroup.add(dotMesh);
    }

    // --- GOLDEN PARTICLE AURA FIELD ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 0.5 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.sin(theta) * r;
      positions[i * 3 + 1] = Math.random() * 2.5 - 0.2;
      positions[i * 3 + 2] = Math.cos(theta) * r;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.005 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.003,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#fef08a"),
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- RAYCASTER FOR INTERACTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const gateIndex = hit.userData.gateIndex as number;
        if (typeof gateIndex === "number") {
          if (soundEnabledRef.current) {
            zenAudio.playCrystalChime(880 + gateIndex * 40, 0.06);
          }
          onSelectGateRef.current?.(gateIndex);
        }
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("click", onClick);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gentle floating and breathing
      lotusRootGroup.rotation.y += 0.0025;
      mandalaGroup.rotation.y -= 0.0015;
      stamenGroup.position.y = Math.sin(time * 1.5) * 0.06;
      haloMesh.rotation.z += 0.01;

      // Raycast hover check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastMeshes);
      let currentHovered: number | null = null;
      if (intersects.length > 0) {
        currentHovered = (intersects[0].object.userData.gateIndex as number) ?? null;
      }
      setHoveredGate(currentHovered);

      // Bloom & Petals Open Angle Transition
      const blooming = isBloomingRef.current;
      const selected = selectedGateIndexRef.current;

      petalInstances.forEach((instance) => {
        const isHover = currentHovered === instance.index;
        const isSelected = selected === instance.index;

        // Base angle when closed vs bloomed
        const baseOpen = blooming ? 0.95 : 0.32;
        instance.targetOpen = baseOpen + (isHover ? 0.18 : 0) + (isSelected ? 0.25 : 0);
        instance.targetScale = isSelected ? 1.15 : isHover ? 1.08 : 1.0;

        // Smooth Lerp
        instance.currentOpen = THREE.MathUtils.lerp(instance.currentOpen, instance.targetOpen, delta * 3.5);
        instance.currentScale = THREE.MathUtils.lerp(instance.currentScale, instance.targetScale, delta * 4.0);

        // Apply rotation to outer petal
        instance.mesh.rotation.x = instance.currentOpen;
        instance.mesh.scale.set(
          0.65 * instance.currentScale,
          0.65 * instance.currentScale,
          0.65 * instance.currentScale
        );

        // Inner petal blooms slightly less
        instance.innerMesh.rotation.x = instance.currentOpen * 0.8;

        // Petal Glow/Emissive modulation
        const mat = instance.mesh.material as THREE.MeshStandardMaterial;
        if (isSelected) {
          const gate = LOTUS_GATES_LIST[instance.index];
          mat.emissive.set(gate.colorHex);
          mat.emissiveIntensity = 0.85 + Math.sin(time * 4) * 0.25;
        } else if (isHover) {
          mat.emissive.set("#fef08a");
          mat.emissiveIntensity = 0.6;
        } else {
          mat.emissive.set("#78521a");
          mat.emissiveIntensity = blooming ? 0.45 : 0.2;
        }
      });

      // Update particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += particleVelocities[i].y;
        if (posArray[i * 3 + 1] > 2.8) {
          posArray[i * 3 + 1] = -0.1;
        }
      }
      posAttr.needsUpdate = true;

      // Camera gentle bobbing
      camera.position.x = Math.sin(time * 0.2) * 0.25;
      camera.position.y = 4.2 + Math.cos(time * 0.3) * 0.15;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("click", onClick);
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries and Materials
      petalGeometry.dispose();
      jewelGeo.dispose();
      jewelMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      goldPetalMaterial.dispose();
      innerPetalMaterial.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-radial from-[#121b2d]/50 via-[#070c18]/90 to-[#03050c] border border-[#d4af37]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_50px_rgba(212,175,55,0.15)]">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-pointer" />

      {/* Floating Interactive Micro-HUD */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-amber-200/90 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>Bát Diệp Liên Hoa 3D • Chạm để quán chiếu</span>
        </div>

        {hoveredGate !== null && (
          <div className="px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 backdrop-blur-md text-xs font-serif font-bold text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            {LOTUS_GATES_LIST[hoveredGate].name} ({LOTUS_GATES_LIST[hoveredGate].directionName})
          </div>
        )}
      </div>

      {/* Subtle Legend Indicator below */}
      <div className="absolute bottom-3 inset-x-4 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
          {isBlooming ? "Hoa Sen Nở Rộ • Bát Môn Thần Cơ Hội Tụ" : "Định Tâm Khởi Quẻ • Hoa Sen Chuẩn Bị Khai Mở"}
        </span>
      </div>
    </div>
  );
}
