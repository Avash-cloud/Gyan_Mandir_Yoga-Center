import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GiLotus,
  GiMeditation,
  GiMountainRoad,
  GiLotusFlower,
} from "react-icons/gi";

import SEO from "../components/SEO";
import Card from "../components/ui/Card";
import { db } from "../services/db";
import { localImages } from "../data/yogaData";
import Logo from "../components/Logo";

const timelineEvents = [
  {
    year: "2014",
    title: "The Beginning",
    description:
      "Gyan Mandir was founded with a simple intention: to preserve and share authentic classical yoga through disciplined, accessible practice.",
  },
  {
    year: "2018",
    title: "A Space for Stillness",
    description:
      "The center established its peaceful home in Samakhusi, creating a natural environment designed around simplicity, airflow, quietness, and mindful practice.",
  },
  {
    year: "2022",
    title: "Yoga for Everyday Well-being",
    description:
      "Our practice expanded to include carefully adapted therapeutic approaches for students seeking support with mobility, breathing, stress, and physical recovery.",
  },
  {
    year: "2026",
    title: "A Living Tradition",
    description:
      "Today, Gyan Mandir continues to grow as a welcoming sanctuary where traditional yoga meets the needs of modern everyday life.",
  },
];

const values = [
  {
    icon: GiLotus,
    eyebrow: "01",
    title: "Authentic Practice",
    description:
      "We remain grounded in classical yoga traditions, respecting the depth, discipline, and purpose behind every practice.",
  },
  {
    icon: GiMountainRoad,
    eyebrow: "02",
    title: "Quiet Progress",
    description:
      "We believe meaningful transformation happens gradually through consistency, awareness, breath, and patient practice.",
  },
  {
    icon: GiMeditation,
    eyebrow: "03",
    title: "Whole-Person Wellness",
    description:
      "Yoga is approached as a complete practice supporting the body, breath, mind, and the quality of everyday life.",
  },
];

