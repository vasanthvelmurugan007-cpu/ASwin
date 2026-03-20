import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProductViewer from './components/ProductViewer';
import ProductDetails from './components/ProductDetails';
import CustomCursor from './components/CustomCursor';
import { ShoppingBag, Search, Menu, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_MODELS = [
  {
    id: 'hero-1',
    name: 'Ace Sneaker',
    price: '$750',
    description: 'The iconic low-top silhouette redefined with premium leather and sustainable materials.',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
    scale: 12,
    color: '#ffffff'
  },
  {
    id: 'hero-2',
    name: 'Cyber VR',
    price: '$899',
    description: 'High-fidelity virtual reality interface with integrated neural-link technology.',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    scale: 1,
    color: '#2d2d2d'
  },
  {
    id: 'hero-3',
    name: 'Luxe Essence',
    price: '$180',
    description: 'A curated botanical fragrance crafted for a lasting and sophisticated impression.',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
    scale: 6,
    color: '#f472b6'
  }
];

const CURATED_PRODUCTS = [
  { id: 1, name: 'Vintage Camera', price: '$450', brand: 'LEICA', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Retro Boombox', price: '$299', brand: 'BRAUN', image: 'https://images.unsplash.com/photo-1618609373357-191977f13b28?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Minimalist Chair', price: '$620', brand: 'HERMAN MILLER', image: 'https://images.unsplash.com/photo-1581539250439-c96689b51fa9?auto=format&fit=crop&q=80&w=800' },
];

export default function App() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

      {/* Persistent Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-700 px-8 md:px-16 flex items-center justify-between ${isScrolled ? 'bg-white/90 backdrop-blur-xl h-20 border-b border-black/5' : 'h-32'}`}>
        <div className="flex items-center gap-12">
          <button className="p-2 hover:opacity-50 transition-opacity"><Menu className="w-5 h-5" /></button>
          <div className="hidden lg:flex gap-10 text-[10px] uppercase tracking-[0.5em] font-black italic">
            <a href="#" className="hover:opacity-40 transition-opacity">Archive</a>
            <a href="#" className="hover:opacity-40 transition-opacity">Collections</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl md:text-3xl font-black tracking-[0.6em] uppercase cursor-pointer">SSENSE</h1>
        </div>

        <div className="flex items-center gap-10">
          <button className="p-2 hover:opacity-50 transition-opacity"><Search className="w-5 h-5" /></button>
          <button className="p-2 hover:opacity-50 transition-opacity flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] font-black mt-1">0</span>
          </button>
        </div>
      </nav>

      {/* Hero Section - 3D Focused-Blur Carousel */}
      <section className="relative w-full h-screen min-h-[850px] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Fixed Background Typography Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="text-[35vw] font-serif font-black italic tracking-tighter leading-none text-[#EFEFEF] translate-y-8">
            Heritage
          </h2>
        </div>

        {/* Carousel Viewport */}
        <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
          
          {/* Slider Container */}
          <div className="w-full relative h-[65vh] flex items-center justify-center overflow-visible">
            {HERO_MODELS.map((model, index) => {
              // Calculate relative position to handle infinite loop seamlessly
              let position = index - activeHeroIndex;
              if (position > HERO_MODELS.length / 2) position -= HERO_MODELS.length;
              if (position < -HERO_MODELS.length / 2) position += HERO_MODELS.length;

              const isActive = position === 0;
              const isNext = position === 1;
              const isPrev = position === -1;

              return (
                <motion.div
                  key={model.id}
                  id={isActive ? 'hero-active' : isNext ? 'hero-next' : isPrev ? 'hero-prev' : `hero-other-${index}`}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isNext ? '35vw' : isPrev ? '-35vw' : position * 100 + '%',
                    scale: isActive ? 1.2 : 0.8,
                    opacity: isActive ? 1 : isNext || isPrev ? 0.4 : 0,
                    filter: isActive ? 'blur(0px)' : 'blur(10px)',
                    zIndex: isActive ? 20 : 10,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    if (isNext) nextHero();
                    if (isPrev) prevHero();
                    if (isActive) setSelectedProduct(model);
                  }}
                  className={`absolute w-full max-w-4xl h-full flex items-center justify-center px-12 transition-all duration-300 ${isActive ? 'cursor-default' : 'cursor-pointer hover:opacity-60 z-30'}`}
                >
                  <div className="w-full h-full pointer-events-none">
                    <ProductViewer 
                      modelUrl={model.modelUrl}
                      scale={model.scale}
                      activeColor={model.color}
                      onModelClick={() => {}} 
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Centered Product Information - Below the model */}
          <div className="text-center mt-4 space-y-4 max-w-xl z-30 relative px-6 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHero.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] uppercase tracking-[0.8em] font-black text-black/20 block mb-4 italic">Edition Discovery • 2026 Collection</span>
                <h3 className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-none mb-6">{currentHero.name}</h3>
                <p className="text-sm font-normal tracking-wide text-black/40 leading-relaxed mb-10 max-w-sm">
                  {currentHero.description}
                </p>
                <button 
                  onClick={() => setSelectedProduct(currentHero)}
                  className="pointer-events-auto px-12 py-5 bg-black text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-black/80 transition-all duration-300 transform active:scale-95 shadow-2xl shadow-black/10"
                >
                  View Collection Details
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-x-8 md:inset-x-16 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[100]">
            <button 
              onClick={prevHero}
              className="pointer-events-auto w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center hover:bg-black group transition-all duration-700 backdrop-blur-sm"
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 group-hover:text-white transition-colors" strokeWidth={0.2} />
            </button>
            <button 
              onClick={nextHero}
              className="pointer-events-auto w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center hover:bg-black group transition-all duration-700 backdrop-blur-sm"
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12 group-hover:text-white transition-colors" strokeWidth={0.2} />
            </button>
          </div>

          {/* Timeline Indicator */}
          <div className="absolute bottom-24 flex gap-8 z-[100]">
            {HERO_MODELS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveHeroIndex(i)}
                className={`transition-all duration-1000 ${activeHeroIndex === i ? 'w-24 h-[3px] bg-black shadow-lg shadow-black/10' : 'w-10 h-[1px] bg-black/10 hover:bg-black/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] uppercase tracking-[1em] font-black text-black/40">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-[1px] h-12 bg-black"
          />
        </div>
      </section>

      {/* Collection Grid Section */}
      <section className="bg-white py-48 px-8 md:px-16 lg:px-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[1em] font-black text-black/10 block italic">Curated Essentials</span>
              <h2 className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-none">The Inventory</h2>
            </div>
            <button className="group flex items-center gap-8 text-[11px] uppercase tracking-[0.6em] font-black border-b border-black pb-4 hover:gap-12 transition-all duration-500 whitespace-nowrap">
              Explore All <ArrowRight className="w-4 h-4" />
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-40 gap-x-24">
            {CURATED_PRODUCTS.map((prod, index) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (index % 3) * 0.2, duration: 1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4.5] overflow-hidden bg-[#F6F6F6] mb-12 relative flex items-center justify-center shadow-sm">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-20">
                    <button className="w-full bg-white text-black py-6 text-[11px] uppercase tracking-[0.4em] font-black hover:bg-black hover:text-white transition-all duration-500">
                      View Entry
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-widest font-black text-black/20 block tracking-[0.4em]">{prod.brand}</span>
                    <h4 className="text-3xl font-serif italic tracking-tight leading-none">{prod.name}</h4>
                  </div>
                  <span className="text-sm font-light mt-4 opacity-40 tracking-tighter">{prod.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-52 pb-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32 mb-40">
          <div className="lg:col-span-4 space-y-16">
            <h5 className="text-5xl font-black tracking-[0.5em]">SSENSE</h5>
            <p className="text-[12px] text-white/20 leading-relaxed uppercase tracking-[0.3em] max-w-sm italic">
              Cultivating the synergy between avant-garde technology and artisanal luxury.
            </p>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-20">
            <div className="flex flex-col gap-10 text-[11px] uppercase tracking-[0.5em] font-black">
              <span className="text-white/20 uppercase tracking-[0.3em]">Segments</span>
              <a href="#" className="hover:text-white/60 transition-colors">Male</a>
              <a href="#" className="hover:text-white/60 transition-colors">Female</a>
              <a href="#" className="hover:text-white/60 transition-colors">Kids</a>
            </div>
            <div className="flex flex-col gap-10 text-[11px] uppercase tracking-[0.5em] font-black">
              <span className="text-white/20 uppercase tracking-[0.3em]">Queries</span>
              <a href="#" className="hover:text-white/60 transition-colors">Shipping</a>
              <a href="#" className="hover:text-white/60 transition-colors">Exchanges</a>
              <a href="#" className="hover:text-white/60 transition-colors">Policies</a>
            </div>
            <div className="flex flex-col gap-10 text-[11px] uppercase tracking-[0.5em] font-black">
              <span className="text-white/20 uppercase tracking-[0.3em]">Join Us</span>
              <a href="#" className="hover:text-white/60 transition-colors">Careers</a>
              <a href="#" className="hover:text-white/60 transition-colors">Investors</a>
            </div>
            <div className="flex flex-col gap-10 text-[11px] uppercase tracking-[0.5em] font-black">
              <span className="text-white/20 uppercase tracking-[0.3em]">Journal</span>
              <a href="#" className="hover:text-white/60 transition-colors">Instagram</a>
              <a href="#" className="hover:text-white/60 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16">
          <span className="text-[10px] uppercase tracking-[1em] text-white/10 italic">© 2026 LUXE DIGITAL INTERACTIVE • GENESIS EDITION</span>
        </div>
      </footer>

      {/* Details Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            activeColor={selectedProduct.color}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
