import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
  FiGrid,
  FiImage,
} from "react-icons/fi";

import SEO from "../components/SEO";
import { db } from "../services/db";

const filters = [
  "All",
  "Yoga",
  "Meditation",
  "Events",
  "International Yoga Day",
  "Workshops",
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await db.gallery.getAll();
        setGallery(data.filter(p => p.published));
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  /*
   * ------------------------------------------------------------
   * FILTERED GALLERY
   * ------------------------------------------------------------
   */
  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return gallery;
    }

    return gallery.filter(
      (item) =>
        item.category?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, gallery]);

  /*
   * ------------------------------------------------------------
   * LIGHTBOX ITEM
   * ------------------------------------------------------------
   */
  const activeItem =
    lightboxIndex !== null
      ? filteredItems[lightboxIndex]
      : null;

  /*
   * ------------------------------------------------------------
   * OPEN LIGHTBOX
   * ------------------------------------------------------------
   */
  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  /*
   * ------------------------------------------------------------
   * CLOSE LIGHTBOX
   * ------------------------------------------------------------
   */
  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  /*
   * ------------------------------------------------------------
   * NEXT IMAGE
   * ------------------------------------------------------------
   */
  const nextImage = () => {
    if (!filteredItems.length) return;

    setLightboxIndex((current) => {
      if (current === null) return 0;

      return (current + 1) % filteredItems.length;
    });
  };

  /*
   * ------------------------------------------------------------
   * PREVIOUS IMAGE
   * ------------------------------------------------------------
   */
  const previousImage = () => {
    if (!filteredItems.length) return;

    setLightboxIndex((current) => {
      if (current === null) return 0;

      return (
        (current - 1 + filteredItems.length) %
        filteredItems.length
      );
    });
  };

  /*
   * ------------------------------------------------------------
   * FILTER CHANGE
   * ------------------------------------------------------------
   */
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setLightboxIndex(null);
  };

  /*
   * ------------------------------------------------------------
   * KEYBOARD CONTROLS
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredItems.length]);

  /*
   * ------------------------------------------------------------
   * LOCK BODY SCROLL WHILE LIGHTBOX IS OPEN
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <SEO
        title="Gallery | Gyan Mandir Yoga & Wellness"
        description="Explore the peaceful spaces, yoga practices, meditation sessions, workshops, and community moments at Gyan Mandir."
      />

      <main className="bg-brand-offwhite dark:bg-brand-forest transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">

          {/* =====================================================
              PAGE INTRO
          ====================================================== */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-beige/70 dark:bg-brand-forest/40 border border-brand-sage/20 text-brand-forest dark:text-brand-sage text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em]">
              <FiImage className="w-3.5 h-3.5" />
              <span>Our Visual Journey</span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-brand-forest dark:text-brand-offwhite">
              Moments of{" "}
              <span className="animate-gold-shine italic">
                Stillness
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base lg:text-lg leading-8 font-light text-brand-forest/70 dark:text-brand-beige/75 max-w-2xl mx-auto">
              A glimpse into life at Gyan Mandir — from quiet
              morning practices and meditation to workshops,
              celebrations, and meaningful moments shared by our
              community.
            </p>
          </motion.section>

          {/* =====================================================
              GALLERY SUMMARY
          ====================================================== */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-beige/50 dark:bg-brand-forest/30 border border-brand-sage/15">
              <FiGrid className="w-4 h-4 text-brand-sage" />

              <span className="text-xs font-semibold text-brand-forest/70 dark:text-brand-beige/70">
                {filteredItems.length}{" "}
                {filteredItems.length === 1
                  ? "moment"
                  : "moments"}
              </span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-brand-sage/50" />

            <p className="text-xs text-brand-forest/50 dark:text-brand-beige/50">
              Select an image to explore the gallery
            </p>
          </motion.section>

          {/* =====================================================
              FILTER BAR
          ====================================================== */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="mt-10"
          >
            <div className="flex justify-center">
              <div className="w-full lg:w-auto p-2 rounded-2xl sm:rounded-full bg-brand-beige/40 dark:bg-brand-forest/20 border border-brand-sage/15">
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {filters.map((filter) => {
                    const isActive = activeFilter === filter;

                    const count =
                      filter === "All"
                        ? gallery.length
                        : gallery.filter(
                            (item) =>
                              item.category?.toLowerCase() ===
                              filter.toLowerCase()
                          ).length;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => handleFilterChange(filter)}
                        aria-pressed={isActive}
                        className={`
                          inline-flex items-center gap-2
                          px-4 sm:px-5 py-2.5
                          rounded-xl sm:rounded-full
                          text-[10px] sm:text-xs
                          font-bold uppercase
                          tracking-wider
                          transition-all duration-300
                          focus:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-brand-sage
                          focus-visible:ring-offset-2
                          dark:focus-visible:ring-offset-brand-forest
                          ${
                            isActive
                              ? "bg-brand-forest text-brand-offwhite dark:bg-brand-sage dark:text-brand-forest shadow-md"
                              : "text-brand-forest/65 dark:text-brand-beige/65 hover:text-brand-forest dark:hover:text-brand-offwhite hover:bg-brand-offwhite/70 dark:hover:bg-brand-forest/40"
                          }
                        `}
                      >
                        <span>{filter}</span>

                        <span
                          className={`
                            min-w-[20px] h-5 px-1.5
                            rounded-full
                            flex items-center justify-center
                            text-[9px]
                            ${
                              isActive
                                ? "bg-white/15 dark:bg-brand-forest/15"
                                : "bg-brand-sage/10"
                            }
                          `}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>

          {/* =====================================================
              EMPTY STATE
          ====================================================== */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 text-center py-20 rounded-3xl border border-dashed border-brand-sage/25 bg-brand-beige/20 dark:bg-brand-forest/20"
            >
              <FiImage className="w-10 h-10 mx-auto text-brand-sage/60" />

              <h2 className="mt-5 font-serif text-2xl font-bold text-brand-forest dark:text-brand-offwhite">
                No images in this collection yet
              </h2>

              <p className="mt-2 text-sm text-brand-forest/60 dark:text-brand-beige/60">
                Please explore another gallery category.
              </p>

              <button
                type="button"
                onClick={() => handleFilterChange("All")}
                className="mt-6 px-5 py-2.5 rounded-full bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest text-xs font-bold uppercase tracking-wider"
              >
                View All Images
              </button>
            </motion.div>
          )}

          {/* =====================================================
              PREMIUM MASONRY GALLERY
          ====================================================== */}
          {filteredItems.length > 0 && (
            <motion.section
              layout
              className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative break-inside-avoid mb-5 sm:mb-6"
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="
                        relative block w-full
                        overflow-hidden
                        rounded-[1.5rem]
                        sm:rounded-[1.75rem]
                        bg-brand-beige/30
                        dark:bg-brand-forest/30
                        border border-brand-sage/15
                        shadow-sm
                        cursor-zoom-in
                        text-left
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-brand-sage
                        focus-visible:ring-offset-4
                        dark:focus-visible:ring-offset-brand-forest
                      "
                      aria-label={`Open ${item.title}`}
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="
                          block
                          w-full
                          h-auto
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.045]
                        "
                      />

                      {/* Permanent bottom gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                      {/* Category */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-[0.16em] font-bold text-white">
                          {item.category}
                        </span>
                      </div>

                      {/* Expand icon */}
                      <div
                        className="
                          absolute
                          top-4
                          right-4
                          w-9
                          h-9
                          rounded-full
                          bg-black/25
                          backdrop-blur-md
                          border border-white/15
                          flex
                          items-center
                          justify-center
                          text-white
                          transition-all
                          duration-300
                          group-hover:bg-brand-sage
                          group-hover:text-brand-forest
                          group-hover:scale-105
                        "
                      >
                        <FiMaximize2 className="w-4 h-4" />
                      </div>

                      {/* Caption */}
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                        <h2 className="font-serif text-lg sm:text-xl font-semibold leading-tight">
                          {item.title}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 opacity-80">
                          <span className="w-5 h-px bg-brand-sage" />

                          <span className="text-[9px] uppercase tracking-[0.16em] font-semibold">
                            View Moment
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.section>
          )}

          {/* =====================================================
              CLOSING STATEMENT
          ====================================================== */}
          {filteredItems.length > 0 && (
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-20 sm:mt-28 max-w-2xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-12 bg-brand-sage/30" />
                <span className="w-2 h-2 rounded-full bg-brand-sage" />
                <span className="h-px w-12 bg-brand-sage/30" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest dark:text-brand-offwhite">
                More Than a Practice
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-7 font-light text-brand-forest/65 dark:text-brand-beige/65">
                Every class, gathering, and quiet moment contributes
                to the atmosphere of Gyan Mandir. These photographs
                offer only a glimpse of the community and stillness
                found within our space.
              </p>
            </motion.section>
          )}
        </div>
      </main>

      {/* =========================================================
          LIGHTBOX
      ========================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && activeItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background */}
            <motion.button
              type="button"
              aria-label="Close image viewer"
              onClick={closeLightbox}
              className="absolute inset-0 bg-brand-forest/95 backdrop-blur-xl cursor-default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Top controls */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-[102] flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sage" />

                <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] font-semibold">
                  {activeItem.category}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close image viewer"
                className="
                  pointer-events-auto
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  backdrop-blur-md
                  border border-white/10
                  text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-sage
                "
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Previous */}
            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className="
                  absolute
                  left-3
                  sm:left-6
                  lg:left-10
                  top-1/2
                  -translate-y-1/2
                  z-[102]
                  w-11
                  h-11
                  sm:w-12
                  sm:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  backdrop-blur-md
                  border border-white/10
                  text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-sage
                "
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next */}
            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="
                  absolute
                  right-3
                  sm:right-6
                  lg:right-10
                  top-1/2
                  -translate-y-1/2
                  z-[102]
                  w-11
                  h-11
                  sm:w-12
                  sm:h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  backdrop-blur-md
                  border border-white/10
                  text-white
                  flex
                  items-center
                  justify-center
                  transition-all
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-sage
                "
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image + details */}
            <motion.div
              key={activeItem.id}
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-[101]
                w-full
                max-w-6xl
                max-h-[92vh]
                flex
                flex-col
                items-center
              "
              onClick={(event) => event.stopPropagation()}
            >
              {/* Image frame */}
              <div className="relative max-w-full max-h-[72vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="
                    block
                    max-w-full
                    max-h-[72vh]
                    w-auto
                    h-auto
                    object-contain
                  "
                />
              </div>

              {/* Details */}
              <div className="mt-5 sm:mt-6 w-full max-w-2xl text-center text-white px-12 sm:px-16">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold">
                  {activeItem.title}
                </h2>

                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-brand-sage/70" />

                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold text-brand-beige/80">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>

                  <span className="h-px w-8 bg-brand-sage/70" />
                </div>
              </div>
            </motion.div>

            {/* Mobile hint */}
            {filteredItems.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[102] text-[9px] uppercase tracking-[0.16em] text-white/40 whitespace-nowrap">
                Use ← → to navigate · Esc to close
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}