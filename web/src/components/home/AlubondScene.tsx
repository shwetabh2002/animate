"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

export type AlubondSceneTone = "noir" | "studio";

function SandwichPanel({
  position,
  baseRotation,
  accent,
}: {
  position: [number, number, number];
  baseRotation: [number, number, number];
  accent: string;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = baseRotation[1] + Math.sin(t * 0.18) * 0.08;
    group.current.rotation.x = baseRotation[0] + Math.cos(t * 0.15) * 0.04;
  });

  return (
    <group ref={group} position={position} rotation={baseRotation}>
      <mesh position={[0, 0, 0.045]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.4, 0.018]} />
        <meshStandardMaterial
          color={accent}
          metalness={0.88}
          roughness={0.28}
          envMapIntensity={1.15}
        />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.4, 0.035]} />
        <meshStandardMaterial
          color="#141418"
          metalness={0.2}
          roughness={0.82}
        />
      </mesh>
      <mesh position={[0, 0, -0.045]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.4, 0.018]} />
        <meshStandardMaterial
          color="#9aa3b2"
          metalness={0.78}
          roughness={0.42}
          envMapIntensity={0.95}
        />
      </mesh>
    </group>
  );
}

function FlatPanel({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: [number, number, number];
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed * 0.55;
    ref.current.rotation.y = t * 0.14;
    ref.current.rotation.x = Math.sin(t * 0.22) * 0.045;
  });
  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={0.88}
        roughness={0.32}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function EnvMap({ preset }: { preset: "city" | "studio" }) {
  return <Environment preset={preset} />;
}

function SceneMeshes({ tone }: { tone: AlubondSceneTone }) {
  const accent = useMemo(
    () => ["#c41e3a", "#0c2340", "#c9a227", "#2d6a4f", "#7c8799", "#e8dfd5"],
    []
  );

  const studio = tone === "studio";

  return (
    <>
      <hemisphereLight
        args={
          studio
            ? ["#f5f3eb", "#7d8f78", 1.05]
            : ["#e8f0ff", "#0a0c12", 0.95]
        }
      />
      <ambientLight intensity={studio ? 0.52 : 0.28} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={studio ? 1.15 : 1.45}
        color={studio ? "#fffef8" : "#ffffff"}
        castShadow
      />
      <directionalLight
        position={[-5, 4, -3]}
        intensity={studio ? 0.35 : 0.55}
        color={studio ? "#6b8f6b" : "#4a7ab8"}
      />
      <pointLight
        position={[0, -2.2, 3]}
        intensity={studio ? 1.35 : 2.4}
        color={studio ? "#e8a882" : "#ff6b2c"}
      />
      <pointLight
        position={[4, 4, 5]}
        intensity={studio ? 0.5 : 0.65}
        color="#ffffff"
      />

      <Float speed={0.85} rotationIntensity={0.18} floatIntensity={0.32}>
        <SandwichPanel
          position={[0, 0.15, 0]}
          baseRotation={[0.25, -0.35, 0]}
          accent={studio ? "#f2f4f7" : "#dfe6ef"}
        />
      </Float>

      <FlatPanel
        position={[-2.4, 0.9, -0.8]}
        color={accent[0]}
        size={[1.1, 1.6, 0.06]}
        speed={0.9}
      />
      <FlatPanel
        position={[2.5, -0.4, -0.5]}
        color={accent[1]}
        size={[1.2, 1.7, 0.06]}
        speed={1.1}
      />
      <FlatPanel
        position={[1.8, 1.2, -1.2]}
        color={accent[2]}
        size={[0.95, 1.4, 0.06]}
        speed={0.75}
      />
      <FlatPanel
        position={[-2.1, -1, -0.6]}
        color={accent[3]}
        size={[1, 1.5, 0.06]}
        speed={1}
      />
      <FlatPanel
        position={[-0.8, 1.5, -1.4]}
        color={accent[4]}
        size={[0.85, 1.25, 0.06]}
        speed={0.85}
      />
      <FlatPanel
        position={[2.2, 1.0, 0.2]}
        color={accent[5]}
        size={[0.9, 1.3, 0.06]}
        speed={0.95}
      />

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={studio ? 0.35 : 0.5}
        scale={14}
        blur={2.2}
        far={5}
      />

      <Suspense fallback={null}>
        <EnvMap preset={studio ? "studio" : "city"} />
      </Suspense>
    </>
  );
}

export default function AlubondScene({
  tone = "noir",
}: {
  tone?: AlubondSceneTone;
}) {
  const studio = tone === "studio";
  const bg = studio ? "#b9c4b1" : "#05070c";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full min-h-0 select-none"
      aria-hidden
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.25, 7.4], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <color attach="background" args={[bg]} />
        <SceneMeshes tone={tone} />
      </Canvas>
      {studio ? (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[25%] bg-gradient-to-t from-[#b9c4b1]/95 via-[#b9c4b1]/35 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_75%_at_50%_35%,transparent_0%,transparent_50%,rgba(90,105,88,0.12)_100%)]"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[32%] bg-gradient-to-t from-[#05070c] via-[#05070c]/40 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_85%_at_50%_36%,transparent_0%,transparent_42%,rgba(5,7,12,0.38)_100%)]"
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
