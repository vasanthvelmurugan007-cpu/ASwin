import { motion } from 'motion/react';
import { ShoppingBag, Heart, Share2 } from 'lucide-react';

interface ProductDetailsProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const ProductDetails = ({ activeColor, setActiveColor }: ProductDetailsProps) => {
  const sizes = ['39', '40', '41', '42', '43', '44', '45'];

  return (
    <div className="flex flex-col h-full w-full px-12 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col h-full"
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase mb-1">Palm Angels</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Grey & Yellow Triple S Sneakers</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold tracking-tighter">385$</span>
            <div className="mt-2 flex items-center justify-end gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest">Size</span>
              <select className="text-[10px] font-bold uppercase tracking-widest bg-stone-100 px-2 py-1 rounded border-none outline-none cursor-pointer">
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="max-w-xs">
            <p className="text-[11px] leading-relaxed text-black/60 mb-8">
              Low-top panelled mesh and canvas sneakers in white. Fading throughout. Embroidered size at round toe. White lace-up closure. Padded tongue and collar.
            </p>
            
            <div className="space-y-4 border-t border-black/5 pt-6">
              <details className="group cursor-pointer">
                <summary className="list-none flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  Free Delivery and Returns
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
              </details>
              <details className="group cursor-pointer">
                <summary className="list-none flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  Reviews (23)
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
              </details>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-black text-white py-4 rounded-full flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] font-bold"
          >
            Add to Bag
          </motion.button>
          <button className="p-4 rounded-full border border-black/5 hover:bg-stone-50 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
