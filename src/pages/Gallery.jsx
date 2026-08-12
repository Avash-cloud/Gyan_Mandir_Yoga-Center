import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";
import SEO from "../components/SEO";
import { galleryData } from "../data/yogaData";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = ["All", "Yoga", "Meditation", "Events", "International Yoga Day", "Workshops"];

  const filteredItems = activeFilter === "All"
    ? galleryData
    : galleryData.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());

  const handleOpenLightbox = (idx) => {
    setLightboxIndex(idx);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <>
      <SEO 
        title="Sanctuary Photo Gallery" 
        description="Browse images of Gyan Mandir Yog Center. Explore photos of our yoga halls, meditation events, workshops, and International Yoga Day celebrations."
      />

      <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Photo Gallery
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Take a visual tour of our light-green sanctuary, sunrise sessions, and international yoga day celebrations.
          </p>
        </section>

        {/* Filter Controls */}
        <section className="flex flex-wrap items-center justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest shadow-sm"
                  : "bg-brand-offwhite text-brand-forest border border-brand-sage/20 hover:border-brand-forest dark:bg-brand-forest/30 dark:text-brand-beige dark:border-brand-sage/10"
              }`}
            >
              {f}
            </button>
          ))}
        </section>

        {/* Masonry Layout */}
        <section className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group overflow-hidden rounded-3xl border border-brand-sage/20 shadow-sm cursor-pointer mb-6"
                onClick={() => handleOpenLightbox(idx)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white backdrop-blur-[1px]">
                  <span className="text-[10px] uppercase tracking-widest text-brand-beige font-bold">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold mt-1">
                    {item.title}
                  </h3>
                  <FiMaximize2 className="w-5 h-5 absolute top-6 right-6 text-brand-offwhite" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseLightbox}
                className="absolute inset-0 bg-brand-forest/95 backdrop-blur-sm"
              />

              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 focus:outline-none"
                aria-label="Close Lightbox"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Navigation Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 focus:outline-none hidden sm:block"
                aria-label="Previous Image"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50 focus:outline-none hidden sm:block"
                aria-label="Next Image"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>

              {/* Image Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative max-w-4xl max-h-[80vh] z-10 flex flex-col items-center justify-center space-y-4"
              >
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] rounded-3xl object-contain border border-brand-sage/20 shadow-2xl"
                />
                
                {/* Details Footer */}
                <div className="text-center text-white px-4">
                  <span className="text-xs uppercase tracking-widest text-brand-beige font-bold">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold mt-1">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
