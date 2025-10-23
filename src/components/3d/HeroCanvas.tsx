// run on the client in order to render canvas with hooks
"use client";

import { useThree, Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, Environment, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";

// GSAP imports (scroll-based animation)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

// ScrollTrigger Register globally 
gsap.registerPlugin(ScrollTrigger);

// Default scroll settings reused across animations
const defaultScroll = {

  start: "top top",
  end: "+=1100",
  scrub: 0.8,
};

// Helper to cleanly dispose of a GSAP timeline when component unmounts
// Used in heavy components
function cleanupTimeline(tl: gsap.core.Timeline) {
  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

// ------------------------
// Reusable Hook: useScrollTrigger
// ------------------------
// Handles timeline creation, attaches ScrollTrigger, and ensures cleanup.
// Accepts a setup callback that returns a GSAP timeline or cleanup function.
function useScrollTrigger(
  tlSetup: (triggerEl: HTMLElement) => gsap.core.Timeline | (() => void),
  deps: any[] = []
) {
  React.useLayoutEffect(() => {
    const triggerEl = document.getElementById("hero");
    if (!triggerEl) return;

    const result = tlSetup(triggerEl);

    if (result instanceof gsap.core.Timeline) {
      return () => {
        result.scrollTrigger?.kill();
        result.kill();
      };
    }

    if (typeof result === "function") {
      return result;
    }
  }, deps);
}

// ------------------------
// Camera Animator
// ------------------------
// Moves the camera slightly on scroll while keeping focus on the origin (0,0,0).
function CameraAnimator() {
  const { camera } = useThree();
  const camRef = useRef(camera);

  useScrollTrigger(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.getElementById("hero")!, ...defaultScroll },
    });

    // Slide camera left as the user scrolls
    tl.to(camera.position, {
      x: -3, // left slide
      duration: 1,
      ease: "expo.inOut",
    });

    return tl;
  }, [camera]);

  // Keep camera looking at the center each frame
  useFrame(() => {
    camRef.current.lookAt(0, 0, 0);
  });

  return null;
}

// ------------------------
// iPhone 3D Model
// ------------------------
// Handles loading, scroll-based rotation, scaling, and cleanup.
function IPhoneModel() {
  const { scene } = useGLTF("/models/iphone17org.glb");
  const phoneRef = useRef<THREE.Group>(null!);

  // Define start, mid, and end orientations using quaternions for smooth rotation
  const startQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, -Math.PI / 2)
  );
  const middleQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler((5 * Math.PI) / 5.5, 0, -Math.PI)
  );
  const endQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, Math.PI / 2)
  );

  useScrollTrigger(() => {
    phoneRef.current.quaternion.copy(startQuat);
    const tempQuat = new THREE.Quaternion();

    // Create scroll driven timeline for rotation, scaling, and movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.getElementById("hero")!,
        start: "top top",
        end: "+=800", // used a shorter value since the animation is longer
        scrub: 0.8,
        pin: true,
        onLeave: () => (phoneRef.current.visible = false),
        onEnterBack: () => (phoneRef.current.visible = true),
      },
    });

    // Rotate smoothly from start → middle
    tl.to({ t: 0 }, {
      t: 1,
      duration: 1,
      ease: "power2.inOut",
      onUpdate() {
        tempQuat.slerpQuaternions(startQuat, middleQuat, this.progress());
        phoneRef.current.quaternion.copy(tempQuat);
      },
    });

    // Then middle → end orientation
    tl.to({ t: 0 }, {
      t: 1,
      ease: "power2.inOut",
      onUpdate() {
        tempQuat.slerpQuaternions(middleQuat, endQuat, this.progress());
        phoneRef.current.quaternion.copy(tempQuat);
      },
    });

    // Scale up to emphasize during scroll
    tl.to(phoneRef.current.scale, {
      x: 35, y: 35, z: 50,
      duration: 1,
      ease: "power2.inOut",
    }, ">");

    // Move forward in Z-space for depth
    tl.to(phoneRef.current.position, {
      z: 1,
      duration: 1,
      ease: "power2.inOut",
    }, "<");

    // Slide horizontally for a cinematic transition
    tl.to(phoneRef.current.position, {
      x: 15,
      duration: 1.5,
      ease: "power2.inOut",
    }, ">");

    return cleanupTimeline(tl);
  }, [scene]);

  // Clean up model geometry and materials when unmounted
  React.useEffect(() => {
    return () => {
      if (phoneRef.current) {
        phoneRef.current.traverse((child: any) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => m.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }
    };
  }, []);

  // Extra cleanup for the GLTF scene itself
  React.useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((child: any) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => m.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }
    };
  }, [scene]);

  return (
    <primitive
      ref={phoneRef}
      object={scene}
      scale={28}
      position={[0, -0.45, -1.0]}
    />
  );
}

