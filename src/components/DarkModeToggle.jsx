import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function DarkModeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full glass hover:bg-brand-sage/20 dark:hover:bg-brand-forest/40 text-brand-forest dark:text-brand-sage transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-sage/40 cursor-pointer"
      aria-label="Toggle dark mode"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {theme === "dark" ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}
