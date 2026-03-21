import { motion } from 'motion/react';
import { X, Heart, ShoppingBag, ArrowRight, Share2, Star } from 'lucide-react';

interface ProductDetailsProps {
  product: {
    id: string | number;
    name: string;
    price: string;
    description?: string;
    brand?: string;
  };
  activeColor: string;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductDetails = ({ product, activeColor, onClose, onAddToCart }: ProductDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full bg-white/20 backdrop-blur-2xl z-[500] flex items-center justify-center p-4 md:p-8"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} 
      />

      <motion.button 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="fixed top-8 right-8 md:top-12 md:right-16 w-14 h-14 flex items-center justify-center rounded-full bg-black/5 hover:bg-black hover:text-white transition-all duration-700 text-black z-[510] backdrop-blur-md border border-white/20"
      >
        <X className="w-5 h-5" />
      </motion.button>

      <motion.div 
        layoutId={`product-${product.id}`}
        className="max-w-7xl w-full bg-white/80 backdrop-blur-md shadow-[0_100px_100px_-50px_rgba(0,0,0,0.4)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/40"
      >
        {/* Left Side: Dynamic Imagery Section */}
        <div className="relative aspect-square lg:aspect-auto h-full bg-gradient-to-tr from-[#F0F0F0] to-white overflow-hidden flex items-center justify-center p-12 lg:p-24 border-r border-black/5">
           
           {/* Abstract Decorative Elements */}
           <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif italic text-black/[0.03] select-none uppercase tracking-tighter">
                {product.brand || 'LUXE'}
              </div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="w-[150%] aspect-square rounded-full blur-[150px]"
                style={{ backgroundColor: activeColor }}
              />
           </div>

           {/* Product Identifier Badge */}
           <div className="absolute top-12 left-12 lg:top-20 lg:left-24">
             <motion.div
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col gap-2"
             >
               <span className="text-[10px] uppercase tracking-[0.8em] font-black text-black/30 block">Genesis Entry</span>
               <div className="text-2xl font-serif italic tracking-tighter">{product.id}.00</div>
             </motion.div>
           </div>

           {/* Featured Section Placeholder */}
           <div className="relative z-10 w-full aspect-square flex items-center justify-center border-2 border-black/5 p-12 group">
              <div className="w-[80%] h-[80%] bg-[#FAFAFA] shadow-inner flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                 <div className="text-[8px] uppercase tracking-[1em] font-black text-black/10">Ref: {product.name.substring(0,3).toUpperCase()}</div>
                 <div className="w-px h-12 bg-black/10 group-hover:h-20 transition-all duration-1000" />
                 <Star className="w-4 h-4 text-black/10 fill-black/5" />
              </div>
           </div>
        </div>

        {/* Right Side: Narrative and Actions */}
        <div className="p-12 md:p-20 lg:p-28 flex flex-col justify-between bg-white relative">
          <div className="space-y-16">
            <div className="space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                 <span className="w-12 h-px bg-black" />
                 <span className="text-[10px] uppercase tracking-[1.2em] font-black text-black/40 italic">Heritage Collection</span>
              </motion.div>
              
              <div className="space-y-4">
                 <h3 className="text-6xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter text-black leading-none py-2">
                   {product.name}
                 </h3>
                 <div className="flex items-baseline gap-4">
                    <p className="text-3xl font-light tracking-widest text-black/80">{product.price}</p>
                    <span className="text-[9px] uppercase tracking-widest font-black text-black/20 italic">Tax Included</span>
                 </div>
              </div>
              
              <p className="text-base text-black/50 leading-relaxed font-normal tracking-wide max-w-lg border-l-2 border-black/5 pl-8 italic">
                {product.description || "A cornerstone of the 2026 archive, this piece explores the intersection of futuristic utility and timeless elegance. Every element has been meticulously crafted for the discerning collector."}
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col gap-6">
                 <span className="text-[9px] uppercase tracking-[1em] font-black text-black/20">Tone Variations</span>
                 <div className="flex gap-6">
                    {['#ffffff', '#000000', '#2d2d2d', '#f472b6'].map(col => (
                      <button 
                        key={col}
                        className={`w-5 h-5 rounded-full border border-black/5 transition-all duration-500 hover:scale-125 ${activeColor === col ? 'scale-150 ring-2 ring-offset-4 ring-black/10' : ''}`}
                        style={{ backgroundColor: col }}
                      />
                    ))}
                 </div>
              </div>

              <div className="flex flex-col gap-5 pt-8">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#000' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onAddToCart}
                  className="w-full bg-black text-white py-8 rounded-none text-[12px] uppercase tracking-[0.6em] font-black shadow-[0_40px_60px_-20px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center gap-6"
                >
                  Acquire Item <ShoppingBag className="w-4 h-4" />
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full text-black/40 py-4 text-[11px] uppercase tracking-[0.4em] font-black hover:text-black transition-colors flex items-center justify-center gap-4 group"
                >
                  Return to Archive <ArrowRight className="w-3 h-3 group-hover:translate-x-3 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-24 border-t border-black/5">
            <div className="flex gap-12">
              <button className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-black/30 hover:text-black transition-all">
                <Heart className="w-4 h-4" /> Save
              </button>
              <button className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-black/30 hover:text-black transition-all">
                <Share2 className="w-4 h-4" /> Curate
              </button>
            </div>
            <div className="text-[9px] uppercase tracking-widest font-black text-black/10 border border-black/5 px-4 py-2 italic">
              Batch: 2026-X
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
