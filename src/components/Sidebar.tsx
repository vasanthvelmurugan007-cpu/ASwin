import { motion } from 'motion/react';
import { ShoppingBag, Search, Menu, User, Instagram, Twitter, Facebook } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const categories = ['ACCESSORIES', 'BAG', 'CLOTHING', 'SHOES'];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-0 bg-black/30 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={onClose}
      />
      <motion.aside 
        initial={{ x: -350, opacity: 0 }}
        animate={{ x: isOpen ? 0 : -350, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 h-screen w-64 border-r border-black/5 bg-white z-50 flex flex-col justify-between py-12 px-10"
      >
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-black" />
          <span className="font-sans font-bold text-[10px] tracking-[0.3em] uppercase">SSENSE</span>
        </div>
        <button
          onClick={onClose}
          className="text-xs uppercase tracking-[0.4em] text-black/40 hover:text-black transition-colors"
        >
          Close
        </button>
      </div>

        <nav className="flex flex-col gap-8">
          {categories.map((cat, i) => (
            <motion.a
              key={cat}
              href="#"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-lg font-bold tracking-tighter hover:text-stone-400 transition-colors"
            >
              {cat}
            </motion.a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 mt-8">
          {['Menswear', 'Womenswear', 'Everything Else'].map((item) => (
            <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">
              {item}
            </a>
          ))}
        </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-6">
          <Instagram className="w-4 h-4 cursor-pointer hover:opacity-50 transition-opacity" />
          <Twitter className="w-4 h-4 cursor-pointer hover:opacity-50 transition-opacity" />
        </div>
        <div className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-20">
          © 2026 LUXE
        </div>
      </div>
    </motion.aside>
    </>
  );
};

export default Sidebar;
