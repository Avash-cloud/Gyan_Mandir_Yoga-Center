import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiInfo,
  FiRepeat,
  FiSearch,
  FiSun,
  FiMoon,
  FiX,
} from "react-icons/fi";
import { GiLotusFlower } from "react-icons/gi";

import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import { db } from "../services/db";

/* =========================================================
   CONSTANTS
========================================================= */

const DAYS = [
  {
    key: "monday",
    label: "Monday",
    short: "Mon",
  },
  {
    key: "tuesday",
    label: "Tuesday",
    short: "Tue",
  },
  {
    key: "wednesday",
    label: "Wednesday",
    short: "Wed",
  },
  {
    key: "thursday",
    label: "Thursday",
    short: "Thu",
  },
  {
    key: "friday",
    label: "Friday",
    short: "Fri",
  },
  {
    key: "saturday",
    label: "Saturday",
    short: "Sat",
  },
  {
    key: "sunday",
    label: "Sunday",
    short: "Sun",
  },
];

const SHIFTS = [
  {
    id: "all",
    label: "All Classes",
    icon: FiCalendar,
  },
  {
    id: "morning",
    label: "Morning",
    icon: FiSun,
  },
  {
    id: "evening",
    label: "Evening",
    icon: FiMoon,
  },
];

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value = "") =>
  value.toString().trim().toLowerCase();

const isRest = (value = "") =>
  normalize(value) === "rest";

const isSpecial = (value = "") => {
  const text = normalize(value);

  return (
    text.includes("workshop") ||
    text.includes("satsang") ||
    text.includes("training") ||
    text.includes("special") ||
    text.includes("retreat")
  );
};

const isMorning = (time = "") => {
  const normalized = normalize(time);

  return normalized.includes("am");
};

const getCellTone = (value) => {
  if (isRest(value)) {
    return "rest";
  }

  if (isSpecial(value)) {
    return "special";
  }

  return "class";
};

/* =========================================================
   TIME BADGE
========================================================= */

