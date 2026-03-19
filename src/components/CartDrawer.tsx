import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[70] shadow-2xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-xl font-serif italic">Your Bag (1)</h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="flex gap-6 border-b border-black/5 pb-8 mb-8">
                <div className="w-24 h-24 bg-stone-100 rounded-xl flex items-center justify-center p-2">
                  <div className="w-full h-full bg-emerald-500 rounded-lg shadow-lg" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider">Aura Runner</h3>
                    <p className="text-xs text-black/40 uppercase mt-1">Size: 42 · Emerald</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">$895.00</span>
                    <button className="text-black/20 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/5 pt-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs uppercase tracking-widest font-bold">Subtotal</span>
                <span className="text-xl font-light">$895.00</span>
              </div>
              <button className="w-full bg-black text-white py-5 rounded-full uppercase text-xs tracking-[0.2em] font-bold hover:bg-emerald-600 transition-colors">
                Checkout Now
              </button>
              <p className="text-center text-[10px] text-black/30 uppercase tracking-widest mt-4">
                Free Express Shipping on all orders
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
