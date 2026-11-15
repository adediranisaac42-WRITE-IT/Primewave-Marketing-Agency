"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, type Group, type Points } from "three";

const ORANGE = "#2F86FF";
const ORANGE_SOFT = "#8DBBFF";

/** Deterministic pseudo-random so the ring looks the same on every load. */
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function GrowthCore() {
  const group = useRef<Group>(null);
  const ring = useRef<Points>(null);

  const ringPositions = useMemo(() => {
    const n = 1200;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 2.3 + (rand(i) - 0.5) * 0.7;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (rand(i + 7) - 0.5) * 0.3;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Pointer parallax comes from the tilting hero container, so the scene only drifts.
    g.rotation.y += delta * 0.18;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    if (ring.current) ring.current.rotation.y -= delta * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={ORANGE} wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.85, 4]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.14} />
      </mesh>
      <points ref={ring} rotation={[0.4, 0, 0.12]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={ORANGE_SOFT}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
    >
      <GrowthCore />
    </Canvas>
  );
}
