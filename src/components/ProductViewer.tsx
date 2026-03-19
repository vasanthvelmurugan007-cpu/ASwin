import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF, PerspectiveCamera, Float, Environment, Center } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';

// Product model component
const ProductModel = ({ modelUrl, scale, activeColor, onClick }: { 
  modelUrl: string; 
  scale: number; 
  activeColor: string;
  onClick: () => void 
}) => {
  const { scene } = useGLTF(modelUrl);
  const meshRef = useRef<THREE.Group>(null);

  // Apply color to materials
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // Clone material to avoid affecting other instances if cached
          mesh.material = (mesh.material as THREE.Material).clone();
          (mesh.material as any).color.set(activeColor);
        }
      }
    });
  }, [scene, activeColor]);

  // Auto-rotate on Y-axis
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Center>
      <primitive 
        ref={meshRef} 
        object={scene} 
        scale={scale} 
        onClick={(e: any) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      />
    </Center>
  );
};

interface ProductViewerProps {
  modelUrl: string;
  scale: number;
  activeColor: string;
  productName: string;
  price: string;
  description: string;
}

const ProductViewer = ({ modelUrl, scale, activeColor, productName, price, description }: ProductViewerProps) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="w-full h-full relative bg-[#f3f3f3] overflow-hidden">
      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault fov={45} position={[0, 0, 5]} />
        
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <ProductModel 
              modelUrl={modelUrl} 
              scale={scale} 
              activeColor={activeColor}
              onClick={() => setShowCard(true)} 
            />
          </Float>
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2.5} 
            far={4.5} 
          />
          
          <OrbitControls 
            enableZoom={false} 
            makeDefault 
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 1.5} 
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Interaction Hint */}
      {!showCard && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30">Click model for details</span>
        </motion.div>
      )}

      {/* Integrated Bottom Sheet Overlay */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl p-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3rem] border-t border-black/5 z-50"
          >
            <button 
              onClick={() => setShowCard(false)}
              className="absolute top-6 right-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-black/40 hover:text-black"
            >
              ✕
            </button>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30 block">Product Specification</span>
                <h3 className="text-4xl font-bold tracking-tighter uppercase leading-none">{productName}</h3>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-3xl font-bold tracking-tighter">{price}</span>
                  <div className="h-4 w-[1px] bg-black/10" />
                  <span className="text-[10px] uppercase tracking-widest text-black/40">Limited Edition</span>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-black/60 leading-relaxed font-medium">
                  {description}
                </p>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-black text-white py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl shadow-black/20"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCard(false)}
                    className="px-8 border border-black/10 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black/5 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductViewer;
