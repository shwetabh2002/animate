"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const SLABS: { color: string; label: string }[] = [
  { color: "#f5e6a3", label: "Solid" },
  { color: "#c4a574", label: "Stone" },
  { color: "#c5ccd4", label: "Anodized" },
  { color: "#c1121f", label: "Crimson" },
  { color: "#0d5c63", label: "Teal" },
  { color: "#1c1c1e", label: "Charcoal" },
];

function RotatingSlab({
  position,
  color,
  phase,
}: {
  position: [number, number, number];
  color: string;
  phase: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.12 + phase;
    ref.current.rotation.x = Math.sin(t * 0.28 + phase) * 0.06;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.85, 1.15, 0.06]} />
        <meshStandardMaterial
          color={color}
          metalness={0.88}
          roughness={0.28}
          envMapIntensity={1}
        />
      </mesh>
      <mesh position={[0, 0, -0.04]} castShadow>
        <boxGeometry args={[0.85, 1.15, 0.02]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.15} roughness={0.9} />
      </mesh>
    </group>
  );
}

function SlabField() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.06) * 0.04;
  });

  const spacing = 1.35;
  const startX = -((SLABS.length - 1) * spacing) / 2;

  return (
    <group ref={group}>
      {SLABS.map((s, i) => (
        <Float
          key={s.label}
          speed={0.65 + i * 0.04}
          rotationIntensity={0.08}
          floatIntensity={0.22}
        >
          <RotatingSlab
            position={[startX + i * spacing, 0, 0]}
            color={s.color}
            phase={i * 0.7}
          />
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.05}
        color="#ffffff"
        castShadow
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#a8b8d0" />
      <pointLight position={[0, -1, 4]} intensity={0.55} color="#e8a882" />
      <SlabField />
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}

export default function Series3DShowcase() {
  return (
    <div
      className="relative h-[min(52vw,420px)] min-h-[280px] w-full overflow-hidden rounded-[1.75rem] border border-stone-300/60 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-200/80 sm:h-[min(48vw,460px)] sm:min-h-[300px]"
      role="img"
      aria-label="Rotating 3D composite panel samples"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.15, 6.4], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="h-full w-full"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_48%,transparent,rgba(250,250,249,0.45))]"
        aria-hidden
      />
      <p className="pointer-events-none absolute bottom-4 left-5 text-[10px] font-medium uppercase tracking-[0.32em] text-stone-500 sm:left-8">
        Live 3D
      </p>
    </div>
  );
}
