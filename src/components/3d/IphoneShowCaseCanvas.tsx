"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function IPhoneModel() {
  const { scene } = useGLTF("/models/iphone17.glb");

  return (
    <primitive
      object={scene}
scale={5}
position={[0, 0, 0]} // x y z
camera={{ position: [0, 0, 2], fov: 30 }}

    />
  );
}

export default function BottleCanvas() {
  return (
    <div className="w-full h-[500px] md:h-[700px]">
      <Canvas camera={{ position: [0, 0, 2], fov: 35 }}>
        {/* Lights */}
        <ambientLight intensity={1} />


        {/* Key light from the right */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />

        {/* Fill light from the left */}
        <directionalLight position={[-5, 2, 3]} intensity={0.8} />

        {/* Rim light from behind for glossy edges */}
        <directionalLight position={[0, 5, -5]} intensity={0.7} />
        {/* 3D Model */}
             <Suspense fallback={null}>
                 <IPhoneModel />
       
                 {/* Environment map for realistic reflections */}
                 <Environment preset="city" background={false} />
                 {/* Try: "sunset", "night", "warehouse" */}
               </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2} // faster auto spin
        />
      </Canvas>
    </div>
  );
}
