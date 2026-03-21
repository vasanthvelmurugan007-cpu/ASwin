import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProductViewer from './components/ProductViewer';
import ProductDetails from './components/ProductDetails';
import CustomCursor from './components/CustomCursor';
import Sidebar from './components/Sidebar';
import { ShoppingBag, Search, Menu, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
const HERO_MODELS = [
  {
    id: 'hero-1',
    name: 'Ace Sneaker',
    price: '$750',
    description: 'The iconic low-top silhouette redefined with premium leather and sustainable materials.',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
    imageUrl: '/images/sneaker.png',
    color: '#ffffff',
    environment: 'city' as const,
  },
  {
    id: 'hero-2',
    name: 'Cyber VR',
    price: '$899',
    description: 'High-fidelity virtual reality interface with integrated neural-link technology.',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    imageUrl: '/images/vr_headset.png',
    color: '#2d2d2d',
    environment: 'warehouse' as const,
  },
  {
    id: 'hero-3',
    name: 'Luxe Essence',
    price: '$180',
    description: 'A curated botanical fragrance crafted for a lasting and sophisticated impression.',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
    imageUrl: '/images/perfume.png',
    color: '#f472b6',
    environment: 'studio' as const,
  }
];

const CURATED_PRODUCTS = [
  { 
    id: 'curated-1', 
    name: 'Vintage Camera', 
    price: '$450', 
    brand: 'LEICA', 
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
    imageUrl: '/images/camera.png',
    color: '#333333'
  },
  { 
    id: 'curated-2', 
    name: 'Retro Boombox', 
    price: '$299', 
    brand: 'SONY', 
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb',
    imageUrl: '/images/boombox.png',
    color: '#ffffff'
  },
  { 
    id: 'curated-3', 
    name: 'Atelier Chair', 
    price: '$620', 
    brand: 'HERMAN MILLER', 
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
    imageUrl: '/images/chair.png',
    color: '#ffffff'
  },
  { 
    id: 'curated-4', 
    name: 'Classic Turntable', 
    price: '$1200', 
    brand: 'TECHNICS', 
    modelUrl: '',
    imageUrl: '/images/turntable.png',
    color: '#dddddd'
  },
  { 
    id: 'curated-5', 
    name: 'Minimal Desk Lamp', 
    price: '$250', 
    brand: 'ARTEMIDE', 
    modelUrl: '',
    imageUrl: '/images/lamp.png',
    color: '#c0c0c0'
  },
  { 
    id: 'curated-6', 
    name: 'Classic Watch', 
    price: '$180', 
    brand: 'BRAUN', 
    modelUrl: '',
    imageUrl: '/images/watch.png',
    color: '#000000'
  },
];

export default function App() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextHero = () => setActiveHeroIndex((prev) => (prev + 1) % HERO_MODELS.length);
  const prevHero = () => setActiveHeroIndex((prev) => (prev - 1 + HERO_MODELS.length) % HERO_MODELS.length);

  const currentHero = HERO_MODELS[activeHeroIndex];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Persistent Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-700 px-8 md:px-16 flex items-center justify-between ${isScrolled ? 'bg-white/90 backdrop-blur-xl h-20 border-b border-black/5' : 'h-32'}`}>
        <div className="flex items-center gap-12">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:opacity-50 transition-opacity"><Menu className="w-5 h-5" /></button>
          <div className="hidden lg:flex gap-10 text-[10px] uppercase tracking-[0.5em] font-black italic">
            <a href="#archive" className="hover:opacity-40 transition-opacity">Archive</a>
            <a href="#collections" className="hover:opacity-40 transition-opacity">Collections</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.6em] uppercase cursor-pointer">SSENSE</h1>
          </a>
        </div>

        <div className="flex items-center gap-10">
          <button className="p-2 hover:opacity-50 transition-opacity"><Search className="w-5 h-5" /></button>
          <button className="p-2 hover:opacity-50 transition-opacity flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <motion.span 
              key={cartCount}
              initial={{ scale: 1.5, color: '#f00' }}
              animate={{ scale: 1, color: '#000' }}
              className="text-[10px] font-black mt-1"
            >
              {cartCount}
            </motion.span>
          </button>
        </div>
      </nav>

      {/* Hero Section - 3D Focused-Blur Carousel */}
      <section id="archive" className="relative w-full h-screen min-h-[900px] flex flex-col items-center justify-center overflow-hidden pt-20">

        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={currentHero.imageUrl || '/images/sneaker.png'}
            alt={currentHero.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-8">
          <div className="text-[11px] uppercase tracking-[0.6em] font-black text-white/80 mb-2">{currentHero.id.toUpperCase()}</div>
          <h1 className="text-5xl lg:text-[7rem] font-serif italic tracking-[0.06em] leading-tight text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {currentHero.name}
          </h1>
          <p className="mt-6 max-w-xl text-xs md:text-base text-white/80 tracking-wider">{currentHero.description}</p>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={() => setSelectedProduct(currentHero)} className="px-10 py-3 bg-white text-black uppercase tracking-widest text-[10px] font-black hover:bg-white/80 transition">Acquire Narrative</button>
            <button onClick={nextHero} className="px-10 py-3 border border-white text-white uppercase tracking-widest text-[10px] font-black hover:bg-white/20 transition">Next Artifact</button>
          </div>
        </div>

        {/* Carousel Viewport (hidden now) */}
        <div className="w-full h-full relative z-[60] hidden">
          
          <div className="w-full relative h-[50vh] flex items-center justify-center overflow-visible mt-12">
            {HERO_MODELS.map((model, index) => {
              let position = index - activeHeroIndex;
              if (position > HERO_MODELS.length / 2) position -= HERO_MODELS.length;
              if (position < -HERO_MODELS.length / 2) position += HERO_MODELS.length;

              const isActive = position === 0;
              const isNext = position === 1;
              const isPrev = position === -1;

              return (
                <motion.div
                  key={model.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isNext ? '42vw' : isPrev ? '-42vw' : position * 120 + '%',
                    scale: isActive ? 1.5 : 0.4,
                    opacity: isActive ? 1 : isNext || isPrev ? 0.2 : 0,
                    filter: isActive ? 'blur(0px)' : 'blur(25px)',
                    zIndex: isActive ? 100 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    mass: 1,
                  }}
                  onClick={() => {
                    if (isNext) nextHero();
                    if (isPrev) prevHero();
                  }}
                  className={`absolute w-full max-w-5xl h-full flex items-center justify-center transition-all duration-300 ${isActive ? 'cursor-default pointer-events-auto' : 'cursor-pointer hover:opacity-50 pointer-events-auto z-30'}`}
                >
                  <div className="w-full h-full">
                    <ProductViewer product={model} isHero={isActive} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12 space-y-6 max-w-2xl z-[70] relative px-6 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHero.id}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[1.2em] font-black text-black/15 block mb-6 italic">
                  <Sparkles className="w-3 h-3" /> Artifact Discovery • {currentHero.id.toUpperCase()}
                </div>
                <h3 className="text-7xl md:text-[10rem] font-serif italic tracking-tighter leading-none mb-10">{currentHero.name}</h3>
                <p className="text-base font-normal tracking-wide text-black/40 leading-relaxed mb-14 max-w-sm border-l-2 border-black/5 pl-8 text-left italic">
                  {currentHero.description}
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProduct(currentHero)}
                  className="px-20 py-7 bg-black text-white text-[12px] uppercase tracking-[0.8em] font-black hover:bg-black/90 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] pointer-events-auto"
                >
                  Acquire Narrative
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-x-8 md:inset-x-24 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[150]">
            <button 
              onClick={prevHero}
              className="pointer-events-auto w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center hover:bg-black/5 group transition-all duration-700 backdrop-blur-sm"
            >
              <ChevronLeft className="w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-[-10px] transition-transform" strokeWidth={0.1} />
            </button>
            <button 
              onClick={nextHero}
              className="pointer-events-auto w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center hover:bg-black/5 group transition-all duration-700 backdrop-blur-sm"
            >
              <ChevronRight className="w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-[10px] transition-transform" strokeWidth={0.1} />
            </button>
          </div>

          {/* Timeline Indicator */}
          <div className="absolute bottom-24 flex gap-12 z-[100]">
            {HERO_MODELS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveHeroIndex(i)}
                className={`transition-all duration-1000 ${activeHeroIndex === i ? 'w-32 h-[2px] bg-black' : 'w-8 h-[1px] bg-black/10 hover:bg-black/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
          <span className="text-[9px] uppercase tracking-[1.5em] font-black text-black">Begin Descent</span>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-[1px] h-16 bg-black"
          />
        </div>
      </section>

      {/* Collection Grid Section */}
      <section id="collections" className="bg-white py-64 px-8 md:px-16 lg:px-40 border-t border-black/5 relative z-[60]">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-end mb-56 gap-20">
            <div className="space-y-16">
              <span className="text-[11px] uppercase tracking-[1.5em] font-black text-black/10 block italic">Curated Inventory</span>
              <h2 className="text-8xl md:text-[14rem] font-serif italic tracking-tighter leading-none py-6">The Gallery</h2>
            </div>
            <button className="group flex items-center gap-16 text-[13px] uppercase tracking-[1em] font-black border-b border-black/10 pb-8 hover:gap-24 transition-all duration-700 whitespace-nowrap italic">
              Explore All <ArrowRight className="w-6 h-6" />
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-72 gap-x-32">
            {CURATED_PRODUCTS.map((prod, index) => (
              <motion.div
                key={prod.id}
                layoutId={`product-${prod.id}`}
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (index % 3) * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProduct(prod)}
                className="group cursor-pointer flex flex-col items-stretch"
              >
                <div className="aspect-[3/4.5] bg-[#FAFAFA] mb-20 relative flex items-center justify-center p-8 overflow-hidden group-hover:bg-black/2 transition-colors duration-1000">
                  <div className="w-full h-full group-hover:scale-110 transition-transform duration-1000">
                    <ProductViewer product={prod} autoRotate={false} />
                  </div>
                  <div className="absolute inset-x-12 bottom-12 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0 z-20">
                    <button className="w-full bg-black text-white py-7 text-[10px] uppercase tracking-[0.6em] font-black hover:bg-white hover:text-black transition-all duration-700 shadow-2xl">
                      Catalog Entry
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start px-2 mt-auto">
                  <div className="space-y-5">
                    <span className="text-[11px] uppercase tracking-[0.6em] font-black text-black/20 block">{prod.brand}</span>
                    <h4 className="text-4xl md:text-5xl font-serif italic tracking-tight leading-none group-hover:translate-x-6 transition-transform duration-1000">{prod.name}</h4>
                  </div>
                  <div className="flex flex-col items-end gap-3 pt-2">
                    <span className="text-xl font-light opacity-50 tracking-tighter">{prod.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-72 pb-40 px-8 md:px-16 overflow-hidden relative z-[60]">
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-48 mb-64">
          <div className="lg:col-span-6 space-y-24">
            <h5 className="text-7xl md:text-[12rem] font-black tracking-[-0.05em] leading-[0.8] mb-12 opacity-20">GENESIS</h5>
            <div className="max-w-md space-y-12 pl-2 border-l border-white/10">
               <p className="text-[14px] text-white/40 leading-relaxed uppercase tracking-[0.5em] italic font-light">
                 Systemic refinement of the digital commerce interface. Curating the synergy between object and observer.
               </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-40 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-24 opacity-25">
          <span className="text-[12px] uppercase tracking-[1.5em] italic">© 2026 LUXE DIGITAL INTERACTIVE</span>
          <div className="flex gap-20 text-[11px] uppercase tracking-[0.8em] font-black italic">
             <span>LONDON</span>
             <span>PARIS</span>
             <span>TOKYO</span>
          </div>
        </div>
      </footer>

      {/* Details Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            activeColor={selectedProduct.color || '#000000'}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => setCartCount(prev => prev + 1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

