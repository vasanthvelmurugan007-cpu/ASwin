import { memo, Suspense, useRef, useEffect, useState } from 'react';
import { useGLTF, Center, Environment, Float, ContactShadows, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';

const AutoScaleModel = memo(({ modelUrl, activeColor, hotspots, onModelClick }: any) => {
  const gltf = useGLTF(modelUrl) as any;
  const scene = gltf.scene as THREE.Group; 
  const meshRef = useRef<THREE.Group>(null);
  
  // Clone and colorize materials
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
          (mesh.material as any).color.set(activeColor || '#ffffff');
          (mesh.material as any).roughness = 0.4;
          (mesh.material as any).metalness = 0.6;
        }
      }
    });
  }, [scene, activeColor]);

  // Normalize scale to fit a unit box
  useEffect(() => {
    if (!meshRef.current) return;
    
    const box = new THREE.Box3().setFromObject(meshRef.current);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim; // Adjust 3.5 to change the "standard" size
    meshRef.current.scale.setScalar(scale);
  }, [scene]);

  return (
    <Center top>
      <group ref={meshRef} onClick={onModelClick}>
        <primitive object={scene} />
      </group>
    </Center>
  );
});

export const SceneContent = ({ product, isHero = false }: any) => {
  return (
    <Suspense fallback={null}>
      <Environment preset={product.environment || "city"} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      <Float speed={1.5} rotationIntensity={isHero ? 0.3 : 0.1} floatIntensity={isHero ? 0.5 : 0.2}>
        <AutoScaleModel 
          modelUrl={product.modelUrl} 
          activeColor={product.color} 
          hotspots={product.hotspots}
        />
      </Float>
      
      <ContactShadows 
        position={[0, -2.2, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={4} 
      />
    </Suspense>
  );
};
