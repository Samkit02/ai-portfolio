"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const mouseRef = { x: 0, y: 0 };

const PARTICLE_COUNT = 3000;
const COLORS = [
  new THREE.Color("#6c63ff"), // purple
  new THREE.Color("#ff6b6b"), // pink
  new THREE.Color("#43e97b"), // green
];

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const { position, color } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const t = Math.random();
      const c = t < 0.6 ? COLORS[0] : t < 0.8 ? COLORS[1] : COLORS[2];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return {
      position: new THREE.BufferAttribute(positions, 3),
      color: new THREE.BufferAttribute(colors, 3),
    };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.02 * delta;
      ref.current.rotation.x += 0.01 * delta;
    }
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[position.array as Float32Array, position.itemSize]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[color.array as Float32Array, color.itemSize]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShapes() {
  const geos = [
    <octahedronGeometry key="o" args={[0.3, 0]} />,
    <tetrahedronGeometry key="t" args={[0.25, 0]} />,
    <icosahedronGeometry key="i" args={[0.2, 0]} />,
  ];

  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
          ]}
        >
          <mesh>
            {geos[i % geos.length]}
            <meshBasicMaterial
              color="#6c63ff"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function CameraParallax() {
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    currentRef.current.x += (mouseRef.x - currentRef.current.x) * 0.03;
    currentRef.current.y += (mouseRef.y - currentRef.current.y) * 0.03;
    state.camera.position.x = currentRef.current.x * 0.5;
    state.camera.position.y = currentRef.current.y * 0.3;
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });

  return (
    <group>
      <StarField />
      <FloatingShapes />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[3, 0, -2]}>
          <torusKnotGeometry args={[1.5, 0.08, 120, 16]} />
          <meshBasicMaterial
            color="#6c63ff"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return <CameraParallax />;
}
