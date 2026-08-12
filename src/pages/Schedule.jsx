import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiRepeat } from "react-icons/fi";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import { scheduleData } from "../data/yogaData";

export default function Schedule() {
  const [shiftFilter, setShiftFilter] = useState("all");

  const filteredSchedule = scheduleData.filter((row) => {
    const isEvening = row.time.includes("PM");
    if (shiftFilter === "morning") return !isEvening;
    if (shiftFilter === "evening") return isEvening;
    return true;
  });

  return (
    <>
      <SEO 
        title="Class Schedule & Timetable" 
        description="View our complete weekly yoga and meditation schedule. Find morning and evening classes for Hatha, Vinyasa, Pranayama, and seniors."
      />

      <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Class Schedule & Timetable
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Plan your wellness routine around our morning or evening batches. Join us in-person or live-stream from home.
          </p>
        </section>

        {/* Shift Filter Controls */}
        <section className="flex items-center justify-center gap-3">
          {[
            { id: "all", label: "Full Day" },
            { id: "morning", label: "Morning Shifts" },
            { id: "evening", label: "Evening Shifts" }
          ].map((shift) => (
            <button
              key={shift.id}
              onClick={() => setShiftFilter(shift.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                shiftFilter === shift.id
                  ? "bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest"
                  : "bg-brand-offwhite text-brand-forest border border-brand-sage/20 hover:border-brand-forest dark:bg-brand-forest/30 dark:text-brand-beige dark:border-brand-sage/10"
              }`}
            >
              {shift.label}
            </button>
          ))}
        </section>

        {/* Timetable Board */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 justify-center text-xs font-semibold text-brand-sage lg:hidden">
            <FiRepeat className="w-4 h-4 animate-spin" />
            <span>Swipe horizontally to view the full timetable</span>
          </div>

          <div className="w-full overflow-x-auto rounded-3xl border border-brand-sage/20 shadow-sm">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-brand-forest text-brand-offwhite border-b border-brand-sage/20">
                  <th className="py-4 px-6 font-serif text-sm font-semibold tracking-wider flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-brand-sage" /> Time Slot
                  </th>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <th key={day} className="py-4 px-6 font-serif text-sm font-semibold tracking-wider">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sage/10 bg-brand-offwhite dark:bg-brand-forest/20 text-brand-forest dark:text-brand-offwhite">
                {filteredSchedule.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-brand-sage/10 dark:hover:bg-brand-forest/40 transition-colors"
                  >
                    <td className="py-5 px-6 font-semibold text-sm text-brand-forest dark:text-brand-sage bg-brand-beige/30 dark:bg-brand-forest/30">
                      {row.time}
                    </td>
                    {[
                      { key: "monday", label: row.monday },
                      { key: "tuesday", label: row.tuesday },
                      { key: "wednesday", label: row.wednesday },
                      { key: "thursday", label: row.thursday },
                      { key: "friday", label: row.friday },
                      { key: "saturday", label: row.saturday },
                      { key: "sunday", label: row.sunday }
                    ].map((cell, i) => {
                      const isRest = cell.label === "Rest";
                      const isSpecial = cell.label.includes("Workshop") || cell.label.includes("Satsang") || cell.label.includes("Training");
                      return (
                        <td 
                          key={i} 
                          className={`py-5 px-6 text-sm font-medium ${
                            isRest 
                              ? "text-brand-forest/40 dark:text-brand-beige/40 font-normal italic" 
                              : isSpecial
                              ? "text-brand-forest font-bold underline decoration-brand-sage decoration-2"
                              : "text-brand-forest/80 dark:text-brand-offwhite/85"
                          }`}
                        >
                          {cell.label}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Timetable Action Block */}
        <section className="bg-brand-beige/40 dark:bg-brand-forest/10 p-8 rounded-3xl border border-brand-sage/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-brand-forest dark:text-brand-offwhite flex items-center gap-2">
              <FiCalendar className="w-5 h-5 text-brand-sage" /> Looking for Personal Coaching?
            </h3>
            <p className="text-brand-forest/70 dark:text-brand-beige/70 text-xs sm:text-sm font-light max-w-xl">
              We host customized private sessions (Yoga Therapy or Corporate Stress Relief) at your office or within our halls outside regular class hours.
            </p>
          </div>
          <Link to="/contact">
            <Button variant="primary">Consult Deepak Mama</Button>
          </Link>
        </section>

      </div>
    </>
  );
}
