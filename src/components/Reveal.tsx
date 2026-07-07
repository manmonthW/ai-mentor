"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** 克制的入场:淡入 + 轻微上移。默认页面加载即播;传 inView 则滚动进入视口时播。 */
export default function Reveal({
  children,
  delay = 0,
  y = 14,
  inView = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  inView?: boolean;
  className?: string;
}) {
  const anim = inView
    ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } }
    : { animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...anim}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
