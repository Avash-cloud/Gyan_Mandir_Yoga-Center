import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import JoinClassModal from "../components/JoinClassModal";
import { classesData } from "../data/yogaData";

export default function Classes() {
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");

  const handleOpenModal = (classId) => {
    setSelectedClassId(classId);
    setModalOpen(true);
  };

  const categories = ["All", "Beginner", "Intermediate", "Advanced", "All Levels", "Gentle"];

  const filteredClasses = filter === "All"
    ? classesData
    : classesData.filter((cls) => cls.difficulty.toLowerCase() === filter.toLowerCase());

  return (
    <>
      <SEO 
        title="Our Specialized Yoga Classes" 
        description="Choose from our 9 specialized yoga programs including Beginner Yoga, Advanced Vinyasa, Pranayama Breathwork, Meditation, Women's, Kids, and Therapeutic Yoga."
      />

      <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Our Yoga & Wellness Classes
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Quiet the mind and align the body. Choose from our 9 specialized programs, each designed with traditional alignment and health restoration in mind.
          </p>
        </section>

        {/* Category Filters */}
        <section className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? "bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-forest shadow-sm"
                  : "bg-brand-offwhite text-brand-forest border border-brand-sage/20 hover:border-brand-forest dark:bg-brand-forest/30 dark:text-brand-beige dark:border-brand-sage/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Classes Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((cls) => {
              const IconComponent = cls.icon;
              return (
                <motion.div
                  key={cls.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="flex flex-col justify-between h-full bg-brand-offwhite dark:bg-brand-forest/20 border border-brand-sage/15 rounded-3xl p-5">
                    <div className="space-y-5">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        className="w-full h-48 object-cover rounded-2xl border border-brand-sage/10"
                      />

                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-brand-beige dark:bg-brand-forest/40 text-brand-forest dark:text-brand-sage rounded-xl">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-0.5 bg-brand-sage/20 text-brand-forest dark:text-brand-sage rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {cls.difficulty}
                        </span>
                      </div>

                      {/* Header Info */}
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-brand-forest dark:text-brand-offwhite leading-tight">
                          {cls.title}
                        </h3>
                        <p className="text-xs text-brand-sage dark:text-brand-olive font-semibold mt-1">
                          Duration: {cls.duration}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm leading-relaxed font-light">
                        {cls.description}
                      </p>

                      {/* Benefits list */}
                      <div className="space-y-2 pt-3 border-t border-brand-sage/15">
                        <h4 className="text-[10px] uppercase tracking-wider font-semibold text-brand-forest/50 dark:text-brand-beige/50">
                          Key Benefits:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-brand-forest/80 dark:text-brand-beige/85">
                          {cls.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 font-light">
                              <span className="text-brand-sage dark:text-brand-olive mt-0.5 shrink-0">✦</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-6 border-t border-brand-sage/15 mt-6 space-y-4">
                      <div className="text-xs text-brand-forest/60 dark:text-brand-beige/65 font-medium italic">
                        <strong>Instructor:</strong> {cls.instructor} <br />
                        <strong>Schedule:</strong> {cls.schedule}
                      </div>
                      <Button onClick={() => handleOpenModal(cls.id)} className="w-full">
                        Join Class
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

      </div>

      {/* Class Join Form Modal */}
      <JoinClassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedClassId={selectedClassId}
      />
    </>
  );
}
