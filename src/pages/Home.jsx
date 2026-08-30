import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiPlay,
} from "react-icons/fi";
import { GiLotusFlower, GiMeditation } from "react-icons/gi";

import Logo from "../components/Logo";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import JoinClassModal from "../components/JoinClassModal";
import { db } from "../services/db";
import { getIcon } from "../utils/iconMap";
import {
  localImages,
} from "../data/yogaData";

/* =========================================================
   MOTION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [classes, setClasses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allClasses = await db.classes.getAll();
        setClasses(allClasses.filter(c => c.published));
        const allTestimonials = await db.testimonials.getAll();
        setTestimonials(allTestimonials.filter(t => t.approved));
      } catch (err) {
        console.error("Failed to load Home data:", err);
      }
    };
    fetchData();
  }, []);

  const featuredClasses = useMemo(
    () => classes.slice(0, 3),
    [classes]
  );

  const featuredTestimonials = useMemo(
    () => testimonials.slice(0, 3),
    [testimonials]
  );

  const aboutSlides = useMemo(
    () => [
      {
        image: localImages.about,
        alt: "Gyan Mandir yoga practice",
        label: "The Practice",
      },
      {
        image: localImages.hero,
        alt: "Peaceful yoga and meditation at Gyan Mandir",
        label: "The Sanctuary",
      },
      {
        image: featuredClasses[0]?.image || localImages.about,
        alt:
          featuredClasses[0]?.title ||
          "Yoga class at Gyan Mandir",
        label: featuredClasses[0]?.title || "Classical Yoga",
      },
      {
        image: featuredClasses[1]?.image || localImages.about,
        alt:
          featuredClasses[1]?.title ||
          "Yoga practice at Gyan Mandir",
        label: featuredClasses[1]?.title || "Mindful Movement",
      },
      {
        image: featuredClasses[2]?.image || localImages.about,
        alt:
          featuredClasses[2]?.title ||
          "Meditation and yoga class",
        label: featuredClasses[2]?.title || "Meditation",
      },
    ],
    [featuredClasses]
  );

  const openJoinModal = (classId) => {
    setSelectedClassId(classId);
    setModalOpen(true);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? aboutSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % aboutSlides.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % aboutSlides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [aboutSlides.length]);

  return (
    <>
      <SEO
        title="Gyan Mandir | Classical Yoga, Meditation & Well-being"
        description="Practice classical yoga, pranayama, meditation, and mindful movement at Gyan Mandir — a calm, nature-inspired yoga sanctuary dedicated to physical and inner well-being."
      />

      <main className="overflow-hidden bg-brand-offwhite text-brand-forest dark:bg-brand-forest dark:text-brand-offwhite">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative isolate min-h-[92vh] overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 -z-20">
            <img
              src={localImages.hero}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover scale-[1.03]"
            />
          </div>

          {/* Premium layered overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-offwhite/95 via-brand-offwhite/85 to-brand-offwhite dark:from-brand-forest/95 dark:via-brand-forest/85 dark:to-brand-forest" />

          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/4 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-sage/10 blur-3xl"
          />

          <div className="mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 py-24 sm:px-8 lg:px-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="mx-auto max-w-5xl text-center"
            >
              {/* Logo */}
              <motion.div variants={fadeUp}>
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-brand-sage/20 bg-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-md dark:bg-black/10">
                  <Logo
                    variant="icon"
                    className="h-16 w-16 drop-shadow-[0_0_20px_rgba(225,180,61,0.25)]"
                  />
                </div>
              </motion.div>

              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex items-center justify-center gap-4"
              >
                <span className="h-px w-10 bg-brand-sage/50" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-sage">
                  Gyan Mandir · Kathmandu
                </span>

                <span className="h-px w-10 bg-brand-sage/50" />
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="mx-auto mt-7 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-brand-forest dark:text-brand-offwhite sm:text-6xl lg:text-8xl"
              >
                Quiet the mind.
                <span className="block text-brand-sage">
                  Return to balance.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-brand-forest/65 dark:text-brand-beige/70 sm:text-base sm:leading-8"
              >
                A calm space for classical yoga, conscious breathing,
                meditation, and mindful movement — rooted in tradition and
                adapted to modern life.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Button
                  onClick={() =>
                    openJoinModal("beginner-yoga")
                  }
                  variant="primary"
                  className="min-w-[170px]"
                >
                  Begin Your Practice
                </Button>

                <Link to="/about">
                  <Button
                    variant="outline"
                    className="min-w-[150px] border-brand-forest/30 text-brand-forest hover:bg-brand-forest hover:text-brand-offwhite dark:border-brand-offwhite/30 dark:text-brand-offwhite dark:hover:bg-brand-offwhite dark:hover:text-brand-forest"
                  >
                    Discover Gyan Mandir
                  </Button>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeUp}
                className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-brand-forest/10 pt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-forest/40 dark:border-white/10 dark:text-brand-beige/40"
              >
                <span>Classical Practice</span>
                <span>•</span>
                <span>Breath & Meditation</span>
                <span>•</span>
                <span>Mindful Well-being</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
          >
            <span className="text-[8px] uppercase tracking-[0.3em] text-brand-forest/40 dark:text-brand-beige/40">
              Explore
            </span>

            <span className="h-8 w-px bg-brand-sage/50" />
          </motion.div>
        </section>

        {/* =====================================================
            INTRO / PHILOSOPHY
        ====================================================== */}

        <section className="border-y border-brand-forest/5 bg-brand-beige/20 dark:border-white/5 dark:bg-brand-forest/20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:px-10 lg:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={fadeUp}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                Our Philosophy
              </p>

              <h2 className="mt-4 max-w-lg font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Yoga is not something you rush.
              </h2>

              <div className="mt-8">
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="group"
                  >
                    Our Story
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={fadeUp}
              className="max-w-2xl"
            >
              <p className="text-lg leading-8 text-brand-forest/70 dark:text-brand-beige/70 sm:text-xl sm:leading-9">
                At Gyan Mandir, we believe meaningful practice begins with
                attention — attention to the body, the breath, and the mind.
              </p>

              <p className="mt-6 text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55 sm:text-base">
                Our approach is grounded in classical yoga while remaining
                practical for everyday life. Whether you are beginning your
                journey or returning to practice, the intention is the same:
                create space to move, breathe, recover, and become more aware.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-6 border-t border-brand-sage/15 pt-7 sm:grid-cols-3">
                <div>
                  <p className="font-serif text-xl">Body</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-brand-forest/40 dark:text-brand-beige/40">
                    Movement
                  </p>
                </div>

                <div>
                  <p className="font-serif text-xl">Breath</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-brand-forest/40 dark:text-brand-beige/40">
                    Awareness
                  </p>
                </div>

                <div>
                  <p className="font-serif text-xl">Mind</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-brand-forest/40 dark:text-brand-beige/40">
                    Stillness
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            IMMERSIVE IMAGE / SLIDESHOW
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeIn}
            className="relative overflow-hidden rounded-[2rem] bg-brand-forest dark:bg-black/20"
          >
            <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Image */}
              <div className="group relative min-h-[420px] overflow-hidden lg:min-h-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={aboutSlides[currentSlide].image}
                    alt={aboutSlides[currentSlide].alt}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                {/* Image label */}
                <div className="absolute bottom-8 left-8">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">
                    0{currentSlide + 1} / 0{aboutSlides.length}
                  </p>

                  <p className="mt-2 font-serif text-2xl text-white">
                    {aboutSlides[currentSlide].label}
                  </p>
                </div>

                {/* Controls */}
                <div className="absolute bottom-7 right-7 flex gap-2">
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-brand-forest"
                  >
                    <FiArrowLeft />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-brand-forest"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center p-8 text-brand-offwhite sm:p-12 lg:p-16">
                <GiLotusFlower className="h-7 w-7 text-brand-sage" />

                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  The Gyan Mandir Experience
                </p>

                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  A quieter way to practice.
                </h2>

                <p className="mt-6 text-sm leading-8 text-brand-beige/65 sm:text-base">
                  Step away from noise and into a space intentionally created
                  for movement, breath, reflection, and recovery.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    "Traditional yoga foundations",
                    "Breath-focused practices",
                    "Meditation and mindful awareness",
                    "Calm, nature-inspired surroundings",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-brand-beige/70"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-sage/15 text-brand-sage">
                        <FiCheck className="h-3 w-3" />
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link to="/about">
                    <Button
                      variant="outline"
                      className="border-brand-beige/30 text-brand-offwhite hover:bg-brand-offwhite hover:text-brand-forest"
                    >
                      Explore Our Philosophy
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex h-1">
              {aboutSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`flex-1 transition-all duration-500 ${
                    index === currentSlide
                      ? "bg-brand-sage"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* =====================================================
            CLASSES
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-between gap-6 border-b border-brand-sage/15 pb-8 sm:flex-row sm:items-end"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  Our Programs
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  Find your practice.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55">
                  Thoughtfully structured classes for different levels,
                  intentions, and stages of practice.
                </p>
              </div>

              <Link to="/classes">
                <Button
                  variant="outline"
                  className="group whitespace-nowrap"
                >
                  All Programs
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] bg-brand-sage/15 md:grid-cols-3">
              {featuredClasses.map((cls, index) => {
                const Icon = getIcon(cls.icon);

                return (
                  <motion.article
                    key={cls.id}
                    variants={fadeUp}
                    className="group bg-brand-offwhite dark:bg-brand-forest transition-colors duration-500 hover:bg-brand-beige/20 dark:hover:bg-brand-forest/70"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        {cls.difficulty}
                      </span>

                      <span className="absolute bottom-5 left-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-forest">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex min-h-[280px] flex-col p-7">
                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-sage">
                          0{index + 1}
                        </span>

                        <h3 className="mt-3 font-serif text-2xl font-semibold">
                          {cls.title}
                        </h3>

                        <p className="mt-4 line-clamp-3 text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55">
                          {cls.description}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-brand-sage/10 pt-6">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-forest/45 dark:text-brand-beige/45">
                          {cls.duration}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            openJoinModal(cls.id)
                          }
                          className="group/button flex items-center gap-2 text-xs font-semibold text-brand-forest dark:text-brand-offwhite"
                        >
                          Join Class
                          <FiArrowRight className="transition-transform group-hover/button:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* =====================================================
            TESTIMONIALS
        ====================================================== */}

        <section className="bg-brand-beige/30 dark:bg-brand-forest/15">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="mx-auto max-w-2xl text-center"
              >
                <GiMeditation className="mx-auto h-7 w-7 text-brand-sage" />

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  From Our Community
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                  What practice feels like.
                </h2>

                <p className="mt-4 text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55">
                  Real experiences from people who have made yoga part of
                  their lives.
                </p>
              </motion.div>

              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                {featuredTestimonials.map((testimonial) => (
                  <motion.article
                    key={testimonial.id}
                    variants={fadeUp}
                    className="flex min-h-[280px] flex-col justify-between border-t border-brand-sage/25 pt-7"
                  >
                    <div>
                      <div className="flex gap-1 text-[10px] text-brand-sage">
                        {"★".repeat(testimonial.rating)}
                      </div>

                      <blockquote className="mt-6 font-serif text-xl leading-8 text-brand-forest/80 dark:text-brand-offwhite/85">
                        “{testimonial.review}”
                      </blockquote>
                    </div>

                    <div className="mt-10">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-forest/60 dark:text-brand-beige/60">
                        {testimonial.name}
                      </p>

                      <p className="mt-1 text-[10px] text-brand-forest/40 dark:text-brand-beige/40">
                        {testimonial.role}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="relative">
          <div className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 lg:py-36">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Logo
                  variant="icon"
                  className="mx-auto h-12 w-12 opacity-80"
                />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage"
              >
                Your Practice Starts Here
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              >
                Make a little more room for yourself.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-xl text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55 sm:text-base"
              >
                Come as you are. Begin with the breath, move with awareness,
                and allow the practice to unfold.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Button
                  onClick={() =>
                    openJoinModal("beginner-yoga")
                  }
                  variant="primary"
                  className="min-w-[170px]"
                >
                  Start Your Practice
                </Button>

                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="min-w-[140px]"
                  >
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* =======================================================
          JOIN CLASS MODAL
      ======================================================== */}

      <JoinClassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedClassId={selectedClassId}
      />
    </>
  );
}