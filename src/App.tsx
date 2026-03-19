import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProductViewer from './components/ProductViewer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'fashion',
    name: 'Fashion',
    products: [
      {
        id: 'shoe-1',
        name: 'Ace Sneaker',
        price: '$750',
        description: 'The classic low-top sneaker with the iconic Web stripe. A staple of the House, redefined in premium leather.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
        scale: 10,
        colors: ['#ffffff', '#10b981', '#ef4444', '#3b82f6']
      },
      {
        id: 'shoe-2',
        name: 'Retro Runner',
        price: '$580',
        description: 'A vintage-inspired silhouette with modern comfort technology. Perfect for both performance and style.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
        scale: 10,
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ffffff']
      }
    ]
  },
  {
    id: 'rc-cars',
    name: 'RC Cars',
    products: [
      {
        id: 'rc-1',
        name: 'Turbo RC X1',
        price: '$120',
        description: 'High-performance remote-controlled racing car with aerodynamic design and durable chassis.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb',
        scale: 20,
        colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6']
      },
      {
        id: 'rc-2',
        name: 'Desert Stormer',
        price: '$145',
        description: 'All-terrain beast designed for the toughest tracks. Features reinforced suspension and high-torque motor.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb',
        scale: 20,
        colors: ['#78350f', '#451a03', '#10b981', '#3b82f6']
      }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming',
    products: [
      {
        id: 'gaming-1',
        name: 'Pro Gaming Chair',
        price: '$350',
        description: 'Ergonomic gaming chair designed for long sessions, featuring premium sheen fabric and adjustable support.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
        scale: 2.5,
        colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']
      },
      {
        id: 'gaming-2',
        name: 'Cyber VR Helmet',
        price: '$899',
        description: 'Next-generation virtual reality interface with ultra-low latency and neural-sync technology.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
        scale: 1.1,
        colors: ['#64748b', '#334155', '#0f172a', '#1e293b']
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    products: [
      {
        id: 'elec-1',
        name: 'Retro Boombox',
        price: '$299',
        description: 'Classic 80s aesthetic combined with modern high-fidelity audio and wireless connectivity.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb',
        scale: 100,
        colors: ['#1e293b', '#334155', '#475569', '#64748b']
      },
      {
        id: 'elec-2',
        name: 'Vintage Cam',
        price: '$450',
        description: 'A masterpiece of optical engineering, capturing timeless moments with a classic analog feel.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
        scale: 0.3,
        colors: ['#000000', '#1a1a1a', '#333333', '#4d4d4d']
      },
      {
        id: 'elec-3',
        name: 'Aviator HUD',
        price: '$1,200',
        description: 'Professional grade flight helmet with integrated heads-up display and ballistic protection.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
        scale: 1.1,
        colors: ['#451a03', '#78350f', '#92400e', '#b45309']
      }
    ]
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    products: [
      {
        id: 'cos-1',
        name: 'Luxe Essence',
        price: '$180',
        description: 'Premium fragrance in a designer bottle, crafted with rare botanicals for a lasting impression.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
        scale: 6,
        colors: ['#f472b6', '#fb7185', '#c084fc', '#818cf8']
      },
      {
        id: 'cos-2',
        name: 'Organic Glow',
        price: '$65',
        description: 'Pure botanical extract for a natural, radiant complexion. Sustainable and ethically sourced.',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb',
        scale: 25,
        colors: ['#10b981', '#059669', '#047857', '#064e3b']
      }
    ]
  }
];

export default function App() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  
  const currentCategory = CATEGORIES[activeCategoryIndex];
  const currentProduct = currentCategory.products[activeProductIndex];
  
  const [activeColor, setActiveColor] = useState(currentProduct.colors[0]);

  // Reset product index and color when category changes
  const handleCategoryChange = (index: number) => {
    setDirection(0);
    setActiveCategoryIndex(index);
    setActiveProductIndex(0);
    setActiveColor(CATEGORIES[index].products[0].colors[0]);
  };

  const nextProduct = () => {
    setDirection(1);
    const nextIndex = (activeProductIndex + 1) % currentCategory.products.length;
    setActiveProductIndex(nextIndex);
    setActiveColor(currentCategory.products[nextIndex].colors[0]);
  };

  const prevProduct = () => {
    setDirection(-1);
    const prevIndex = (activeProductIndex - 1 + currentCategory.products.length) % currentCategory.products.length;
    setActiveProductIndex(prevIndex);
    setActiveColor(currentCategory.products[prevIndex].colors[0]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : direction < 0 ? -100 : 0,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : direction < 0 ? 100 : 0,
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        filter: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] selection:bg-black selection:text-white font-sans overflow-hidden">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-12 z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto"
        >
          <span className="text-sm font-bold tracking-[0.5em] uppercase">LUXE 3D</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-12 pointer-events-auto"
        >
          {CATEGORIES.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(index)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:opacity-100 ${
                activeCategoryIndex === index ? 'opacity-100 border-b-2 border-black pb-1' : 'opacity-30'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
      </header>

      {/* Main 3D Viewer Container */}
      <main className="w-full h-screen relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${currentCategory.id}-${currentProduct.id}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full"
          >
            <ProductViewer 
              modelUrl={currentProduct.modelUrl}
              scale={currentProduct.scale}
              activeColor={activeColor}
              productName={currentProduct.name}
              price={currentProduct.price}
              description={currentProduct.description}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {currentCategory.products.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-8 pointer-events-none z-40">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProduct}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-lg pointer-events-auto hover:bg-white transition-all"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProduct}
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-lg pointer-events-auto hover:bg-white transition-all"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </motion.button>
          </div>
        )}

        {/* Color Picker Sidebar */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-40">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/20 vertical-text mb-4">Select Color</span>
          {currentProduct.colors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveColor(color)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                activeColor === color ? 'border-black scale-125' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Product Info Overlay */}
        <div className="absolute bottom-12 left-12 z-40">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/40">{currentCategory.name}</span>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-black/20">
                {activeProductIndex + 1} / {currentCategory.products.length}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase">{currentProduct.name}</h1>
          </motion.div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-8 right-12 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-black/20">© 2026 LUXE DIGITAL INTERACTIVE</span>
        </motion.div>
      </footer>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
