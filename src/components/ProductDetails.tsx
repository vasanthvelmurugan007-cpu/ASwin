import { motion } from 'motion/react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

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
}

const ProductDetails = ({ product, activeColor, onClose }: ProductDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full bg-[#F6F6F6]/95 backdrop-blur-3xl z-[200] flex items-center justify-center pointer-events-auto p-4 md:p-8"
    >
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 md:top-12 md:right-16 p-4 flex items-center justify-center rounded-full bg-black/5 hover:bg-black hover:text-white transition-all duration-500 text-black z-[210]"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-6xl w-full bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Product Imagery (Placeholder for now) */}
        <div className="aspect-square bg-[#FAFAFA] relative overflow-hidden flex items-center justify-center p-12">
          <div className="w-full h-full border border-black/5 flex items-center justify-center relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-black/[0.02] select-none pointer-events-none uppercase">
               LUXE
             </div>
             <div 
               className="w-48 h-48 rounded-full blur-[100px] opacity-10"
               style={{ backgroundColor: activeColor }}
             />
          </div>
          <div className="absolute top-12 left-12">
            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-black/20 block mb-2">Selected Entry</span>
            <div className="text-xl font-serif italic">{product.name}</div>
          </div>
        </div>

        {/* Right Side: Narrative and Actions */}
        <div className="p-12 md:p-16 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <div className="space-y-2">
               <span className="text-[10px] uppercase tracking-[0.6em] font-black text-black/30 block mb-1">Brand Heritage</span>
               <h3 className="text-5xl md:text-6xl font-serif italic tracking-tighter text-black leading-tight">
                 {product.name}
               </h3>
               <p className="text-2xl font-light tracking-widest text-black/60 pt-2">{product.price}</p>
            </div>
            
            <p className="text-base text-black/50 leading-relaxed font-normal tracking-wide max-w-md">
              A hallmark of the collection, this piece redefines contemporary luxury with its exceptional craftsmanship and timeless silhouette. Engineered for durability without compromising on visual impact.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex gap-4">
               {['#ffffff', '#000000', '#2d2d2d', '#f472b6'].map(col => (
                 <button 
                   key={col}
                   className={`w-4 h-4 rounded-full border border-black/10 transition-transform ${activeColor === col ? 'scale-150 ring-2 ring-offset-4 ring-black/10' : ''}`}
                   style={{ backgroundColor: col }}
                 />
               ))}
            </div>

            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#000' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black/90 text-white py-6 rounded-none text-[12px] uppercase tracking-[0.5em] font-black shadow-2xl shadow-black/30 transition-all flex items-center justify-center gap-4"
              >
                Add to Bag <ShoppingBag className="w-4 h-4" />
              </motion.button>
              <button
                onClick={onClose}
                className="w-full text-black/40 py-4 text-[10px] uppercase tracking-[0.4em] font-black hover:text-black transition-colors flex items-center justify-center gap-2 group"
              >
                Return to Collection <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-12 pt-12 border-t border-black/5">
            <button className="flex items-center gap-3 text-[9px] uppercase tracking-widest font-black text-black/30 hover:text-black transition-colors">
              <Heart className="w-4 h-4" /> Wishlist
            </button>
            <button className="flex items-center gap-3 text-[9px] uppercase tracking-widest font-black text-black/30 hover:text-black transition-colors">
              Share Experience
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
