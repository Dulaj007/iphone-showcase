// HeroCanvas.tsx (update this file)
// "use client";
import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Text } from "@react-three/drei";
import { Suspense, useRef, useLayoutEffect } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// GSAP imports (use dist path which is friendly for client-only modules)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// register plugin
gsap.registerPlugin(ScrollTrigger);

function IPhoneModel() {
  const { scene } = useGLTF("/models/iphone17.glb");
  const phoneRef = useRef<THREE.Group>(null!);

  const startRotation = {
    x: Math.PI,
    y: Math.PI / 10,
    z: Math.PI / 0.9,
  };

  const middleRotation = {
    x: Math.PI / 2,
    y: 0,
    z: Math.PI / 2,
  };

  const endRotation = {
    x: Math.PI / 2,
    y: 0,
    z: Math.PI / 2,
  };

  useLayoutEffect(() => {
    if (!phoneRef.current) return;

    // set initial rotation
    phoneRef.current.rotation.set(startRotation.x, startRotation.y, startRotation.z);

    const triggerEl = document.getElementById("hero");
    if (!triggerEl) return;

    // create a timeline instead of single tween
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "top top",
        end: "+=1000", // scroll distance
        scrub: true,
        pin: true,
      },
    });

    // Animate start → middle → end
    tl.to(phoneRef.current.rotation, {
      x: middleRotation.x,
      y: middleRotation.y,
      z: middleRotation.z,
      ease: "none",
      duration: 0.5, // first half of scroll
    }).to(phoneRef.current.rotation, {
      x: endRotation.x,
      y: endRotation.y,
      z: endRotation.z,
      ease: "none",
      duration: 0.5, // second half of scroll
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scene]);

  return (
    <primitive
      ref={phoneRef}
      object={scene}
      scale={28}
      position={[0, -0.45, -1.]}
    />
  );
}




function BackgroundText() {
  return (
    <Text 
      font="/fonts/Inter_28pt-Light.ttf" 
      position={[0, -0.05, -2.8]}
      rotation={[0, 0, 0]}
      fontSize={0.7}
      anchorX="center"
      anchorY="middle"
    >
      iPhone 17 PRO
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </Text>
  );
}

function HorizonLine() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const flareRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
    }

  });

  return (
    <>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, -3]}
        scale={[2.3, 0.008, 0.4]}
      >
        <circleGeometry args={[3, 100]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={10}
          side={THREE.DoubleSide}
        />
      </mesh>


    </>
  );
}

function AppleLogoPlane() {
  const texture = useLoader(THREE.TextureLoader, "/Icons/apple-logo.svg");

  return (
    <mesh position={[0, -1.45, -2]} scale={[0.7, 0.7, 0.7]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.7, 6], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.2} castShadow />

      <HorizonLine />

      <Suspense fallback={null}>
        <BackgroundText />
        <IPhoneModel />
        
<Environment preset="night" background={false} />


        <AppleLogoPlane />
      </Suspense>
  
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.8} />
      </EffectComposer>

    </Canvas>
  );
}
