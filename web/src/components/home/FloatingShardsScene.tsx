"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const SHARDS: { pos: [number, number, number]; color: string; speed: number }[] = [
  { pos: [-1.8, 0.4, -0.5], color: "#7dd3fc", speed: 0.9 },
  { pos: [1.6, -0.2, 0.2], color: "#c4b5fd", speed: 1.1 },
  { pos: [0.2, 1.1, -1], color: "#fde68a", speed: 0.75 },
  { pos: [-0.9, -1, 0.8], color: "#94a3b8", speed: 1 },
  { pos: [2.1, 0.6, -0.9], color: "#fb923c", speed: 0.85 },
];

function Shard({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.31;
    ref.current.rotation.y = t * 0.42;
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <icosahedronGeometry args={[0.38, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.92}
        roughness={0.18}
        envMapIntensity={1.15}
      />
    </mesh>
  );
}

function Field() {
  return (
    <>
      <color attach="background" args={["#070d18"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 10, 4]} intensity={1.2} color="#e0f2fe" />
      <directionalLight position={[-4, -2, -2]} intensity={0.35} color="#312e81" />
      <pointLight position={[0, -2, 3]} intensity={1.8} color="#38bdf8" />
      {SHARDS.map((s, i) => (
        <Float
          key={i}
          speed={1.4 + i * 0.12}
          rotationIntensity={0.4}
          floatIntensity={0.55}
        >
          <Shard position={s.pos} color={s.color} speed={s.speed} />
        </Float>
      ))}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

/** Second full-scene WebGL band — crystalline shards, distinct from hero panels. */
export default function FloatingShardsScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 6.5], fov: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="h-full w-full"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Suspense fallback={null}>
          <Field />
        </Suspense>
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,transparent_0%,#070d18_78%)]"
        aria-hidden
      />
    </div>
  );
}