function TimeBadge({ time }) {
  const morning = isMorning(time);

  const Icon = morning ? FiSun : FiMoon;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          morning
            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
            : "bg-brand-sage/10 text-brand-sage"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-forest/40 dark:text-brand-beige/40">
          {morning ? "Morning" : "Evening"}
        </p>

        <p className="mt-0.5 font-serif text-base font-semibold text-brand-forest dark:text-brand-offwhite">
          {time}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SCHEDULE CELL
========================================================= */

function ScheduleCell({ value }) {
  const tone = getCellTone(value);

  if (tone === "rest") {
    return (
      <div className="flex min-h-[76px] items-center">
        <span className="text-xs italic text-brand-forest/30 dark:text-brand-beige/30">
          Rest
        </span>
      </div>
    );
  }

  if (tone === "special") {
    return (
      <div className="min-h-[76px] rounded-xl border border-brand-sage/20 bg-brand-sage/8 p-3 dark:bg-brand-sage/5">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sage/15 text-brand-sage">
            <FiCheck className="h-3 w-3" />
          </div>

          <span className="text-xs font-semibold leading-5 text-brand-forest dark:text-brand-offwhite">
            {value}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[76px] rounded-xl p-3 transition-colors hover:bg-brand-sage/5">
      <p className="text-xs font-medium leading-5 text-brand-forest/75 dark:text-brand-beige/75">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MOBILE CLASS CARD
========================================================= */

function MobileScheduleCard({ day, time, value }) {
  const tone = getCellTone(value);

  if (tone === "rest") {
    return (
      <div className="rounded-2xl border border-brand-sage/8 bg-brand-forest/[0.015] p-4 dark:bg-white/[0.015]">
        <div className="flex items-center justify-between gap-4">
          <TimeBadge time={time} />

          <span className="text-[10px] italic text-brand-forest/30 dark:text-brand-beige/30">
            Rest
          </span>
        </div>
      </div>
    );
  }

  return (
    <article
      className={`rounded-2xl border p-4 transition-all ${
        tone === "special"
          ? "border-brand-sage/25 bg-brand-sage/[0.06]"
          : "border-brand-sage/10 bg-brand-offwhite dark:bg-brand-forest/20"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <TimeBadge time={time} />

        {tone === "special" && (
          <span className="rounded-full bg-brand-sage/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-brand-sage">
            Special
          </span>
        )}
      </div>

      <div className="mt-4 border-t border-brand-sage/10 pt-4">
        <p className="text-sm font-medium leading-6 text-brand-forest dark:text-brand-offwhite">
          {value}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   DAY SECTION MOBILE
========================================================= */

function MobileDaySection({ day, scheduleRows }) {
  const classes = scheduleRows
    .map((row) => ({
      time: row.time,
      value: row[day.key],
    }))
    .filter((item) => item.value);

  if (!classes.length) return null;

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-brand-sage/10 bg-brand-offwhite dark:bg-brand-forest/20">
      <div className="flex items-center justify-between border-b border-brand-sage/10 bg-brand-beige/25 px-5 py-4 dark:bg-brand-forest/30">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-sage">
            Weekly schedule
          </p>

          <h2 className="mt-1 font-serif text-xl font-semibold text-brand-forest dark:text-brand-offwhite">
            {day.label}
          </h2>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-sage/10 font-serif text-xs font-semibold text-brand-sage">
          {day.short}
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {classes.map((item, index) => (
          <MobileScheduleCard
            key={`${day.key}-${item.time}-${index}`}
            day={day}
            time={item.time}
            value={item.value}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Schedule() {
  const [shiftFilter, setShiftFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("monday");

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await db.schedule.getAll();
        setSchedule(data);
      } catch (err) {
        console.error("Failed to load schedule:", err);
      }
    };
    fetchSchedule();
  }, []);

  /* =======================================================
     FILTER SCHEDULE
  ======================================================== */

  const filteredSchedule = useMemo(() => {
    const query = normalize(search);

    return schedule.filter((row) => {
      /* Shift filter */
      const morning = isMorning(row.time);

      if (shiftFilter === "morning" && !morning) {
        return false;
      }

      if (shiftFilter === "evening" && morning) {
        return false;
      }

      /* Search */
      if (!query) return true;

      const searchableContent = [
        row.time,
        row.monday,
        row.tuesday,
        row.wednesday,
        row.thursday,
        row.friday,
        row.saturday,
        row.sunday,
      ]
        .filter(Boolean)
        .map(normalize)
        .join(" ");

      return searchableContent.includes(query);
    });
  }, [shiftFilter, search]);

  /* =======================================================
     DAY DATA
  ======================================================== */

  const selectedDayData =
    DAYS.find((day) => day.key === selectedDay) || DAYS[0];

  const selectedDayClasses = filteredSchedule
    .map((row) => ({
      time: row.time,
      value: row[selectedDayData.key],
    }))
    .filter((item) => item.value);

  /* =======================================================
     COUNTS
  ======================================================== */

  const totalEntries = filteredSchedule.reduce(
    (total, row) => {
      return (
        total +
        DAYS.filter((day) => {
          const value = row[day.key];

          return value && !isRest(value);
        }).length
      );
    },
    0
  );

  /* =======================================================
     CLEAR SEARCH
  ======================================================== */

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <>
      <SEO
        title="Yoga Class Schedule & Timetable | Gyan Mandir"
        description="View the weekly Gyan Mandir yoga schedule, including morning and evening classes, meditation, pranayama, workshops, and special sessions."
      />

      <main className="min-h-screen bg-brand-offwhite dark:bg-brand-forest">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-1/2 top-[-220px] h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-brand-sage/8 blur-3xl dark:bg-brand-sage/5" />

            <div className="absolute right-[-120px] top-28 h-72 w-72 rounded-full border border-brand-sage/10" />

            <div className="absolute left-[-140px] top-72 h-80 w-80 rounded-full border border-brand-sage/10" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10">

            <div className="mx-auto max-w-3xl text-center">

              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-8 bg-brand-sage/50" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  Weekly timetable
                </span>

                <span className="h-px w-8 bg-brand-sage/50" />
              </div>

              <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.05] tracking-[-0.035em] text-brand-forest dark:text-brand-offwhite sm:text-6xl">
                Find a time to
                <span className="block text-brand-sage">
                  slow down.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-brand-forest/60 dark:text-brand-beige/65 sm:text-base sm:leading-8">
                Build a consistent practice around your day. Browse our
                weekly timetable and find a morning or evening session that
                works naturally for you.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            SCHEDULE CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">

          {/* ===================================================
              CONTROL BAR
          ==================================================== */}

          <div className="rounded-[1.5rem] border border-brand-sage/10 bg-brand-offwhite p-4 shadow-sm dark:bg-brand-forest/20 sm:p-5">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Shift buttons */}
              <div
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
                role="tablist"
                aria-label="Filter schedule by time"
              >
                {SHIFTS.map((shift) => {
                  const Icon = shift.icon;
                  const active = shiftFilter === shift.id;

                  return (
                    <button
                      key={shift.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setShiftFilter(shift.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                        active
                          ? "bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest"
                          : "border border-brand-sage/15 text-brand-forest/55 hover:border-brand-sage/35 hover:text-brand-forest dark:text-brand-beige/55 dark:hover:text-brand-offwhite"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {shift.label}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-forest/30 dark:text-brand-beige/30" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search classes..."
                  aria-label="Search schedule"
                  className="h-11 w-full rounded-full border border-brand-sage/15 bg-transparent pl-11 pr-10 text-xs text-brand-forest outline-none transition-colors placeholder:text-brand-forest/30 focus:border-brand-sage/50 dark:text-brand-offwhite dark:placeholder:text-brand-beige/30"
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
          </div>

          {/* ===================================================
              SUMMARY
          ==================================================== */}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-sage">
                This week's schedule
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-forest dark:text-brand-offwhite">
                Plan your practice
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-brand-forest/45 dark:text-brand-beige/45">
              <FiCalendar className="h-3.5 w-3.5 text-brand-sage" />

              <span>
                {totalEntries}{" "}
                {totalEntries === 1
                  ? "session"
                  : "sessions"}{" "}
                available
              </span>
            </div>
          </div>

          {/* ===================================================
              MOBILE DAY SELECTOR
          ==================================================== */}

          <div className="mt-8 lg:hidden">

            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {DAYS.map((day) => {
                const active =
                  selectedDay === day.key;

                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() =>
                      setSelectedDay(day.key)
                    }
                    className={`shrink-0 rounded-full px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all ${
                      active
                        ? "bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest"
                        : "border border-brand-sage/15 text-brand-forest/50 dark:text-brand-beige/50"
                    }`}
                  >
                    {day.short}
                  </button>
                );
              })}
            </div>

            {selectedDayClasses.length > 0 ? (
              <div className="space-y-3">
                {selectedDayClasses.map(
                  (item, index) => (
                    <MobileScheduleCard
                      key={`${selectedDay}-${item.time}-${index}`}
                      day={selectedDayData}
                      time={item.time}
                      value={item.value}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-brand-sage/20 px-5 py-14 text-center">
                <GiLotusFlower className="mx-auto h-7 w-7 text-brand-sage/50" />

                <p className="mt-4 font-serif text-lg text-brand-forest dark:text-brand-offwhite">
                  No sessions found
                </p>

                <p className="mt-2 text-xs text-brand-forest/45 dark:text-brand-beige/45">
                  Try another day, shift, or search term.
                </p>
              </div>
            )}
          </div>

          {/* ===================================================
              DESKTOP TIMETABLE
          ==================================================== */}

          <div className="mt-8 hidden lg:block">

            <div className="overflow-hidden rounded-[1.5rem] border border-brand-sage/10 bg-brand-offwhite shadow-sm dark:bg-brand-forest/20">

              {/* Table Header */}
              <div className="grid grid-cols-[180px_repeat(7,minmax(120px,1fr))] border-b border-brand-sage/10 bg-brand-forest text-brand-offwhite dark:bg-brand-forest/80">

                <div className="flex items-center gap-2 px-5 py-5">
                  <FiClock className="h-4 w-4 text-brand-sage" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
                    Time
                  </span>
                </div>

                {DAYS.map((day) => (
                  <div
                    key={day.key}
                    className="border-l border-white/5 px-4 py-5"
                  >
                    <p className="font-serif text-sm font-semibold">
                      {day.label}
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-brand-sage">
                      {day.short}
                    </p>
                  </div>
                ))}
              </div>

              {/* Table Body */}
              {filteredSchedule.length > 0 ? (
                <div>
                  {filteredSchedule.map((row, rowIndex) => (
                    <div
                      key={`${row.time}-${rowIndex}`}
                      className="grid grid-cols-[180px_repeat(7,minmax(120px,1fr))] border-b border-brand-sage/8 last:border-b-0"
                    >
                      {/* Time */}
                      <div className="flex items-center border-r border-brand-sage/8 bg-brand-beige/20 px-5 py-4 dark:bg-brand-forest/30">
                        <TimeBadge time={row.time} />
                      </div>

                      {/* Days */}
                      {DAYS.map((day) => (
                        <div
                          key={`${row.time}-${day.key}`}
                          className="border-l border-brand-sage/8 px-1 py-1"
                        >
                          <ScheduleCell
                            value={row[day.key]}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-20 text-center">
                  <GiLotusFlower className="mx-auto h-8 w-8 text-brand-sage/50" />

                  <h3 className="mt-5 font-serif text-xl font-semibold text-brand-forest dark:text-brand-offwhite">
                    No sessions found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-brand-forest/45 dark:text-brand-beige/45">
                    We couldn't find any sessions matching your current
                    filters. Try changing the shift or search term.
                  </p>
                </div>
              )}
            </div>

            {/* Desktop note */}
            <div className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-brand-forest/40 dark:text-brand-beige/40">
              <FiInfo className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-sage" />

              <p>
                Schedule times may occasionally change for workshops,
                holidays, retreats, or special sessions. Please confirm
                your session before attending.
              </p>
            </div>
          </div>

          {/* ===================================================
              MOBILE NOTE
          ==================================================== */}

          <div className="mt-5 flex items-start gap-2 lg:hidden">
            <FiInfo className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-sage" />

            <p className="text-[10px] leading-5 text-brand-forest/40 dark:text-brand-beige/40">
              Schedule times may occasionally change for workshops,
              holidays, retreats, or special sessions. Please confirm
              your session before attending.
            </p>
          </div>
        </section>

        {/* =====================================================
            PRIVATE SESSIONS CTA
        ====================================================== */}

        <section className="border-t border-brand-sage/10 bg-brand-beige/20 dark:bg-brand-forest/10">

          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">

            <div className="relative overflow-hidden rounded-[2rem] bg-brand-forest px-7 py-12 text-center text-brand-offwhite sm:px-12 sm:py-16">

              {/* Decorative elements */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-brand-sage/15"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-brand-sage/10"
              />

              <div className="relative z-10 mx-auto max-w-2xl">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-sage/20 bg-brand-sage/10 text-brand-sage">
                  <FiCalendar className="h-5 w-5" />
                </div>

                <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-sage">
                  Personal guidance
                </p>

                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Need a schedule that works around you?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-brand-offwhite/60">
                  We also offer personalized sessions for yoga therapy,
                  individual practice, and specialized wellness needs.
                  Speak with our team to discuss a suitable time.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                  <Link to="/contact">
                    <Button
                      variant="primary"
                      className="min-w-[170px]"
                    >
                      Contact the Center
                      <FiArrowRight className="ml-2 inline-block" />
                    </Button>
                  </Link>

                  <Link
                    to="/classes"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/75 transition-colors hover:border-brand-sage/40 hover:text-white"
                  >
                    Explore Classes
                    <FiArrowRight className="h-3.5 w-3.5" />
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}