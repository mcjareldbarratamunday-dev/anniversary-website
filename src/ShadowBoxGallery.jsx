import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useState } from 'react'

function PhotoFrame({ photo, isHero = false, depthOffset = 0, onHover, onLeave, isHovered }) {
  const texture = useTexture(photo.imageFile)
  
  const frameWidth = isHero ? 5.5 : 2.5
  const frameHeight = isHero ? 7.5 : 3.2
  const photoWidth = isHero ? 5 : 2
  const photoHeight = isHero ? 7 : 2.7

  const zPosition = 0.2 + depthOffset

  // Determine caption position based on photo location
  const isLeftSide = photo.position[0] < -3
  const isRightSide = photo.position[0] > 3
  const isBottom = photo.position[1] < -3

  let captionPosition
  let captionAnchorX = "center"
  let captionAnchorY = "top"
  let captionRotation = [0, 0, 0]

  if (isLeftSide) {
    captionPosition = [-frameWidth/2 - 0.5, 0, 0.5]
    captionAnchorX = "right"
    captionAnchorY = "middle"
    captionRotation = [0, 0, 0]
  } else if (isRightSide) {
    captionPosition = [frameWidth/2 + 0.5, 0, 0.5]
    captionAnchorX = "left"
    captionAnchorY = "middle"
    captionRotation = [0, 0, 0]
  } else if (isBottom) {
    captionPosition = [0, frameHeight/2 + 0.5, 0.5]
    captionAnchorX = "center"
    captionAnchorY = "bottom"
  } else {
    captionPosition = [0, -frameHeight/2 - 0.5, 0.5]
    captionAnchorX = "center"
    captionAnchorY = "top"
  }

  return (
    <group
      position={[photo.position[0], photo.position[1], photo.position[2] + zPosition]}
      rotation={photo.rotation}
      onPointerEnter={() => onHover(photo.id)}
      onPointerLeave={() => onLeave()}
    >
      {/* Ornate gold frame */}
      <mesh>
        <boxGeometry args={[frameWidth, frameHeight, 0.3]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
      
      {/* Inner decorative border */}
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[frameWidth - 0.3, frameHeight - 0.3, 0.1]} />
        <meshBasicMaterial color="#c9a227" />
      </mesh>
      
      {/* Photo backing mat */}
      <mesh position={[0, 0, 0.21]}>
        <boxGeometry args={[photoWidth + 0.1, photoHeight + 0.1, 0.05]} />
        <meshBasicMaterial color="#f5f5dc" />
      </mesh>
      
      {/* Photo with texture */}
      <mesh position={[0, 0, 0.26]}>
        <planeGeometry args={[photoWidth, photoHeight]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Clean glass with subtle reflections */}
      <mesh position={[0, 0, 0.28]}>
        <planeGeometry args={[photoWidth, photoHeight]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Contact shadow behind frame */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[frameWidth + 0.2, frameHeight + 0.2]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Caption text */}
      <Text
        position={captionPosition}
        rotation={captionRotation}
        fontSize={isHero ? 0.3 : 0.2}
        color="#ffd700"
        anchorX={captionAnchorX}
        anchorY={captionAnchorY}
      >
        {photo.caption}
      </Text>
    </group>
  )
}

function StylizedCoupleFigures() {
  return (
    <group position={[0, -4, 2.5]}>
      {/* Figure 1 - stylized visitor */}
      <group position={[-0.5, 0, 0]}>
        {/* Body */}
        <mesh position={[0, 0.6, 0]}>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshBasicMaterial color="#8b4513" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffcc99" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.13, 16, 16, 0, Math.PI, 0, Math.PI * 0.6]} />
          <meshBasicMaterial color="#4a3728" />
        </mesh>
      </group>
      
      {/* Figure 2 - stylized visitor */}
      <group position={[0.5, 0, 0]}>
        {/* Body */}
        <mesh position={[0, 0.6, 0]}>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshBasicMaterial color="#c41e3a" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffcc99" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.13, 16, 16, 0, Math.PI, 0, Math.PI * 0.6]} />
          <meshBasicMaterial color="#2d1f1f" />
        </mesh>
      </group>
    </group>
  )
}

