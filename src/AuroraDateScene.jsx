import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Sparkles, Text, Cloud, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AuroraDateScene({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
      style={{ 
        backgroundImage: 'url(/aurora.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
      >
        <X size={24} className="text-white" />
      </button>
      
      <div className="w-full h-full">
        <Canvas 
          camera={{ position: [8, 4, 12], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          {/* Fog for atmospheric depth */}
          <fog attach="fog" args={['#1a1a2e', 10, 120]} />
          
          {/* Cinematic lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={0.5} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#87ceeb" />
          <pointLight position={[-10, 5, -10]} intensity={0.6} color="#ff6b9d" />
          
          {/* Stars */}
          <Stars radius={150} depth={60} count={2000} factor={4} saturation={0} fade speed={0.8} />
          
          {/* Aurora Effect */}
<mesh position={[0, 25, -50]}>
  <planeGeometry args={[80, 25]} />
  <meshBasicMaterial
    color="#00ffaa"
    transparent
    opacity={0.15}
  />
</mesh>
          {/* Mountains */}
          <Mountains />
          
          {/* Pine Trees */}
          <PineTrees />
          
          {/* Ground - Snow covered with texture */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[150, 150, 50, 50]} />
            <meshStandardMaterial 
              color="#f5f5f5" 
              roughness={0.9} 
              metalness={0.05}
            />
          </mesh>
          
          {/* Romantic Table */}
          <Table position={[0, -2, 0]} />
          
          {/* Romantic Pathway with Lanterns */}
          <RomanticPathway position={[-2.5, -2, 2]} />
          
          {/* Cozy House */}
          <CozyHouse position={[-5, -2, -5]} />
          
          {/* Campfire */}
          <Campfire position={[3, -1.8, 2]} />
          
          {/* Two figures representing the couple */}
          <CoupleFigures />
          
          {/* Small Snowman */}
          <Snowman position={[6, -2, -2]} />
          
          {/* Snowfall particles */}
          <Snowfall count={500} />
          
          {/* Sparkles around the scene */}
          <Sparkles count={150} scale={15} size={4} speed={0.3} opacity={0.4} color="#ff6b9d" />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={8}
            maxDistance={30}
            target={[0, 1, 0]}
          />
          
          {/* Romantic text */}
          <Text
            position={[0, 8, 0]}
            fontSize={1}
            color="#ff6b9d"
            anchorX="center"
            anchorY="middle"
          >
            Our Perfect Date Night
          </Text>
        </Canvas>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg font-dancing">Drag to rotate • Scroll to zoom</p>
      </div>
    </motion.div>
  )
}

function Mountains() {
  return (
    <group>
      {/* Mountain 1 - Large center back */}
      <mesh position={[0, -8, -60]} castShadow>
        <coneGeometry args={[30, 50, 16]} />
        <meshStandardMaterial color="#3d4a5c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 17, -60]} castShadow>
        <coneGeometry args={[12, 15, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Mountain 2 - Left back */}
      <mesh position={[-40, -6, -65]} castShadow>
        <coneGeometry args={[28, 45, 14]} />
        <meshStandardMaterial color="#2d3a4c" roughness={0.9} />
      </mesh>
      <mesh position={[-40, 15, -65]} castShadow>
        <coneGeometry args={[10, 12, 14]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
      
      {/* Mountain 3 - Right back */}
      <mesh position={[45, -6, -62]} castShadow>
        <coneGeometry args={[29, 42, 15]} />
        <meshStandardMaterial color="#3d4a5c" roughness={0.9} />
      </mesh>
      <mesh position={[45, 14, -62]} castShadow>
        <coneGeometry args={[11, 13, 15]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Mountain 4 - Far left */}
      <mesh position={[-70, -4, -70]} castShadow>
        <coneGeometry args={[25, 38, 12]} />
        <meshStandardMaterial color="#2d3a4c" roughness={0.9} />
      </mesh>
      <mesh position={[-70, 13, -70]} castShadow>
        <coneGeometry args={[9, 11, 12]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>
      
      {/* Mountain 5 - Far right */}
      <mesh position={[75, -4, -68]} castShadow>
        <coneGeometry args={[26, 40, 13]} />
        <meshStandardMaterial color="#3d4a5c" roughness={0.9} />
      </mesh>
      <mesh position={[75, 15, -68]} castShadow>
        <coneGeometry args={[10, 12, 13]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Mountain 6 - Left side */}
      <mesh position={[-60, -5, -40]} rotation={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[22, 35, 12]} />
        <meshStandardMaterial color="#2d3a4c" roughness={0.9} />
      </mesh>
      <mesh position={[-60, 12, -40]} rotation={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[8, 10, 12]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
      
      {/* Mountain 7 - Right side */}
      <mesh position={[65, -5, -42]} rotation={[0, -0.3, 0]} castShadow>
        <coneGeometry args={[23, 36, 12]} />
        <meshStandardMaterial color="#3d4a5c" roughness={0.9} />
      </mesh>
      <mesh position={[65, 13, -42]} rotation={[0, -0.3, 0]} castShadow>
        <coneGeometry args={[9, 11, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Small hills in foreground */}
      <mesh position={[-25, -2, -25]} castShadow>
        <coneGeometry args={[8, 6, 10]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.95} />
      </mesh>
      <mesh position={[30, -2, -28]} castShadow>
        <coneGeometry args={[9, 7, 10]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.95} />
      </mesh>
      <mesh position={[0, -2, -30]} castShadow>
        <coneGeometry args={[7, 5, 10]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.95} />
      </mesh>
      <mesh position={[-15, -2, -20]} castShadow>
        <coneGeometry args={[6, 4, 8]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.95} />
      </mesh>
      <mesh position={[20, -2, -22]} castShadow>
        <coneGeometry args={[7, 5, 8]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.95} />
      </mesh>
    </group>
  )
}

function PineTrees() {
  const treePositions = [
  [-12,-1.8,-8],
  [-15,-1.8,-12],
  [-8,-1.8,-15],
  [14,-1.8,-10],
  [18,-1.8,-14],
  [10,-1.8,-18],
  [-20,-1.8,-20],
  [25,-1.8,-22],
  [-30,-1.8,-25],
  [35,-1.8,-28],
  [-40,-1.8,-30],
  [45,-1.8,-32],

  [-25,-1.8,-12],
  [30,-1.8,-15],
  [-35,-1.8,-18],
  [40,-1.8,-22],
  [-50,-1.8,-35],
  [55,-1.8,-38]
]
  
  return (
    <group>
      {treePositions.map((pos, i) => (
        <PineTree key={i} position={pos} scale={0.8 + Math.random() * 0.6} />
      ))}
    </group>
  )
}

function PineTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 2, 8]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>

      {/* Bottom layer */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[2.2, 2.8, 8]} />
        <meshStandardMaterial color="#1a4d1a" />
      </mesh>

      {/* Middle layer */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[1.6, 2.2, 8]} />
        <meshStandardMaterial color="#225d22" />
      </mesh>

      {/* Top layer */}
      <mesh position={[0, 4.5, 0]}>
        <coneGeometry args={[1.0, 1.6, 8]} />
        <meshStandardMaterial color="#2a632a" />
      </mesh>

      {/* Snow cap */}
      <mesh position={[0, 5.1, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Campfire({ position }) {
  const fireRef = useRef()
  
  useFrame((state) => {
    if (fireRef.current) {
      fireRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2
      fireRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1
    }
  })
  
  return (
    <group position={position}>
      {/* Fire glow light */}
      <pointLight 
        position={[0, 1, 0]} 
        intensity={1.5} 
        color="#ff6600" 
        distance={10} 
      />
      <pointLight 
        position={[0, 0.5, 0]} 
        intensity={1.5} 
        color="#ff3300" 
        distance={10} 
      />
      
      {/* Logs */}
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0, 0]} rotation={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.4]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 8]} />
        <meshStandardMaterial color="#3d2a1a" roughness={0.9} />
      </mesh>
      
      {/* Fire */}
      <mesh ref={fireRef} position={[0, 0.5, 0]}>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.25, 0.8, 8]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.15, 0.5, 8]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.4} />
      </mesh>
      
      {/* Sparks */}
      <Sparkles count={30} scale={3} size={3} speed={0.8} opacity={0.6} color="#ff6600" />
    </group>
  )
}

function Snowfall({ count = 1000 }) {
  const particlesRef = useRef()
  
  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
      pos.push(
        (Math.random() - 0.5) * 100,
        Math.random() * 50,
        (Math.random() - 0.5) * 100
      )
    }
    return new Float32Array(pos)
  }, [count])
  
  useFrame((state) => {
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.05 + Math.random() * 0.02
        if (positions[i] < -2) {
          positions[i] = 50
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function CozyHouse({ position }) {
  return (
    <group position={position}>
      {/* House base/foundation */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[7, 1, 5]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>
      
      {/* First floor walls */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[7, 4, 5]} />
        <meshStandardMaterial color="#e8d4b8" roughness={0.85} />
      </mesh>
      
      {/* Second floor walls */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[6, 3, 4]} />
        <meshStandardMaterial color="#d4c4a8" roughness={0.85} />
      </mesh>
      
      {/* Roof - pitched roof with two sides */}
      <mesh position={[0, 7.5, 0]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[6.5, 0.3, 5.5]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[0, 7.5, 0]} rotation={[-0.4, 0, 0]} castShadow>
        <boxGeometry args={[6.5, 0.3, 5.5]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      
      {/* Roof peak */}
      <mesh position={[0, 7.8, 0]} castShadow>
        <boxGeometry args={[6.5, 0.6, 0.5]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      
      {/* Snow on roof */}
      <mesh position={[0, 7.7, 0]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[6.7, 0.15, 5.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      <mesh position={[0, 7.7, 0]} rotation={[-0.4, 0, 0]} castShadow>
        <boxGeometry args={[6.7, 0.15, 5.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Front door */}
      <mesh position={[0, 1.5, 2.51]} castShadow>
        <boxGeometry args={[1.2, 2.5, 0.15]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      {/* Door frame */}
      <mesh position={[0, 1.5, 2.55]}>
        <boxGeometry args={[1.4, 2.7, 0.08]} />
        <meshStandardMaterial color="#4a3525" roughness={0.9} />
      </mesh>
      {/* Door handle */}
      <mesh position={[0.35, 1.5, 2.6]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
  color="#ffcc66"
  emissive="#ff9900"
  emissiveIntensity={2}
/>
      </mesh>
      
      {/* First floor windows - left */}
      <mesh position={[-2, 2.5, 2.51]} castShadow>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial
  color="#ffd27a"
  emissive="#ffb347"
  emissiveIntensity={3}
/>
      </mesh>
      <mesh position={[-2, 2.5, 2.55]}>
        <boxGeometry args={[1.1, 1.3, 0.06]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      <mesh position={[-2, 2.5, 2.58]}>
        <boxGeometry args={[0.03, 1.2, 0.08]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      <mesh position={[-2, 2.5, 2.58]}>
        <boxGeometry args={[1, 0.03, 0.08]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      {/* First floor windows - right */}
      <mesh position={[2, 2.5, 2.51]} castShadow>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.2} metalness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[2, 2.5, 2.55]}>
        <boxGeometry args={[1.1, 1.3, 0.06]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      <mesh position={[2, 2.5, 2.58]}>
        <boxGeometry args={[0.03, 1.2, 0.08]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      <mesh position={[2, 2.5, 2.58]}>
        <boxGeometry args={[1, 0.03, 0.08]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      {/* Second floor windows - left */}
      <mesh position={[-1.5, 5.5, 2.01]} castShadow>
        <boxGeometry args={[0.8, 0.9, 0.1]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.2} metalness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1.5, 5.5, 2.05]}>
        <boxGeometry args={[0.9, 1.0, 0.05]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      {/* Second floor windows - right */}
      <mesh position={[1.5, 5.5, 2.01]} castShadow>
        <boxGeometry args={[0.8, 0.9, 0.1]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.2} metalness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[1.5, 5.5, 2.05]}>
        <boxGeometry args={[0.9, 1.0, 0.05]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      {/* Side windows */}
      <mesh position={[3.51, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.2} metalness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[3.55, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.1, 1.3, 0.05]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      <mesh position={[-3.51, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.2} metalness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-3.55, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.1, 1.3, 0.05]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>

      <Sparkles
 count={15}
 scale={2}
 size={4} 
 speed={0.1}
 opacity={0.15}
 color="#cccccc"
/>
      
      {/* Chimney */}
      <mesh position={[2, 7, -1]} castShadow>
        <boxGeometry args={[0.6, 2, 0.6]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>
      <mesh position={[2, 8.2, -1]} castShadow>
        <boxGeometry args={[0.7, 0.3, 0.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Large porch */}
      <mesh position={[0, 0.3, 3.5]} castShadow>
        <boxGeometry args={[6, 0.15, 2]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>
      
      {/* Porch steps */}
      <mesh position={[0, 0.15, 4.6]} castShadow>
        <boxGeometry args={[2, 0.3, 0.4]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.15, 5]} castShadow>
        <boxGeometry args={[2.2, 0.3, 0.4]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>
      
      {/* Porch posts */}
      <mesh position={[-2.5, 2, 4]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 3.5, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      <mesh position={[2.5, 2, 4]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 3.5, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      
      {/* Porch roof */}
      <mesh position={[0, 4, 4]} castShadow>
        <boxGeometry args={[7, 0.15, 2.5]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[0, 4.1, 4]} castShadow>
        <boxGeometry args={[7.2, 0.2, 2.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
      
      {/* Warm lights inside house - multiple lights for better visibility */}
      <pointLight position={[0, 2.5, 0]} intensity={1.5} color="#ff9966" distance={15} />
      <pointLight position={[-2, 2.5, 1]} intensity={0.8} color="#ffcc00" distance={6} />
      <pointLight position={[2, 2.5, 1]} intensity={0.8} color="#ffcc00" distance={6} />
      <pointLight position={[0, 5.5, 0]} intensity={1.2} color="#ff9966" distance={12} />
      <pointLight position={[-1.5, 5.5, 1]} intensity={0.6} color="#ffcc00" distance={4} />
      <pointLight position={[1.5, 5.5, 1]} intensity={0.6} color="#ffcc00" distance={4} />
      <pointLight position={[0, 3.5, 0]} intensity={0.5} color="#ffaa44" distance={8} />
    </group>
  )
}

function Table({ position }) {
  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Table legs */}
      <mesh position={[-1.2, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[1.2, 0.5, 0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[-1.2, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[1.2, 0.5, -0.8]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Candle 1 */}
      <mesh position={[-0.6, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#ffcc99" />
      </mesh>
      <mesh position={[-0.6, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.5} />
      </mesh>
      <pointLight position={[-0.6, 1.4, 0]} intensity={0.4} color="#ff9966" distance={3} />
      
      {/* Candle 2 */}
      <mesh position={[0.6, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#ffcc99" />
      </mesh>
      <mesh position={[0.6, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.5} />
      </mesh>
      <pointLight position={[0.6, 1.4, 0]} intensity={0.4} color="#ff9966" distance={3} />
      
      {/* Wine glass 1 */}
      <mesh position={[-0.4, 1.2, -0.3]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.25, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-0.4, 1.05, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-0.4, 0.95, -0.3]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      
      {/* Wine glass 2 */}
      <mesh position={[0.4, 1.2, -0.3]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.25, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0.4, 1.05, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0.4, 0.95, -0.3]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
      
      {/* Rose on table */}
      <mesh position={[0.5, 1.2, 0.3]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff0055" />
      </mesh>
      <mesh position={[0.5, 1.05, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
    </group>
  )
}

function RomanticPathway({ position }) {
  return (
    <group position={position}>
      {/* Pathway stones */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#a0a0a0" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.05, 2]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#a0a0a0" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.05, 4]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#a0a0a0" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.05, 6]} castShadow>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#a0a0a0" roughness={0.9} />
      </mesh>
      
      {/* Lantern 1 */}
      <mesh position={[-1, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[-1, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ff9966" emissive="#ff9966" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
      <pointLight position={[-1, 1.2, 0]} intensity={0.5} color="#ff9966" distance={4} />
      
      {/* Lantern 2 */}
      <mesh position={[1, 0.8, 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[1, 1.2, 2]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ff9966" emissive="#ff9966" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
      <pointLight position={[1, 1.2, 2]} intensity={0.5} color="#ff9966" distance={4} />
      
      {/* Lantern 3 */}
      <mesh position={[-1, 0.8, 4]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[-1, 1.2, 4]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ff9966" emissive="#ff9966" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
      <pointLight position={[-1, 1.2, 4]} intensity={0.5} color="#ff9966" distance={4} />
      
      {/* Lantern 4 */}
      <mesh position={[1, 0.8, 6]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[1, 1.2, 6]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ff9966" emissive="#ff9966" emissiveIntensity={0.3} transparent opacity={0.7} />
      </mesh>
      <pointLight position={[1, 1.2, 6]} intensity={0.5} color="#ff9966" distance={4} />
    </group>
  )
}

function Snowman({ position }) {
  return (
    <group position={position}>
      {/* Bottom ball */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      
      {/* Middle ball */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      
      {/* Top ball (head) */}
      <mesh position={[0, 1.9, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.12, 2, 0.28]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 2, 0.28]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Carrot nose */}
      <mesh position={[0, 1.95, 0.32]} rotation={[0.3, 0, 0]} castShadow>
        <coneGeometry args={[0.04, 0.15, 8]} />
        <meshStandardMaterial color="#ff6600" />
      </mesh>
      
      {/* Buttons */}
      <mesh position={[0, 1.3, 0.4]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 1.1, 0.42]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, 0.9, 0.43]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Hat */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 2.55, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Arms (sticks) */}
      <mesh position={[-0.5, 1.3, 0]} rotation={[0, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>
      <mesh position={[0.5, 1.3, 0]} rotation={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>
      
      {/* Scarf */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <torusGeometry args={[0.3, 0.06, 8, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </group>
  )
}

function CoupleFigures() {
  return (
    <group>
      {/* Figure 1 - You (sitting) */}
      <group position={[-1.5, -2, 1.5]}>
        {/* Torso */}
        <mesh position={[0, 0.8, 0]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.3]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshStandardMaterial color="#2c1810" />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.35, 0.75, 0]} rotation={[0.3, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.35, 0.75, 0]} rotation={[0.3, 0, 0.3]} castShadow>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Left leg */}
        <mesh position={[-0.15, 0.2, 0.2]} rotation={[0.8, 0, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
          <meshStandardMaterial color="#1a252f" />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.15, 0.2, 0.2]} rotation={[0.8, 0, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
          <meshStandardMaterial color="#1a252f" />
        </mesh>
      </group>
      
      {/* Figure 2 - Her (sitting) */}
      <group position={[1.5, -2, 1.5]}>
        {/* Torso */}
        <mesh position={[0, 0.75, 0]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.65, 0.28]} />
          <meshStandardMaterial color="#e91e63" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        {/* Long hair */}
        <mesh position={[0, 1.45, -0.1]} castShadow>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Hair back */}
        <mesh position={[0, 1.3, -0.2]} rotation={[0.3, 0, 0]} castShadow>
          <capsuleGeometry args={[0.22, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.3, 0.7, 0]} rotation={[0.3, 0, -0.2]} castShadow>
          <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
          <meshStandardMaterial color="#e91e63" />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.3, 0.7, 0]} rotation={[0.3, 0, 0.2]} castShadow>
          <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
          <meshStandardMaterial color="#e91e63" />
        </mesh>
        {/* Left leg */}
        <mesh position={[-0.12, 0.15, 0.2]} rotation={[0.8, 0, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#c2185b" />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.12, 0.15, 0.2]} rotation={[0.8, 0, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#c2185b" />
        </mesh>
      </group>
    </group>
  )
}

export default AuroraDateScene
