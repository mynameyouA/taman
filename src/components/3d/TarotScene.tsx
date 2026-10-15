"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DrawnCardResult } from "@/utils/tarotEngine";

export interface TarotCardSceneItem {
  index: number;
  id: string;
  nameVi: string;
  nameEn: string;
  roman?: string;
  positionLabel: string;
  element: string;
  isReversed: boolean;
  visualSymbol: string;
  icon: string;
  keywords: string[];
}

interface TarotSceneProps {
  isDrawn: boolean;
  cardsData?: DrawnCardResult[];
  cardCount?: number;
  onCardSelect?: (index: number) => void;
  soundEnabled?: boolean;
}

export default function TarotScene({
  isDrawn,
  cardsData,
  cardCount = 3,
  onCardSelect,
  soundEnabled = true,
}: TarotSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // References to keep event handlers and animation loop synchronized
  const isDrawnRef = useRef(isDrawn);
  useEffect(() => {
    isDrawnRef.current = isDrawn;
  }, [isDrawn]);

  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const onCardSelectRef = useRef(onCardSelect);
  useEffect(() => {
    onCardSelectRef.current = onCardSelect;
  }, [onCardSelect]);

  const cardsDataRef = useRef(cardsData);
  useEffect(() => {
    cardsDataRef.current = cardsData;
  }, [cardsData]);

  // Synthesize crystal chime harmonic audio
  const playCardFlipSound = (frequency = 528) => {
    if (!soundEnabledRef.current || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // 1. Gentle celestial swoosh
      const oscNoise = ctx.createOscillator();
      const gainNoise = ctx.createGain();
      oscNoise.type = "sine";
      oscNoise.frequency.setValueAtTime(140, now);
      oscNoise.frequency.exponentialRampToValueAtTime(380, now + 0.35);
      gainNoise.gain.setValueAtTime(0.08, now);
      gainNoise.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      oscNoise.connect(gainNoise);
      gainNoise.connect(ctx.destination);
      oscNoise.start(now);
      oscNoise.stop(now + 0.45);

      // 2. Crystal Singing Chime (Harmonics of Golden Ratio / 528Hz Solfeggio)
      const harmonics = [1, 2.02, 3.01];
      const harmonicGains = [0.15, 0.08, 0.03];

      harmonics.forEach((multiplier, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency * multiplier, now + 0.1);
        gain.gain.setValueAtTime(harmonicGains[i], now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.1);
        osc.stop(now + 2.9);
      });
    } catch {
      // AudioContext policy suppression fallback
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let isRunning = true;
    let animationFrameId: number;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight * 0.6;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed:", e);
      return;
    }

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff3d6, 1.8);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 2.5, 15);
    goldPointLight.position.set(0, 1, 3);
    scene.add(goldPointLight);

    const mysticCyanLight = new THREE.PointLight(0x38bdf8, 1.5, 12);
    mysticCyanLight.position.set(-3, -2, 2);
    scene.add(mysticCyanLight);

    const goldSheenLight = new THREE.PointLight(0xfff7c2, 0, 4.5);
    goldSheenLight.position.set(0, 0, 1.5);
    scene.add(goldSheenLight);

    // Procedural Soft Contact Shadow Texture
    const createShadowTexture = (): THREE.CanvasTexture => {
      const cvs = document.createElement("canvas");
      cvs.width = 256;
      cvs.height = 256;
      const ctx = cvs.getContext("2d");
      if (ctx) {
        const g = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
        g.addColorStop(0, "rgba(0, 0, 0, 0.72)");
        g.addColorStop(0.35, "rgba(0, 0, 0, 0.42)");
        g.addColorStop(0.7, "rgba(0, 0, 0, 0.12)");
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(cvs);
    };
    const shadowTexture = createShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(2.6, 1.6);

    // Card Back Texture: Gilded Sacred Mandala
    const createCardBackTexture = (): THREE.CanvasTexture => {
      const cvs = document.createElement("canvas");
      cvs.width = 1024;
      cvs.height = 1600;
      const ctx = cvs.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(cvs);

      const grad = ctx.createRadialGradient(512, 800, 50, 512, 800, 950);
      grad.addColorStop(0, "#16233d");
      grad.addColorStop(0.55, "#0d1628");
      grad.addColorStop(1, "#070c17");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1600);

      // Gold Frames
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, 952, 1528);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
      ctx.lineWidth = 4;
      ctx.strokeRect(58, 58, 908, 1484);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.75)";
      ctx.lineWidth = 6;
      ctx.strokeRect(74, 74, 876, 1452);

      // Corners
      const drawCorner = (x: number, y: number, angle: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.strokeStyle = "#e6ca65";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, 70, 0, Math.PI / 2);
        ctx.stroke();

        ctx.fillStyle = "#d4af37";
        ctx.beginPath();
        ctx.arc(45, 45, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCorner(74, 74, 0);
      drawCorner(950, 74, Math.PI / 2);
      drawCorner(950, 1526, Math.PI);
      drawCorner(74, 1526, -Math.PI / 2);

      const cx = 512;
      const cy = 800;

      // Concentric Runic Circles
      const ringRadii = [420, 360, 290, 220, 150, 80];
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? "rgba(212, 175, 55, 0.7)" : "rgba(212, 175, 55, 0.35)";
        ctx.lineWidth = idx === 0 ? 5 : 2.5;
        if (idx === 1) ctx.setLineDash([12, 12]);
        else ctx.setLineDash([]);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // 16 Sacred Rays
      ctx.strokeStyle = "rgba(212, 175, 55, 0.65)";
      ctx.lineWidth = 3;
      for (let i = 0; i < 16; i++) {
        const rad = (i * Math.PI) / 8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * 100, cy + Math.sin(rad) * 100);
        ctx.lineTo(cx + Math.cos(rad) * 360, cy + Math.sin(rad) * 360);
        ctx.stroke();
      }

      // Flower of Life
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = cx + Math.cos(angle) * 150;
        const py = cy + Math.sin(angle) * 150;
        ctx.beginPath();
        ctx.arc(px, py, 150, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Center Core
      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(cvs);
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      return tex;
    };

    // Card Front Texture: Dynamic Rendering of Real Drawn Cards
    const createCardFrontTexture = (cardItem: TarotCardSceneItem): THREE.CanvasTexture => {
      const cvs = document.createElement("canvas");
      cvs.width = 1024;
      cvs.height = 1600;
      const ctx = cvs.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(cvs);

      // Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1600);
      bgGrad.addColorStop(0, "#090e1c");
      bgGrad.addColorStop(0.35, "#131b2e");
      bgGrad.addColorStop(0.7, "#172238");
      bgGrad.addColorStop(1, "#0a0f1e");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 1600);

      // Gold Frames
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, 952, 1528);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(58, 58, 908, 1484);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.8)";
      ctx.lineWidth = 6;
      ctx.strokeRect(74, 74, 876, 1452);

      // Position Label Header (e.g. "VỊ TRÍ: QUÁ KHỨ" or "HIỆN TẠI")
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 44px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(cardItem.positionLabel.toUpperCase(), 512, 145);

      // Roman Numeral / Rank Tag
      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 90px serif";
      ctx.fillText(cardItem.roman || "✦", 512, 245);

      // Central Portal Artwork Halo
      const cx = 512;
      const cy = 680;

      const haloGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 290);
      haloGrad.addColorStop(0, "rgba(212, 175, 55, 0.45)");
      haloGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.2)");
      haloGrad.addColorStop(1, "rgba(10, 15, 30, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 290, 0, Math.PI * 2);
      ctx.fill();

      // Outer Runic Frame for Artwork
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 220, 0, Math.PI * 2);
      ctx.stroke();

      // Card Icon / Centerpiece
      ctx.font = "140px 'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', 'Twemoji Mozilla', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cardItem.icon, cx, cy - 20);

      // Orientation Status Ribbon
      if (cardItem.isReversed) {
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 38px sans-serif";
        ctx.fillText("↻ TRẠNG THÁI NGƯỢC (REVERSED)", cx, cy + 155);
      } else {
        ctx.fillStyle = "#10b981";
        ctx.font = "bold 38px sans-serif";
        ctx.fillText("✦ TRẠNG THÁI XUÔI (UPRIGHT) ✦", cx, cy + 155);
      }

      // Vietnamese Card Name
      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 64px serif";
      ctx.fillText(cardItem.nameVi.toUpperCase(), cx, 1080);

      // English Name
      ctx.fillStyle = "#94a3b8";
      ctx.font = "italic 38px serif";
      ctx.fillText(cardItem.nameEn, cx, 1145);

      // Element & Suit Badge
      ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
      ctx.fillRect(cx - 220, 1205, 440, 52);
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 220, 1205, 440, 52);

      ctx.fillStyle = "#fef08a";
      ctx.font = "28px sans-serif";
      ctx.fillText(`Nguyên Tố: ${cardItem.element}`, cx, 1242);

      // Keywords Pill
      const kwText = cardItem.keywords.slice(0, 3).join(" • ");
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "32px serif";
      ctx.fillText(kwText, cx, 1370);

      const tex = new THREE.CanvasTexture(cvs);
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      return tex;
    };

    const backTexture = createCardBackTexture();

    // Compute Card items based on cardsData prop or selected cardCount
    const rawCards: DrawnCardResult[] = cardsDataRef.current || [];
    let activeCardsList: TarotCardSceneItem[] = [];

    if (rawCards.length > 0) {
      activeCardsList = rawCards.map((rc, idx) => ({
        index: idx,
        id: rc.card.id,
        nameVi: rc.card.nameVi,
        nameEn: rc.card.nameEn,
        roman: rc.card.roman,
        positionLabel: rc.position.label,
        element: rc.card.element,
        isReversed: rc.isReversed,
        visualSymbol: rc.card.visualSymbol,
        icon: rc.card.icon,
        keywords: rc.keywords,
      }));
    } else {
      // Placeholder cards matching the chosen spread count
      if (cardCount === 1) {
        activeCardsList = [
          {
            index: 0,
            id: "oracle",
            nameVi: "Thông Điệp Khởi Tâm",
            nameEn: "Daily Oracle",
            roman: "✦",
            positionLabel: "Khởi Tâm",
            element: "Vũ Trụ",
            isReversed: false,
            visualSymbol: "Ngôi sao hy vọng",
            icon: "✨",
            keywords: ["Tỉnh thức", "Định hướng", "Bình an"],
          },
        ];
      } else if (cardCount === 5) {
        activeCardsList = [
          {
            index: 0,
            id: "present_core",
            nameVi: "Hiện Trạng",
            nameEn: "Core Present",
            roman: "I",
            positionLabel: "Hiện Trạng",
            element: "Đất",
            isReversed: false,
            visualSymbol: "Thực tại",
            icon: "🌱",
            keywords: ["Thực tế", "Vững chãi", "Hiện hữu"],
          },
          {
            index: 1,
            id: "cross_obstacle",
            nameVi: "Trở Ngại",
            nameEn: "Challenge",
            roman: "II",
            positionLabel: "Trở Ngại",
            element: "Lửa",
            isReversed: false,
            visualSymbol: "Thử thách",
            icon: "🔥",
            keywords: ["Thách thức", "Tôi luyện", "Định lực"],
          },
          {
            index: 2,
            id: "root_cause",
            nameVi: "Cội Rễ",
            nameEn: "Root Past",
            roman: "III",
            positionLabel: "Cội Rễ",
            element: "Nước",
            isReversed: false,
            visualSymbol: "Nguồn cội",
            icon: "💧",
            keywords: ["Tiềm thức", "Quá khứ", "Nghiệp quả"],
          },
          {
            index: 3,
            id: "trend_shift",
            nameVi: "Xu Hướng",
            nameEn: "Trend",
            roman: "IV",
            positionLabel: "Xu Hướng",
            element: "Khí",
            isReversed: false,
            visualSymbol: "Chuyển động",
            icon: "🌪️",
            keywords: ["Chuyển dịch", "Cơ hội", "Biến hóa"],
          },
          {
            index: 4,
            id: "awakening_destiny",
            nameVi: "Đốn Ngộ",
            nameEn: "Awakening",
            roman: "V",
            positionLabel: "Đốn Ngộ",
            element: "Ánh Sáng",
            isReversed: false,
            visualSymbol: "Giác ngộ",
            icon: "✦",
            keywords: ["Thức tỉnh", "Viên mãn", "Chân ngã"],
          },
        ];
      } else {
        // Default 3 cards
        activeCardsList = [
          {
            index: 0,
            id: "past",
            nameVi: "Quá Khứ",
            nameEn: "Past",
            roman: "I",
            positionLabel: "Quá Khứ",
            element: "Đất • Khí",
            isReversed: false,
            visualSymbol: "Ngọn đèn minh triết",
            icon: "🕯️",
            keywords: ["Cội nguồn", "Kinh nghiệm", "Tuệ giác"],
          },
          {
            index: 1,
            id: "present",
            nameVi: "Hiện Tại",
            nameEn: "Present",
            roman: "II",
            positionLabel: "Hiện Tại",
            element: "Lửa • Nước",
            isReversed: false,
            visualSymbol: "Vô cực thức tỉnh",
            icon: "♾️",
            keywords: ["Thực tại", "Tỉnh thức", "Hành động"],
          },
          {
            index: 2,
            id: "future",
            nameVi: "Tương Lai",
            nameEn: "Future",
            roman: "III",
            positionLabel: "Tương Lai",
            element: "Gió • Ánh Sáng",
            isReversed: false,
            visualSymbol: "Ngôi sao hy vọng",
            icon: "✨",
            keywords: ["Thịnh vượng", "Khai mở", "Bình an"],
          },
        ];
      }
    }

    const actualCardCount = activeCardsList.length;
    const frontTextures = activeCardsList.map(createCardFrontTexture);

    // Compute 3D Coordinates depending on Spread Size with gentle celestial fan arc
    let cardPositionsX: number[] = [];
    let cardScale = 1.0;
    if (actualCardCount === 1) {
      cardPositionsX = [0];
      cardScale = 1.05;
      camera.position.z = 8.5;
    } else if (actualCardCount === 3) {
      cardPositionsX = [-2.6, 0, 2.6];
      cardScale = 0.95;
      camera.position.z = 8.8;
    } else if (actualCardCount === 5) {
      cardPositionsX = [-2.85, -1.42, 0, 1.42, 2.85];
      cardScale = 0.74;
      camera.position.z = 9.4;
    } else {
      cardPositionsX = activeCardsList.map((_, i) => (i - (actualCardCount - 1) / 2) * 1.95);
      cardScale = 0.8;
      camera.position.z = 9.5;
    }

    // Build 3D Box Geometry
    const cardWidth = 2.15 * cardScale;
    const cardHeight = 3.45 * cardScale;
    const cardThickness = 0.045;
    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardThickness);

    const goldRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.35,
      roughness: 0.45,
    });

    interface CardObject {
      group: THREE.Group;
      mesh: THREE.Mesh;
      shadowMesh: THREE.Mesh;
      frontMaterial: THREE.MeshStandardMaterial;
      backMaterial: THREE.MeshStandardMaterial;
      baseX: number;
      baseY: number;
      baseZ: number;
      targetRotY: number;
      currentRotY: number;
      targetRotZ: number; // For reversed cards: 180 deg tilt
      currentRotZ: number;
      targetY: number;
      currentY: number;
      targetZ: number;
      currentZ: number;
      currentTiltX: number;
      currentTiltY: number;
      currentTiltZ: number;
      isFlipped: boolean;
      burstSpawned: boolean;
      isReversed: boolean;
    }

    const cards: CardObject[] = [];

    activeCardsList.forEach((cardItem, index) => {
      const posX = cardPositionsX[index];
      const posY = actualCardCount >= 5 ? -Math.abs(posX) * 0.08 : 0;
      const group = new THREE.Group();
      group.position.set(posX, posY, 0);

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTextures[index],
        metalness: 0.35,
        roughness: 0.45,
      });

      const cardBackMaterial = new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.35,
        roughness: 0.45,
      });

      const materials = [
        goldRimMaterial, // right edge
        goldRimMaterial, // left edge
        goldRimMaterial, // top edge
        goldRimMaterial, // bottom edge
        frontMaterial, // front (+Z)
        cardBackMaterial, // back (-Z)
      ];

      const mesh = new THREE.Mesh(cardGeometry, materials);
      // Face back initially towards camera (+Z)
      mesh.rotation.y = Math.PI;
      group.add(mesh);
      scene.add(group);

      // Contact shadow below card
      const cardShadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, cardShadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.set(posX, -2.15 * cardScale + posY, 0);
      scene.add(shadowMesh);

      cards.push({
        group,
        mesh,
        shadowMesh,
        frontMaterial,
        backMaterial: cardBackMaterial,
        baseX: posX,
        baseY: posY,
        baseZ: 0,
        targetRotY: Math.PI,
        currentRotY: Math.PI,
        targetRotZ: 0,
        currentRotZ: 0,
        targetY: 0,
        currentY: 0,
        targetZ: 0,
        currentZ: 0,
        currentTiltX: 0,
        currentTiltY: 0,
        currentTiltZ: 0,
        isFlipped: false,
        burstSpawned: false,
        isReversed: cardItem.isReversed,
      });
    });

    // Particle Bursts System
    const burstParticlesList: {
      points: THREE.Points;
      geometry: THREE.BufferGeometry;
      positions: Float32Array;
      velocities: Float32Array;
      colors: Float32Array;
      alphas: Float32Array;
      life: number;
      maxLife: number;
    }[] = [];

    const createParticleBurst = (originX: number, originY: number, originZ: number) => {
      const count = 350;
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const alphas = new Float32Array(count);

      const colorPalette = [
        new THREE.Color(0xfef08a),
        new THREE.Color(0xd4af37),
        new THREE.Color(0x38bdf8),
        new THREE.Color(0xffffff),
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = originX;
        positions[i * 3 + 1] = originY;
        positions[i * 3 + 2] = originZ + 0.1;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const speed = 1.2 + Math.random() * 2.8;

        velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
        velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
        velocities[i * 3 + 2] = Math.cos(phi) * speed * 0.7;

        const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;

        alphas[i] = 1.0;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      burstParticlesList.push({
        points,
        geometry,
        positions,
        velocities,
        colors,
        alphas,
        life: 0,
        maxLife: 2.2,
      });
    };

    // Stardust Field
    const stardustCount = 1400;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPositions = new Float32Array(stardustCount * 3);
    const stardustVelocities = new Float32Array(stardustCount * 3);

    for (let i = 0; i < stardustCount; i++) {
      stardustPositions[i * 3] = (Math.random() - 0.5) * 20;
      stardustPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      stardustPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      stardustVelocities[i * 3] = (Math.random() - 0.5) * 0.003;
      stardustVelocities[i * 3 + 1] = 0.002 + Math.random() * 0.004;
      stardustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    stardustGeo.setAttribute("position", new THREE.BufferAttribute(stardustPositions, 3));
    const stardustMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stardustPoints = new THREE.Points(stardustGeo, stardustMat);
    scene.add(stardustPoints);

    // Mouse & Raycasting
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
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
    };

    const onClick = () => {
      raycaster.setFromCamera(mouseNDC, camera);
      const meshes = cards.map((c) => c.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const index = cards.findIndex((c) => c.mesh === clickedMesh);
        if (index !== -1) {
          playCardFlipSound(528 + index * 60);
          onCardSelectRef.current?.(index);
        }
      }
    };

    window.addEventListener("mousemove", onPointerMove);
    container.addEventListener("click", onClick);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight * 0.6;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let startTime = performance.now();
    let previousTime = startTime;
    let lastDrawnState = isDrawnRef.current;
    let drawStartTime = isDrawnRef.current ? startTime : 0;

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const delta = (currentTime - previousTime) * 0.001;
      previousTime = currentTime;
      const time = (currentTime - startTime) * 0.001;

      const currentIsDrawn = isDrawnRef.current;
      if (currentIsDrawn && !lastDrawnState) {
        lastDrawnState = true;
        drawStartTime = currentTime;
        cards.forEach((c) => {
          c.burstSpawned = false;
        });
      } else if (!currentIsDrawn && lastDrawnState) {
        lastDrawnState = false;
        drawStartTime = 0;
      }

      // Parallax Mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.4;
      camera.lookAt(0, 0, 0);

      raycaster.setFromCamera(mouseNDC, camera);
      const meshes = cards.map((c) => c.mesh);
      const intersects = raycaster.intersectObjects(meshes);
      let activeHoverIdx: number | null = null;
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object;
        const idx = cards.findIndex((c) => c.mesh === hoveredMesh);
        activeHoverIdx = idx !== -1 ? idx : null;
      }
      setHoveredIndex(activeHoverIdx);

      if (activeHoverIdx === null) {
        goldSheenLight.intensity += (0 - goldSheenLight.intensity) * 0.1;
      }

      // Update Card Physics
      cards.forEach((card, idx) => {
        const floatY = Math.sin(time * 1.8 + idx * 1.3) * 0.08;
        const isHovered = activeHoverIdx === idx;

        if (currentIsDrawn) {
          const revealDelay = 0.35 + idx * 0.38;
          const drawElapsed = (currentTime - drawStartTime) * 0.001;
          if (drawElapsed >= revealDelay) {
            // Front face forward
            card.targetRotY = 0;
            // If reversed, rotate upside down Z axis (PI)
            card.targetRotZ = card.isReversed ? Math.PI : 0;
            card.targetZ = 0.45;
            card.targetY = 0.2;

            if (!card.burstSpawned && Math.abs(card.currentRotY - Math.PI / 2) < 0.3) {
              card.burstSpawned = true;
              createParticleBurst(card.baseX, 0.2, 0.5);
              playCardFlipSound(432 + idx * 80);
            }
          }
        } else {
          card.targetRotY = Math.PI;
          card.targetRotZ = 0;
          card.targetZ = 0;
          card.targetY = 0;
          card.burstSpawned = false;
        }

        card.currentRotY += (card.targetRotY - card.currentRotY) * 0.07;
        card.currentRotZ += (card.targetRotZ - card.currentRotZ) * 0.07;
        card.currentY += (card.targetY - card.currentY) * 0.08;
        card.currentZ += (card.targetZ - card.currentZ) * 0.08;

        // Mouse leaning tilt
        let targetTiltX = -mouse.y * 0.12;
        let targetTiltY = 0;
        let targetTiltZ = mouse.x * (idx - 1) * 0.04;

        if (isHovered) {
          const cardWorldX = card.group.position.x;
          const cardWorldY = card.group.position.y;
          const projectedMouseX = mouse.x * 4.2;
          const projectedMouseY = mouse.y * 2.8;

          targetTiltX = -(projectedMouseY - cardWorldY) * 0.18;
          targetTiltY = (projectedMouseX - cardWorldX) * 0.25;
          targetTiltZ = -(projectedMouseX - cardWorldX) * 0.04;

          goldSheenLight.intensity += (4.2 - goldSheenLight.intensity) * 0.15;
          goldSheenLight.position.set(
            cardWorldX + (projectedMouseX - cardWorldX) * 0.6,
            cardWorldY + (projectedMouseY - cardWorldY) * 0.6,
            card.group.position.z + 0.8
          );

          card.frontMaterial.roughness += (0.22 - card.frontMaterial.roughness) * 0.12;
          card.frontMaterial.metalness += (0.68 - card.frontMaterial.metalness) * 0.12;
          card.backMaterial.roughness += (0.22 - card.backMaterial.roughness) * 0.12;
          card.backMaterial.metalness += (0.68 - card.backMaterial.metalness) * 0.12;
        } else {
          card.frontMaterial.roughness += (0.45 - card.frontMaterial.roughness) * 0.08;
          card.frontMaterial.metalness += (0.35 - card.frontMaterial.metalness) * 0.08;
          card.backMaterial.roughness += (0.45 - card.backMaterial.roughness) * 0.08;
          card.backMaterial.metalness += (0.35 - card.backMaterial.metalness) * 0.08;
        }

        card.currentTiltX += (targetTiltX - card.currentTiltX) * 0.12;
        card.currentTiltY += (targetTiltY - card.currentTiltY) * 0.12;
        card.currentTiltZ += (targetTiltZ - card.currentTiltZ) * 0.12;

        card.mesh.rotation.x = card.currentTiltX;
        card.mesh.rotation.y = card.currentRotY + card.currentTiltY;
        card.mesh.rotation.z = card.currentRotZ + card.currentTiltZ;

        card.group.position.x = card.baseX + mouse.x * 0.1;
        card.group.position.y = card.baseY + card.currentY + floatY;
        card.group.position.z = card.baseZ + card.currentZ;

        // Shadow follow
        card.shadowMesh.position.x = card.group.position.x;
        card.shadowMesh.position.z = card.group.position.z;
        const shadowElev = card.currentY + floatY;
        const shadowScale = 1.0 + shadowElev * 0.35;
        card.shadowMesh.scale.set(shadowScale, shadowScale, 1);
        const shadowOpacity = Math.max(0.12, 0.55 - shadowElev * 0.28);
        (card.shadowMesh.material as THREE.MeshBasicMaterial).opacity = shadowOpacity;
      });

      // Update Bursts
      for (let b = burstParticlesList.length - 1; b >= 0; b--) {
        const burst = burstParticlesList[b];
        burst.life += delta;

        const pos = burst.positions;
        const vel = burst.velocities;
        const pCount = pos.length / 3;

        for (let i = 0; i < pCount; i++) {
          pos[i * 3] += vel[i * 3] * delta;
          pos[i * 3 + 1] += vel[i * 3 + 1] * delta;
          pos[i * 3 + 2] += vel[i * 3 + 2] * delta;

          vel[i * 3] *= 0.96;
          vel[i * 3 + 1] *= 0.96;
          vel[i * 3 + 2] *= 0.96;
        }

        burst.geometry.attributes.position.needsUpdate = true;
        (burst.points.material as THREE.PointsMaterial).opacity = Math.max(
          0,
          1 - burst.life / burst.maxLife
        );

        if (burst.life >= burst.maxLife) {
          scene.remove(burst.points);
          burst.geometry.dispose();
          (burst.points.material as THREE.PointsMaterial).dispose();
          burstParticlesList.splice(b, 1);
        }
      }

      // Update Stardust
      const sPos = stardustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < stardustCount; i++) {
        sPos[i * 3 + 1] += stardustVelocities[i * 3 + 1];
        if (sPos[i * 3 + 1] > 7) {
          sPos[i * 3 + 1] = -7;
        }
      }
      stardustGeo.attributes.position.needsUpdate = true;
      stardustPoints.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup WebGL and DOM
    return () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("click", onClick);

      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }

      burstParticlesList.forEach((b) => {
        scene.remove(b.points);
        b.geometry.dispose();
        (b.points.material as THREE.PointsMaterial).dispose();
      });
      burstParticlesList.length = 0;

      cardGeometry.dispose();
      goldRimMaterial.dispose();
      backMaterial.dispose();

      backTexture.dispose();
      frontTextures.forEach((t) => t.dispose());
      shadowTexture.dispose();

      cards.forEach((c) => {
        scene.remove(c.shadowMesh);
        (c.shadowMesh.material as THREE.MeshBasicMaterial).dispose();
        c.frontMaterial.dispose();
        c.backMaterial.dispose();
        scene.remove(c.group);
      });
      cards.length = 0;

      shadowGeo.dispose();
      scene.remove(goldSheenLight);
      goldSheenLight.dispose();

      scene.remove(stardustPoints);
      stardustGeo.dispose();
      stardustMat.dispose();

      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      try {
        const gl = renderer.getContext?.();
        if (gl && typeof gl.getExtension === "function") {
          const loseContext = gl.getExtension("WEBGL_lose_context");
          loseContext?.loseContext();
        }
        renderer.forceContextLoss?.();
      } catch {
        // Safe context disposal
      }

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [cardsData, cardCount]); // Re-initialize cleanly when cardsData or cardCount changes

  const activeCardForHint =
    hoveredIndex !== null && cardsData && cardsData[hoveredIndex]
      ? cardsData[hoveredIndex]
      : null;

  return (
    <div className="relative w-full h-full min-h-[460px] md:min-h-[580px] select-none">
      <div ref={containerRef} className="w-full h-full cursor-pointer relative z-10" />

      {activeCardForHint && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-full bg-black/80 border border-[#d4af37]/50 backdrop-blur-md text-xs font-mono tracking-widest text-[#fef08a] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          ✦ [{activeCardForHint.position.label}]: {activeCardForHint.card.nameVi} (
          {activeCardForHint.isReversed ? "Ngược" : "Xuôi"}) ✦
        </div>
      )}
    </div>
  );
}