function MuseumWalls() {
  return (
    <group>
      {/* Back wall - deeper burgundy */}
      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[22, 14]} />
        <meshBasicMaterial color="#4a2c2a" />
      </mesh>
      
      {/* Back wall decorative panels */}
      <mesh position={[-6, 0, -7.9]}>
        <boxGeometry args={[6, 8, 0.1]} />
        <meshBasicMaterial color="#3d2424" />
      </mesh>
      <mesh position={[6, 0, -7.9]}>
        <boxGeometry args={[6, 8, 0.1]} />
        <meshBasicMaterial color="#3d2424" />
      </mesh>
      
      {/* Crown molding on back wall */}
      <mesh position={[0, 6.8, -7.9]}>
        <boxGeometry args={[22, 0.4, 0.2]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshBasicMaterial color="#3d2424" />
      </mesh>
      
      {/* Left wall decorative panels */}
      <mesh position={[-10.9, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshBasicMaterial color="#2d1f1f" />
      </mesh>
      <mesh position={[-10.9, -3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshBasicMaterial color="#2d1f1f" />
      </mesh>
      
      {/* Crown molding on left wall */}
      <mesh position={[-10.9, 6.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[16, 0.4, 0.2]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[11, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshBasicMaterial color="#3d2424" />
      </mesh>
      
      {/* Right wall decorative panels */}
      <mesh position={[10.9, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshBasicMaterial color="#2d1f1f" />
      </mesh>
      <mesh position={[10.9, -3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshBasicMaterial color="#2d1f1f" />
      </mesh>
      
      {/* Crown molding on right wall */}
      <mesh position={[10.9, 6.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[16, 0.4, 0.2]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
      
      {/* Floor - darker walnut */}
      <mesh position={[0, -7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 16]} />
        <meshBasicMaterial color="#2d1f1f" />
      </mesh>
      
      {/* Floor planks for detail */}
      <mesh position={[0, -6.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 16]} />
        <meshBasicMaterial color="#3d2817" />
      </mesh>
      
      {/* Baseboards */}
      <mesh position={[0, -6.8, -7.9]}>
        <boxGeometry args={[22, 0.3, 0.15]} />
        <meshBasicMaterial color="#5c4033" />
      </mesh>
      <mesh position={[-10.9, -6.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[16, 0.3, 0.15]} />
        <meshBasicMaterial color="#5c4033" />
      </mesh>
      <mesh position={[10.9, -6.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[16, 0.3, 0.15]} />
        <meshBasicMaterial color="#5c4033" />
      </mesh>
      
      {/* Ceiling - cream */}
      <mesh position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 16]} />
        <meshBasicMaterial color="#f5f0e6" />
      </mesh>
      
      {/* Ceiling medallion */}
      <mesh position={[0, 6.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 2, 32]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
      
      {/* Wall sconces - left wall */}
      <pointLight position={[-10.5, 4, 0]} intensity={2} color="#ffd700" distance={6} />
      <pointLight position={[-10.5, 0, 0]} intensity={2} color="#ffd700" distance={6} />
      <pointLight position={[-10.5, -4, 0]} intensity={2} color="#ffd700" distance={6} />
      
      {/* Wall sconces - right wall */}
      <pointLight position={[10.5, 4, 0]} intensity={2} color="#ffd700" distance={6} />
      <pointLight position={[10.5, 0, 0]} intensity={2} color="#ffd700" distance={6} />
      <pointLight position={[10.5, -4, 0]} intensity={2} color="#ffd700" distance={6} />
      
      {/* Ceiling chandelier lights */}
      <pointLight position={[0, 6.5, 0]} intensity={3} color="#fff8dc" distance={15} />
      <pointLight position={[-5, 6.5, 0]} intensity={2} color="#ffcc99" distance={12} />
      <pointLight position={[5, 6.5, 0]} intensity={2} color="#ffcc99" distance={12} />
      <pointLight position={[0, 6.5, -3]} intensity={1.5} color="#ffdab9" distance={10} />
      <pointLight position={[0, 6.5, 3]} intensity={1.5} color="#ffdab9" distance={10} />
    </group>
  )
}

function MuseumBench() {
  return (
    <group position={[0, -6.5, 3]}>
      {/* Bench seat */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[4, 0.15, 1]} />
        <meshBasicMaterial color="#5c4033" />
      </mesh>
      
      {/* Cushion */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.8, 0.1, 0.9]} />
        <meshBasicMaterial color="#d4a574" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshBasicMaterial color="#3d2817" />
      </mesh>
      <mesh position={[1.8, 0, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshBasicMaterial color="#3d2817" />
      </mesh>
      <mesh position={[-1.8, 0, 0.8]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshBasicMaterial color="#3d2817" />
      </mesh>
      <mesh position={[1.8, 0, 0.8]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshBasicMaterial color="#3d2817" />
      </mesh>
    </group>
  )
}

function Fireflies() {
  const fireflies = []
  for (let i = 0; i < 25; i++) {
    fireflies.push(
      <pointLight
        key={i}
        position={[
          (Math.random() - 0.5) * 18,
          Math.random() * 8 - 4,
          (Math.random() - 0.5) * 12
        ]}
        intensity={0.3 + Math.random() * 0.4}
        color="#fff8dc"
        distance={2}
      />
    )
  }
  return <group>{fireflies}</group>
}

function MemoryMuseum() {
  const [hoveredFrame, setHoveredFrame] = useState(null)

  const photos = [
    // Hero photo (large central at top)
    { 
      id: 1, 
      caption: "Our First Selfie", 
      position: [0, 3.5, -5], 
      rotation: [0, 0, 0], 
      imageFile: "/photo6.jpg",
      isHero: true,
      depthOffset: 0
    },
    // Left side - organized vertically closer together
    { id: 2, caption: "Date Night Memories", position: [-6, 1.5, -3], rotation: [0, 0.15, 0], imageFile: "/photo7.jpg", depthOffset: 0.05 },
    { id: 3, caption: "Adventures Together", position: [-6, -0.5, -2], rotation: [0, 0.1, 0], imageFile: "/photo8.jpg", depthOffset: 0.08 },
    { id: 4, caption: "Beautiful Moments", position: [-6, -2.5, -1], rotation: [0, 0.05, 0], imageFile: "/photo9.jpg", depthOffset: 0.1 },
    // Right side - organized vertically closer together
    { id: 5, caption: "Our Journey", position: [6, 1.5, -3], rotation: [0, -0.15, 0], imageFile: "/photo10.jpg", depthOffset: 0.05 },
    { id: 6, caption: "Happy Times", position: [6, -0.5, -2], rotation: [0, -0.1, 0], imageFile: "/photo11.jpg", depthOffset: 0.08 },
    { id: 7, caption: "Sweet Memories", position: [6, -2.5, -1], rotation: [0, -0.05, 0], imageFile: "/photo12.jpg", depthOffset: 0.1 },
    // Bottom center - photobooth strips arranged neatly closer together
    { id: 8, caption: "Your Beautiful Smile", position: [-4, -4.5, 1], rotation: [0, 0.02, 0], imageFile: "/photo13.jpg", depthOffset: 0.15 },
    { id: 9, caption: "Always & Forever", position: [-1.5, -4.5, 1], rotation: [0, 0, 0], imageFile: "/photo14.jpg", depthOffset: 0.15 },
    { id: 10, caption: "Photobooth Love", position: [1.5, -4.5, 1], rotation: [0, 0, 0], imageFile: "/photo15.jpg", depthOffset: 0.15 },
    { id: 11, caption: "Our Story", position: [4, -4.5, 1], rotation: [0, -0.02, 0], imageFile: "/photo16.jpg", depthOffset: 0.15 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full h-[800px] rounded-2xl overflow-hidden shadow-2xl"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
      >
        <ambientLight intensity={0.4} color="#fff5e6" />
        
        {/* Warm museum spotlights for aesthetic lighting */}
        <spotLight
          position={[0, 12, 2]}
          angle={0.5}
          penumbra={0.4}
          intensity={3}
          color="#fff8dc"
        />
        
        <spotLight
          position={[-10, 10, 1]}
          angle={0.4}
          penumbra={0.3}
          intensity={2.5}
          color="#ffcc99"
        />
        
        <spotLight
          position={[10, 10, 1]}
          angle={0.4}
          penumbra={0.3}
          intensity={2.5}
          color="#ffcc99"
        />
        
        {/* Warm accent lights for romantic atmosphere */}
        <pointLight position={[-8, 2, 4]} intensity={1.2} color="#ffb6c1" />
        <pointLight position={[8, 2, 4]} intensity={1.2} color="#ffb6c1" />
        
        {/* Centerpiece warm glow */}
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffdab9" />
        
        {/* Fill light */}
        <pointLight position={[0, -3, 6]} intensity={0.6} color="#fff0e6" />
        
        {/* Additional warm lights for cozy atmosphere */}
        <pointLight position={[-5, 4, 2]} intensity={1.5} color="#ffecd2" distance={8} />
        <pointLight position={[5, 4, 2]} intensity={1.5} color="#ffecd2" distance={8} />
        <pointLight position={[0, 3, 3]} intensity={1.2} color="#fff8dc" distance={8} />
        <pointLight position={[-3, -2, 3]} intensity={1.2} color="#ffdab9" distance={8} />
        <pointLight position={[3, -2, 3]} intensity={1.2} color="#ffdab9" distance={8} />
        
        {/* Museum walls */}
        <MuseumWalls />

        {/* Photo frames */}
        {photos.map((photo) => (
            <PhotoFrame
              key={photo.id}
              photo={photo}
              isHero={photo.isHero}
              depthOffset={photo.depthOffset || 0}
              onHover={setHoveredFrame}
              onLeave={() => setHoveredFrame(null)}
              isHovered={hoveredFrame === photo.id}
            />
          ))}

        {/* Stylized couple figurines */}
        <StylizedCoupleFigures />

        {/* Museum bench */}
        <MuseumBench />

        {/* Fireflies - warm twinkling lights */}
        <Fireflies />

        {/* Smooth camera parallax */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3.5}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  )
}

export default MemoryMuseum
