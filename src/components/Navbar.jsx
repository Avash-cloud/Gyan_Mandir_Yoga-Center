// src/components/Navbar.jsx

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";


const links = [
  { path: "/", key: "nav.home" },
  { path: "/about", key: "nav.about" },
  { path: "/classes", key: "nav.classes" },
  { path: "/schedule", key: "nav.schedule" },
  { path: "/gallery", key: "nav.gallery" },
  { path: "/contact", key: "nav.contact" },
];

export default function Navbar({ theme, toggleTheme }) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-brand-offwhite/90 dark:bg-brand-maroon-dark/80 backdrop-blur-md shadow-sm border-b border-brand-sage/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            className="text-brand-forest dark:text-brand-sage"
          >
            <Logo variant="icon" className="w-10 h-10" />
          </motion.div>

          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide text-brand-forest dark:text-brand-gold-light leading-tight group-hover:text-brand-sage transition-colors">
              Gyan Mandir
            </span>

            <span className="text-[10px] uppercase tracking-widest text-brand-sage font-semibold leading-none group-hover:text-brand-gold-light transition-colors">
              Yog Center
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.path}>

                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-2 px-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-brand-forest dark:text-brand-sage font-bold"
                        : "text-brand-forest/65 dark:text-brand-beige/65 hover:text-brand-forest dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(link.key)}

                      {isActive && (
                        <motion.span
                          layoutId="activeNavBorder"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-forest dark:bg-brand-sage rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>

              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-brand-sage/20 mx-2" />

          {/* Dark Mode Toggle */}
          <DarkModeToggle
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* Language Switcher */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <DarkModeToggle
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <LanguageSwitcher />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-brand-forest dark:text-brand-beige hover:text-brand-forest dark:hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand-offwhite dark:bg-brand-maroon-dark border-b border-brand-sage/20 shadow-xl overflow-hidden"
          >
            <nav className="px-4 pt-3 pb-6 space-y-2">
              <ul className="flex flex-col gap-1">

                {links.map((link) => (
                  <li key={link.path}>

                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                          isActive
                            ? "bg-brand-sage/20 text-brand-forest dark:bg-brand-forest/40 dark:text-brand-sage"
                            : "text-brand-forest/70 dark:text-brand-beige/70 hover:bg-brand-beige/30 dark:hover:bg-brand-maroon-deep"
                        }`
                      }
                    >
                      {t(link.key)}
                    </NavLink>

                  </li>
                ))}

              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
