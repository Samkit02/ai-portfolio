"use client";

import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroCanvas() {
  return (
    <div
      className="hero-three-bg absolute inset-0 z-0 h-full min-h-screen w-full"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}
