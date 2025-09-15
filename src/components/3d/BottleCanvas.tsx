"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function IPhoneModel() {
  const { scene } = useGLTF("/models/iphone17.glb");

  return (
    <primitive
      object={scene}
      scale={6} // bigger size
      position={[0, -0.2, 0]} // slightly lifted up
    />
  );
}

export default function BottleCanvas() {
  return (
    <div className="w-full h-[500px] md:h-[700px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 35 }}>
        {/* --- Lighting Setup --- */}
        {/* Soft overall light */}
        <ambientLight intensity={0.6} />

        {/* Key light from the right */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />

        {/* Fill light from the left */}
        <directionalLight position={[-5, 2, 3]} intensity={0.8} />

        {/* Rim light from behind for glossy edges */}
        <directionalLight position={[0, 5, -5]} intensity={0.7} />

        {/* --- Model + Environment --- */}
        <Suspense fallback={null}>
          <IPhoneModel />

          {/* Environment map for realistic reflections */}
          <Environment preset="city" background={false} />
          {/* Try: "sunset", "night", "warehouse" */}
        </Suspense>

        {/* --- Controls --- */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2.5}
        />
      </Canvas>
    </div>
  );
}
