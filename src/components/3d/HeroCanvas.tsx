// HeroCanvas.tsx (update this file)
// "use client";
import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Text } from "@react-three/drei";
import { Suspense, useRef, useLayoutEffect, useEffect } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// GSAP imports (use dist path which is friendly for client-only modules)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// register plugin
gsap.registerPlugin(ScrollTrigger);

function IPhoneModel({
  setShowWrapper,
  isSwipedUp,
}: {
  setShowWrapper: (val: boolean) => void;
  isSwipedUp: boolean;
}) {
  const { scene } = useGLTF("/models/iphone17.glb");
  const phoneRef = useRef<THREE.Group>(null!);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Define rotations as quaternions
  const startQuat = new THREE.Quaternion().setFromEuler(
   new THREE.Euler(-Math.PI / 2, 0, -Math.PI / 2)
  );
  const middleQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler((5 * Math.PI) / 5.5, 0, -Math.PI)
  );
  const endQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, Math.PI / 2)  
  );

  useLayoutEffect(() => {
    if (!phoneRef.current) return;

    // Set initial rotation
    phoneRef.current.quaternion.copy(startQuat);

    const triggerEl = document.getElementById("hero");
    if (!triggerEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "top top",
        end: "+=1000",
        scrub: true,
        pin: true,
        onLeave: () => setShowWrapper(true),
        onEnterBack: () => setShowWrapper(false),
      },
    });

    const tempQuat = new THREE.Quaternion();

    // Animate start → middle
    tl.to({ t: 0 }, {
      t: 1,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function () {
        tempQuat.slerpQuaternions(startQuat, middleQuat, this.progress());
        phoneRef.current!.quaternion.copy(tempQuat);
      },
    });

    // Animate middle → end
    tl.to({ t: 0 }, {
      t: 1,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function () {
        tempQuat.slerpQuaternions(middleQuat, endQuat, this.progress());
        phoneRef.current!.quaternion.copy(tempQuat);
      },
    });

    tlRef.current = tl;

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scene, setShowWrapper]);

  // Watch isSwipedUp and freeze/unfreeze animation
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || !tl.scrollTrigger) return;

    if (isSwipedUp) {
      tl.progress(1, false);
      tl.scrollTrigger.disable();
      phoneRef.current?.quaternion.copy(endQuat);
      console.log("Swipe UP → Hero section frozen at end state");
    } else {
      tl.scrollTrigger.enable();
      console.log("Swipe DOWN → Hero section scroll restored");
    }
  }, [isSwipedUp]);

  // Optional: log current rotation in Euler for debugging
  useFrame(() => {
    if (phoneRef.current) {
      const euler = new THREE.Euler().setFromQuaternion(phoneRef.current.quaternion);
      console.log(
        "Phone rotation:",
        euler.x.toFixed(2),
        euler.y.toFixed(2),
        euler.z.toFixed(2)
      );
    }
  });

  return (
    <primitive
      ref={phoneRef}
      object={scene}
      scale={28}
      position={[0, -0.45, -1.0]}
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
export default function HeroCanvas({
  setShowWrapper,
  isSwipedUp,
}: {
  setShowWrapper: (val: boolean) => void;
  isSwipedUp: boolean;
}) { return (
    <Canvas camera={{ position: [0, 0.7, 6], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.2} castShadow />

      <HorizonLine />

      <Suspense fallback={null}>
        <BackgroundText />
        <IPhoneModel setShowWrapper={setShowWrapper} isSwipedUp={isSwipedUp} /> {/* pass it */}
        <Environment preset="night" background={false} />
        <AppleLogoPlane />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.8} />
      </EffectComposer>
    </Canvas>
  );
}
