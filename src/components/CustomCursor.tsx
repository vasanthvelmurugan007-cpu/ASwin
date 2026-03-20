import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touchDevice);
    
    if (touchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.interactive') ||
        target.closest('canvas')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/20 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        backdropFilter: isHovering ? 'blur(4px)' : 'blur(0px)',
      }}
    >
      <motion.div 
        className="w-1 h-1 bg-white rounded-full"
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
