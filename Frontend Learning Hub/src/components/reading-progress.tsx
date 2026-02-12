"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-blue-400 to-violet-500"
      style={{ scaleX }}
    />
  );
}
