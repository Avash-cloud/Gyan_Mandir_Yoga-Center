import { motion } from "framer-motion";

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "", 
  ...props 
}) {
  const baseStyle = "px-6 py-2.5 rounded-full font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-sage/40 duration-300 inline-flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold uppercase tracking-wider";
  
  const variants = {
    primary: "bg-brand-forest text-brand-offwhite hover:bg-brand-sage hover:text-brand-forest dark:bg-brand-sage dark:text-brand-forest dark:hover:bg-brand-beige",
    secondary: "bg-brand-sage text-brand-forest hover:bg-brand-forest hover:text-brand-offwhite dark:bg-brand-olive dark:text-brand-forest",
    outline: "border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-offwhite dark:border-brand-sage dark:text-brand-sage dark:hover:bg-brand-sage dark:hover:text-brand-forest",
    glass: "glass text-brand-forest hover:bg-brand-sage/35 dark:text-brand-sage dark:hover:bg-brand-forest/40"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
