import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { SceneContent } from './SceneContent';

const ProductViewer = ({ product, autoRotate = true, isHero = false }: any) => {
  if (product.imageUrl) {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group/viewer">
      <Canvas 
        shadows
        dpr={[1, 1.5]}
        gl={{ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: true 
        }}
        camera={{ position: [0, 0, 10], fov: 30 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent product={product} isHero={isHero} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            makeDefault 
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ProductViewer;
