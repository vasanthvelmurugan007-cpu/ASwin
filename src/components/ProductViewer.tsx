import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF, Float, Environment, Center, useProgress, Html } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect, memo } from 'react';
import * as THREE from 'three';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-32 translate-y-16 pointer-events-none">
        <div className="w-full h-[1px] bg-black/5 relative overflow-hidden mb-2">
          <div className="absolute inset-0 bg-black/10" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[8px] uppercase tracking-widest font-black text-black/5">{Math.round(progress)}%</span>
      </div>
    </Html>
  );
};

const ProductModel = memo(({ modelUrl, scale, activeColor, onClick }: { 
  modelUrl: string; 
  scale: number; 
  activeColor: string;
  onClick: () => void 
}) => {
  const { scene } = useGLTF(modelUrl);
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(0);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
          (mesh.material as any).color.set(activeColor);
        }
      }
    });
  }, [scene, activeColor, modelUrl]);

  useEffect(() => {
    setScaleFactor(0);
    const timeout = setTimeout(() => setScaleFactor(1), 50);
    return () => clearTimeout(timeout);
  }, [modelUrl]);

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = scale * scaleFactor * (hovered ? 1.05 : 1);
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      if (!hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      }
    }
  });

  return (
    <Center>
      <primitive 
        ref={meshRef} 
        object={scene} 
        onClick={(e: any) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      />
    </Center>
  );
});

const ProductViewer = ({ modelUrl, scale, activeColor, onModelClick }: { modelUrl: string; scale: number; activeColor: string; onModelClick: () => void; }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows
        camera={{ fov: 35, position: [0, 0, 8] }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        className="w-full h-full"
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} castShadow shadow-mapSize={512} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <ProductModel modelUrl={modelUrl} scale={scale} activeColor={activeColor} onClick={onModelClick} />
          </Float>
          
          <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={4} far={4} />
          <OrbitControls enableZoom={false} enablePan={false} makeDefault autoRotate autoRotateSpeed={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ProductViewer;
