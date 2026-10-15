'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface VisemeData {
  id: number;
  duration: number;
}

type AvatarProps = React.ComponentProps<'group'> & {
  visemes?: VisemeData[];
};

export function Avatar({ visemes = [], ...props }: AvatarProps) {
  const headRef = useRef<THREE.Mesh>(null);
  
  const currentVisemeIndex = useRef(0);
  const visemeTimer = useRef(0);
  const currentViseme = useRef<VisemeData | null>(null);

  useEffect(() => {
    if (visemes.length === 0) {
      currentVisemeIndex.current = 0;
      currentViseme.current = null;
    }
  }, [visemes]);

  useFrame((state, delta) => {
    if (headRef.current) {
      // Đảm bảo có mảng morphTargetInfluences
      if (!headRef.current.morphTargetInfluences) {
        headRef.current.morphTargetInfluences = new Array(50).fill(0);
      }

      const influences = headRef.current.morphTargetInfluences;
      
      // Dampen các visemes về 0 để mượt mà
      for (let i = 0; i < influences.length; i++) {
        influences[i] = THREE.MathUtils.lerp(influences[i], 0, 0.15);
      }

      // Xử lý visemes
      if (currentViseme.current) {
        visemeTimer.current -= delta * 1000;
        
        const vId = currentViseme.current.id;
        if (vId >= 0 && vId < influences.length) {
          influences[vId] = THREE.MathUtils.lerp(influences[vId], 1, 0.5);
        }

        if (visemeTimer.current <= 0) {
          currentViseme.current = null;
          currentVisemeIndex.current++;
        }
      } else {
        if (currentVisemeIndex.current < visemes.length) {
          currentViseme.current = visemes[currentVisemeIndex.current];
          visemeTimer.current = currentViseme.current?.duration ?? 0;
        }
      }

      // Tạo một chút animation "thở" nhẹ nhàng cho Avatar
      const time = state.clock.getElapsedTime();
      headRef.current.position.y = 0.8 + Math.sin(time * 1.5) * 0.02;
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Body - Dùng Cylinder tạm thời */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
      
      {/* Head - Dùng Box tạm thời */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.5} />
      </mesh>
    </group>
  );
}