const instructor = {
  name: "Deepak Mama",
  role: "Lead Yoga Instructor",
  credentials: "Classical Yoga Teacher",
  image: localImages.instructorDeepak,
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function About() {
  const [settings, setSettings] = useState(null);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const settingsData = await db.site_settings.get();
        setSettings(settingsData);
        const instructorsData = await db.instructors.getAll();
        setInstructors(instructorsData);
      } catch (err) {
        console.error("Failed to load about data:", err);
      }
    };
    fetchAboutData();
  }, []);

  const timeline = settings?.timeline || timelineEvents;

  return (
    <>
      <SEO
        title="About Gyan Mandir | Our Story, Philosophy & Instructors"
        description="Discover the story, philosophy, teaching approach, and people behind Gyan Mandir, a classical yoga and wellness center in Kathmandu."
      />

      <main className="overflow-hidden bg-brand-offwhite text-brand-forest dark:bg-brand-forest dark:text-brand-offwhite">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative isolate">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-brand-sage/10 blur-3xl dark:bg-brand-sage/5" />

            <div className="absolute right-[-12%] top-[20%] h-64 w-64 rounded-full border border-brand-sage/10" />

            <div className="absolute left-[-10%] top-[35%] h-80 w-80 rounded-full border border-brand-sage/10" />
          </div>

          <div className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pb-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mx-auto max-w-4xl text-center"
            >
              <motion.div variants={sectionVariants} className="mb-8">
                <Logo
                  variant="full"
                  className="mx-auto h-auto w-44 opacity-95 drop-shadow-[0_8px_25px_rgba(225,180,61,0.16)] sm:w-52"
                />
              </motion.div>

              <motion.div
                variants={sectionVariants}
                className="mb-5 flex items-center justify-center gap-4"
              >
                <span className="h-px w-10 bg-brand-sage/50" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-sage">
                  Our Story
                </span>
                <span className="h-px w-10 bg-brand-sage/50" />
              </motion.div>

              <motion.h1
                variants={sectionVariants}
                className="font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-brand-forest dark:text-brand-offwhite sm:text-6xl lg:text-7xl"
              >
                A place to
                <span className="block text-brand-sage">
                  return to yourself.
                </span>
              </motion.h1>

              <motion.p
                variants={sectionVariants}
                className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-brand-forest/65 dark:text-brand-beige/70 sm:text-base sm:leading-8"
              >
                Gyan Mandir is a space dedicated to classical yoga,
                conscious breathing, meditation, and the quiet discipline of
                caring for the whole self.
              </motion.p>

              <motion.div
                variants={sectionVariants}
                className="mx-auto mt-10 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-brand-forest/45 dark:text-brand-beige/45"
              >
                <GiLotusFlower className="text-brand-sage" />
                <span>Tradition · Awareness · Well-being</span>
                <GiLotusFlower className="text-brand-sage" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            INTRODUCTION
        ========================================================== */}
        <section className="border-y border-brand-forest/5 bg-brand-beige/25 dark:border-white/5 dark:bg-brand-forest/20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                Why Gyan Mandir
              </p>

              <h2 className="mt-4 max-w-md font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Yoga that respects where it comes from.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="max-w-2xl"
            >
              <p className="text-base leading-8 text-brand-forest/70 dark:text-brand-beige/70 sm:text-lg">
                At Gyan Mandir, yoga is not treated simply as exercise. Our
                approach is rooted in the traditional understanding of yoga as
                a practice of awareness — bringing greater attention to the
                body, breath, mind, and daily life.
              </p>

              <p className="mt-6 text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55">
                We aim to create an environment where students can practice
                without unnecessary distractions, learn at their own pace, and
                develop a relationship with yoga that extends beyond the mat.
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            VALUES
        ========================================================== */}
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={sectionVariants}
              className="mb-14 max-w-2xl"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                What Guides Us
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Simple principles. Deep practice.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] bg-brand-sage/15 md:grid-cols-3">
              {values.map((value) => (
                <motion.article
                  key={value.eyebrow}
                  variants={sectionVariants}
                  className="group bg-brand-offwhite p-8 transition-colors duration-500 hover:bg-brand-beige/30 dark:bg-brand-forest dark:hover:bg-brand-forest/70 sm:p-10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-beige text-brand-forest dark:bg-brand-forest/70 dark:text-brand-sage">
                      <value.icon className="h-6 w-6" />
                    </div>

                    <span className="font-serif text-sm text-brand-sage/70">
                      {value.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-10 font-serif text-2xl font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-brand-forest/60 dark:text-brand-beige/60">
                    {value.description}
                  </p>

                  <div className="mt-8 h-px w-10 bg-brand-sage transition-all duration-500 group-hover:w-20" />
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            SANCTUARY
        ========================================================== */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="relative overflow-hidden rounded-[2rem] bg-brand-forest text-brand-offwhite dark:bg-black/20"
          >
            <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[380px] overflow-hidden lg:min-h-full">
                <img
                  src={localImages.about}
                  alt="Yoga practice in the peaceful Gyan Mandir space"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                <div className="absolute bottom-7 left-7">
                  <span className="rounded-full border border-white/20 bg-black/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                    The Gyan Mandir Space
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  The Sanctuary
                </p>

                <h2 className="mt-5 max-w-lg font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  {settings?.about?.sanctuaryTitle || "Designed for quietness, presence, and practice."}
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-8 text-brand-beige/70 sm:text-base">
                  {settings?.about?.sanctuaryDesc || "Our environment is intentionally understated. Natural textures, soft tones, open airflow, and uncluttered spaces help create the feeling of stepping away from the noise of everyday life."}
                </p>

                <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <p className="font-serif text-lg">Natural</p>
                    <p className="mt-1 text-xs text-brand-beige/45">
                      Materials & airflow
                    </p>
                  </div>

                  <div>
                    <p className="font-serif text-lg">Quiet</p>
                    <p className="mt-1 text-xs text-brand-beige/45">
                      Minimal distractions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            INSTRUCTOR
        ========================================================== */}
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={sectionVariants}
              className="mb-14 max-w-2xl"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                The Teacher
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Practice is passed from person to person.
              </h2>

              <p className="mt-5 text-sm leading-7 text-brand-forest/60 dark:text-brand-beige/60">
                At the heart of Gyan Mandir is a teaching approach built around
                patience, observation, correct alignment, breathing, and
                respect for each student's individual journey.
              </p>
            </motion.div>

            {instructors.map((inst) => (
              <motion.article
                key={inst.id}
                variants={sectionVariants}
                className="grid overflow-hidden rounded-[2rem] border border-brand-sage/10 bg-brand-beige/20 dark:bg-brand-forest/20 lg:grid-cols-[0.85fr_1.15fr] mb-10"
              >
                <div className="relative min-h-[460px] overflow-hidden bg-brand-beige dark:bg-black/10">
                  <img
                    src={inst.image}
                    alt={`${inst.name}, ${inst.role}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent" />

                  <div className="absolute bottom-7 left-7">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70">
                      Teacher
                    </p>
                    <p className="mt-1 font-serif text-xl text-white">
                      {inst.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-sage">
                    {inst.role}
                  </p>

                  <h3 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
                    {inst.name}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-brand-forest/45 dark:text-brand-beige/45">
                    {inst.credentials}
                  </p>

                  <div className="my-8 h-px w-16 bg-brand-sage/60" />

                  <p className="max-w-xl text-sm leading-8 text-brand-forest/65 dark:text-brand-beige/65 sm:text-base whitespace-pre-wrap">
                    {inst.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* =========================================================
            TIMELINE
        ========================================================== */}
        <section className="border-y border-brand-forest/5 bg-brand-beige/20 dark:border-white/5 dark:bg-brand-forest/10">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              <motion.div
                variants={sectionVariants}
                className="mx-auto mb-20 max-w-2xl text-center"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  Our Journey
                </p>

                <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  Built slowly. Rooted deeply.
                </h2>

                <p className="mt-5 text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55">
                  A growing community shaped by years of practice, teaching,
                  and an enduring respect for tradition.
                </p>
              </motion.div>

              <div className="relative mx-auto max-w-4xl">
                {/* Timeline line */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-[15px] top-0 w-px bg-brand-sage/25 sm:left-1/2 sm:-translate-x-1/2"
                />

                <div className="space-y-14 sm:space-y-20">
                  {timeline.map((event, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <motion.div
                        key={event.year}
                        variants={sectionVariants}
                        className="relative grid grid-cols-[30px_1fr] gap-6 sm:grid-cols-2 sm:gap-16"
                      >
                        {/* Desktop year */}
                        <div
                          className={`hidden sm:block ${
                            isEven ? "text-right" : "order-2 text-left"
                          }`}
                        >
                          <span className="font-serif text-4xl font-semibold text-brand-sage/80">
                            {event.year}
                          </span>
                        </div>

                        {/* Timeline dot */}
                        <div className="relative row-start-1 flex justify-center sm:absolute sm:left-1/2 sm:top-3 sm:-translate-x-1/2">
                          <span className="relative z-10 block h-3 w-3 rounded-full border-[3px] border-brand-offwhite bg-brand-sage dark:border-brand-forest" />
                        </div>

                        {/* Content */}
                        <div
                          className={`col-start-2 sm:col-start-auto ${
                            isEven ? "sm:col-start-2" : "sm:order-1"
                          }`}
                        >
                          <span className="font-serif text-2xl font-semibold text-brand-sage sm:hidden">
                            {event.year}
                          </span>

                          <div className="mt-3 sm:mt-0">
                            <h3 className="font-serif text-xl font-semibold sm:text-2xl">
                              {event.title}
                            </h3>

                            <p className="mt-3 max-w-md text-sm leading-7 text-brand-forest/60 dark:text-brand-beige/60">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            CLOSING STATEMENT
        ========================================================== */}
        <section className="relative">
          <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 lg:py-36">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <GiLotusFlower className="mx-auto h-7 w-7 text-brand-sage/80" />

              <blockquote className="mt-8 font-serif text-3xl font-medium leading-tight tracking-tight text-brand-forest dark:text-brand-offwhite sm:text-4xl lg:text-5xl">
                “The practice begins with the body,
                <span className="text-brand-sage">
                  {" "}
                  but its purpose reaches much deeper.
                </span>
                ”
              </blockquote>

              <div className="mx-auto mt-10 h-px w-12 bg-brand-sage/50" />

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-forest/40 dark:text-brand-beige/40">
                Gyan Mandir · Classical Yoga & Well-being
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}