// ------------------------
// Background Text
// ------------------------
// Animated glowing text that shifts as user scrolls.
function BackgroundText() {
  const textRef = useRef<THREE.Mesh>(null!);


useScrollTrigger((triggerEl) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl, // <- use the passed element
      ...defaultScroll,
        onLeave: () => (textRef.current.visible = false),
        onEnterBack: () => (textRef.current.visible = true),
    },
    });

    // Animate text sliding left
    tl.to(textRef.current.position, {
      x: -10,
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.5,
    });

    return tl;
  }, []);

  
  return (
    <Text
      ref={textRef}
      font="/fonts/Inter_28pt-Light.ttf"
      position={[0, -0.05, -2.8]}
      rotation={[0, 0, 0]}
      fontSize={0.7}
      anchorX="center"
      anchorY="middle"
    >
      iPhone 17 PRO
      <meshStandardMaterial
        color="#C05D24"
        emissive="#C05D24"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </Text>
  );
}

// ------------------------
// Horizon Line
// ------------------------
// Creates a glowing circular plane under the phone for visual depth.
function HorizonLine() {
  const meshRef = useRef<THREE.Mesh>(null!);

useScrollTrigger((triggerEl) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl, // <- use the passed element
      ...defaultScroll,
      onLeave: () => (meshRef.current.visible = false),
      onEnterBack: () => (meshRef.current.visible = true),
    },
  });

  tl.to(meshRef.current.position, {
    x: -15,
    duration: 1.5,
    ease: "power2.inOut",
    delay: 0.5,
  });

  return tl;
}, []);


  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, -3]}
      scale={[2.3, 0.05, 0.4]}
    >
      <circleGeometry args={[3, 100]} />
      <meshBasicMaterial color="#C05D24" transparent opacity={10} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ------------------------
// Apple Logo Plane
// ------------------------
// Displays a 2D Apple logo as part of the scene background, moving subtly on scroll.
function AppleLogoPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, "/Icons/appleOrg.svg");

  useScrollTrigger(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.getElementById("hero")!,
        start: "top top+=5",
        end: "+=1100",
        scrub: 0.8,
      },
    });

    // Translate Apple logo left on scroll
    tl.to(meshRef.current.position, { x: -10, duration: 1.5, ease: "power2.inOut", delay: 0.5 });

    // Cleanup texture and geometry to prevent GPU leaks
    return () => {
      cleanupTimeline(tl)();
      texture?.dispose();
      meshRef.current?.geometry?.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef} position={[0, -1.6, -2]} scale={[0.7, 0.8, 0.7]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

// ------------------------
// Hero Canvas
// ------------------------
// The main exported component that renders the full 3D scene.
// Uses IntersectionObserver to pause rendering when not visible.
export default function HeroCanvas() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0.7, 6], fov: 45 }}
        frameloop={inView ? "always" : "never"} // Optimizes performance
      >
        <Suspense fallback={null}>
          <CameraAnimator />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.2} castShadow />
          <HorizonLine />
          <BackgroundText />
          <IPhoneModel />
          <AppleLogoPlane />
          <Environment preset="night" background={false} />
          <EffectComposer>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
