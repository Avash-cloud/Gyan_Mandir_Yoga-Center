import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { GiLotusFlower } from "react-icons/gi";

import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import JoinClassModal from "../components/JoinClassModal";
import { db } from "../services/db";
import { getIcon } from "../utils/iconMap";

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   FILTERS
========================================================= */

const categories = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels",
  "Gentle",
];

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value = "") =>
  value.toString().trim().toLowerCase();

const matchesFilter = (classItem, filter) => {
  if (filter === "All") return true;

  return normalize(classItem.difficulty) === normalize(filter);
};

/* =========================================================
   CLASS DETAILS
========================================================= */

function ClassMeta({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-brand-sage">
        <Icon className="h-3.5 w-3.5 shrink-0" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>

      <p className="mt-1.5 break-words text-xs leading-5 text-brand-forest/70 dark:text-brand-beige/70">
        {value || "Contact us"}
      </p>
    </div>
  );
}

/* =========================================================
   CLASS CARD
========================================================= */

function ClassCard({ classItem, isExpanded, onToggle, onJoin }) {
  const IconComponent = getIcon(classItem.icon);

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`group overflow-hidden rounded-[1.5rem] border bg-brand-offwhite transition-all duration-300 dark:bg-brand-forest/20 ${
        isExpanded
          ? "border-brand-sage/30 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          : "border-brand-sage/10 hover:border-brand-sage/25 hover:shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative h-60 overflow-hidden">
        <img
          src={classItem.image}
          alt={classItem.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        {/* Difficulty */}
        <div className="absolute left-5 top-5">
          <span className="rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {classItem.difficulty}
          </span>
        </div>

        {/* Icon */}
        {IconComponent && (
          <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-forest shadow-lg">
            <IconComponent className="h-5 w-5" />
          </div>
        )}

        {/* Duration */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-2 text-[10px] text-white backdrop-blur-md">
          <FiClock className="h-3 w-3" />
          {classItem.duration}
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="p-6 sm:p-7">

        {/* Title */}
        <div>
          <h2 className="font-serif text-2xl font-semibold leading-tight text-brand-forest dark:text-brand-offwhite">
            {classItem.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-brand-forest/65 dark:text-brand-beige/65">
            {classItem.description}
          </p>
        </div>

        {/* ===================================================
            QUICK INFORMATION
        ==================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-5 border-y border-brand-sage/10 py-5 sm:grid-cols-3">
          <ClassMeta
            icon={FiClock}
            label="Duration"
            value={classItem.duration}
          />

          <ClassMeta
            icon={FiUser}
            label="Instructor"
            value={classItem.instructor}
          />

          <ClassMeta
            icon={FiCalendar}
            label="Schedule"
            value={classItem.schedule}
          />
        </div>

        {/* ===================================================
            BENEFITS PREVIEW
        ==================================================== */}

        {classItem.benefits?.length > 0 && (
          <div className="mt-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-forest/40 dark:text-brand-beige/40">
              What this practice supports
            </p>

            <div className="mt-3 space-y-2">
              {classItem.benefits
                .slice(0, isExpanded ? classItem.benefits.length : 3)
                .map((benefit, index) => (
                  <div
                    key={`${classItem.id}-benefit-${index}`}
                    className="flex items-start gap-2.5 text-xs leading-5 text-brand-forest/70 dark:text-brand-beige/70"
                  >
                    <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-sage/10 text-brand-sage">
                      <FiCheck className="h-2.5 w-2.5" />
                    </span>

                    <span>{benefit}</span>
                  </div>
                ))}
            </div>

            {!isExpanded && classItem.benefits.length > 3 && (
              <p className="mt-3 text-[10px] text-brand-forest/40 dark:text-brand-beige/40">
                + {classItem.benefits.length - 3} more benefits
              </p>
            )}
          </div>
        )}

        {/* ===================================================
            EXPANDED DETAILS
        ==================================================== */}

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="overflow-hidden"
            >
              <div className="mt-7 border-t border-brand-sage/10 pt-7">

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">

                  {/* Practice */}
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-sage">
                      About this class
                    </p>

                    <p className="mt-3 text-xs leading-6 text-brand-forest/65 dark:text-brand-beige/65">
                      This session is structured around traditional yoga
                      principles while maintaining a calm, accessible
                      approach to practice. Your instructor will guide you
                      through the session progressively, with attention to
                      breathing, movement, awareness, and safe alignment.
                    </p>
                  </div>

                  {/* Suitable for */}
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-sage">
                      Suitable for
                    </p>

                    <p className="mt-3 text-xs leading-6 text-brand-forest/65 dark:text-brand-beige/65">
                      This program is intended for practitioners interested
                      in developing their practice at the{" "}
                      <strong className="font-semibold text-brand-forest dark:text-brand-offwhite">
                        {classItem.difficulty?.toLowerCase()}
                      </strong>{" "}
                      level. If you are unsure which class is appropriate,
                      contact us before joining.
                    </p>
                  </div>
                </div>

                {/* Full schedule */}
                <div className="mt-7 rounded-2xl bg-brand-beige/30 p-5 dark:bg-brand-forest/30">
                  <div className="flex items-start gap-3">
                    <FiCalendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-sage" />

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-sage">
                        Class schedule
                      </p>

                      <p className="mt-2 text-xs leading-6 text-brand-forest/70 dark:text-brand-beige/70">
                        {classItem.schedule ||
                          "Please contact Gyan Mandir for the current schedule."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================
            ACTIONS
        ==================================================== */}

        <div className="mt-7 flex flex-col gap-3 border-t border-brand-sage/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            className="group flex items-center justify-center gap-2 text-xs font-semibold text-brand-forest transition-colors hover:text-brand-sage dark:text-brand-offwhite dark:hover:text-brand-sage sm:justify-start"
          >
            {isExpanded ? "Show less" : "Read full details"}

            <FiArrowDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            />
          </button>

          <Button
            onClick={() => onJoin(classItem.id)}
            className="w-full sm:w-auto sm:min-w-[130px]"
          >
            Join Class
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Classes() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const allClasses = await db.classes.getAll();
        setClasses(allClasses.filter(c => c.published));
      } catch (err) {
        console.error("Failed to load classes:", err);
      }
    };
    fetchClasses();
  }, []);

  /* =======================================================
     FILTER DATA
  ======================================================== */

  const filteredClasses = useMemo(() => {
    const query = normalize(search);

    return classes.filter((classItem) => {
      const matchesCategory = matchesFilter(classItem, filter);

      if (!matchesCategory) return false;

      if (!query) return true;

      const searchableText = [
        classItem.title,
        classItem.description,
        classItem.difficulty,
        classItem.instructor,
        classItem.schedule,
        ...(classItem.benefits || []),
      ]
        .filter(Boolean)
        .map(normalize)
        .join(" ");

      return searchableText.includes(query);
    });
  }, [filter, search]);

  /* =======================================================
     ACTIONS
  ======================================================== */

  const openJoinModal = (classId) => {
    setSelectedClassId(classId);
    setModalOpen(true);
  };

  const toggleExpanded = (id) => {
    setExpandedId((current) =>
      current === id ? null : id
    );
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    setExpandedId(null);
  };

  return (
    <>
      <SEO
        title="Yoga Classes & Wellness Programs | Gyan Mandir"
        description="Explore Gyan Mandir's classical yoga, meditation, pranayama, therapeutic, gentle, and specialized wellness programs. Find a practice suited to your level and goals."
      />

      <main className="min-h-screen bg-brand-offwhite dark:bg-brand-forest">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-1/2 top-[-180px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-sage/8 blur-3xl dark:bg-brand-sage/5" />

            <div className="absolute right-[-100px] top-20 h-72 w-72 rounded-full border border-brand-sage/10" />

            <div className="absolute left-[-150px] top-60 h-80 w-80 rounded-full border border-brand-sage/10" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-8 bg-brand-sage/50" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  Gyan Mandir Programs
                </span>

                <span className="h-px w-8 bg-brand-sage/50" />
              </div>

              <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.035em] text-brand-forest dark:text-brand-offwhite sm:text-6xl">
                Yoga for your body,
                <span className="block text-brand-sage">
                  mind, and everyday life.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-brand-forest/60 dark:text-brand-beige/65 sm:text-base sm:leading-8">
                Explore our complete collection of yoga and wellness
                programs. Take your time, read about each practice, and
                choose the class that feels right for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            PROGRAM DIRECTORY
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">

          {/* ===================================================
              DIRECTORY HEADER
          ==================================================== */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={fadeUp}
            className="border-y border-brand-sage/10 py-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Filter */}
              <div
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
                role="tablist"
                aria-label="Filter yoga classes"
              >
                {categories.map((category) => {
                  const active = filter === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() =>
                        handleFilterChange(category)
                      }
                      className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                        active
                          ? "bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest"
                          : "border border-brand-sage/15 text-brand-forest/55 hover:border-brand-sage/35 hover:text-brand-forest dark:text-brand-beige/55 dark:hover:text-brand-offwhite"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-forest/35 dark:text-brand-beige/35" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search classes..."
                  aria-label="Search classes"
                  className="h-11 w-full rounded-full border border-brand-sage/15 bg-transparent pl-11 pr-10 text-xs text-brand-forest outline-none transition-colors placeholder:text-brand-forest/35 focus:border-brand-sage/50 dark:text-brand-offwhite dark:placeholder:text-brand-beige/35"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brand-forest/40 hover:bg-brand-sage/10 dark:text-brand-beige/40"
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* ===================================================
              RESULTS SUMMARY
          ==================================================== */}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-sage">
                Our classes
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-forest dark:text-brand-offwhite">
                Choose your practice
              </h2>
            </div>

            <p className="text-xs text-brand-forest/45 dark:text-brand-beige/45">
              Showing{" "}
              <strong className="font-semibold text-brand-forest dark:text-brand-offwhite">
                {filteredClasses.length}
              </strong>{" "}
              {filteredClasses.length === 1
                ? "program"
                : "programs"}
            </p>
          </div>

          {/* ===================================================
              CLASS GRID
          ==================================================== */}

          <div className="mt-8">
            <AnimatePresence mode="popLayout">

              {filteredClasses.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-7 md:grid-cols-2"
                >
                  {filteredClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classItem={classItem}
                      isExpanded={
                        expandedId === classItem.id
                      }
                      onToggle={() =>
                        toggleExpanded(classItem.id)
                      }
                      onJoin={openJoinModal}
                    />
                  ))}
                </motion.div>
              ) : (
                /* =================================================
                   EMPTY SEARCH
                ================================================== */

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-[1.75rem] border border-dashed border-brand-sage/20 px-6 py-20 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-sage/10 text-brand-sage">
                    <GiLotusFlower className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-semibold text-brand-forest dark:text-brand-offwhite">
                    No classes found
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-brand-forest/50 dark:text-brand-beige/50">
                    We couldn't find a program matching your search.
                    Try another term or browse all of our available
                    classes.
                  </p>

                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setFilter("All");
                        setSearch("");
                      }}
                      className="rounded-full border border-brand-sage/20 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-brand-forest transition-colors hover:border-brand-sage/50 dark:text-brand-offwhite"
                    >
                      View all classes
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>

        {/* =====================================================
            HELP SECTION
        ====================================================== */}

        <section className="border-t border-brand-sage/10 bg-brand-beige/20 dark:bg-brand-forest/10">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={fadeUp}
            >
              <GiLotusFlower className="mx-auto h-7 w-7 text-brand-sage" />

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                Not sure where to start?
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-forest dark:text-brand-offwhite sm:text-4xl">
                Your practice doesn't need to be complicated.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-brand-forest/55 dark:text-brand-beige/55">
                Start with a class that matches your current level and
                goals. If you are completely new to yoga or are unsure
                which program is appropriate, our team can help you choose.
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() =>
                    openJoinModal(
                      classes[0]?.id || "beginner-yoga"
                    )
                  }
                >
                  Ask About the Right Class
                  <FiArrowRight className="ml-2 inline-block" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* =======================================================
          JOIN MODAL
      ======================================================== */}

      <JoinClassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedClassId={selectedClassId}
      />
    </>
  );
}