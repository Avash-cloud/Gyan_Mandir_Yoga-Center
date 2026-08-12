import { motion } from "framer-motion";

export default function Card({ 
  children, 
  className = "", 
  glass = false, 
  hoverEffect = true,
  ...props 
}) {
  const cardStyle = glass 
    ? "glass rounded-2xl p-6 shadow-sm overflow-hidden"
    : "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm overflow-hidden";

  if (hoverEffect) {
    return (
      <motion.div
        className={`${cardStyle} ${className}`}
        whileHover={{ y: -6, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.08)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${cardStyle} ${className}`} {...props}>
      {children}
    </div>
  );
}
