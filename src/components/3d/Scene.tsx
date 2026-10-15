'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import { Avatar, VisemeData } from './Avatar';

interface SceneProps {
  visemes?: VisemeData[];
}

export function Scene({ visemes = [] }: SceneProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 1.2, 3.5], fov: 45 }} dpr={[1, 2]}>
        {/* Nền màu xanh đêm sâu thẳm mô phỏng không gian thiền định */}
        <color attach="background" args={['#0b1120']} />
        
        {/* Ánh sáng dịu nhẹ */}
        <ambientLight intensity={0.3} color="#e0f2fe" />
        <directionalLight position={[3, 5, 2]} intensity={0.8} color="#fef08a" />
        <pointLight position={[-2, 1, -3]} intensity={1.5} color="#1e3a8a" />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <Avatar position={[0, -0.5, 0]} visemes={visemes} />
          
          {/* Đổ bóng mờ ảo phía dưới Avatar */}
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={0.6} 
            scale={5} 
            blur={2.5} 
            far={2} 
            color="#000000" 
          />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0.5, 0]} 
        />
      </Canvas>
    </div>
  );
}
