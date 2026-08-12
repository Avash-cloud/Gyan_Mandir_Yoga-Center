import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiLotus, GiMeditation, GiTreeBranch } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import JoinClassModal from "../components/JoinClassModal";
import { classesData, testimonialsData, localImages } from "../data/yogaData";

// Animation configs
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");

  const handleOpenModal = (classId) => {
    setSelectedClassId(classId);
    setModalOpen(true);
  };

  const featuredClasses = classesData.slice(0, 3);
  const featuredTestimonials = testimonialsData.slice(0, 3);

  return (
    <>
      <SEO 
        title="Pure Classical Yoga & Meditation" 
        description="Experience traditional Hatha, Ashtanga, Pranayama, and guided meditation in a calm, nature-inspired environment at Gyan Mandir."
      />

      <div className="space-y-32 pb-24">
        
        {/* HERO SECTION */}
        <section 
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
          style={{ backgroundImage: `url("${localImages.hero}")` }}
        >
          {/* Calm overlay for readability */}
          <div className="absolute inset-0 bg-brand-offwhite/90 dark:bg-brand-forest/90 z-0" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-beige border border-brand-sage/40 text-brand-forest text-xs font-semibold tracking-wider uppercase"
            >
              <GiLotus className="w-5 h-5 text-brand-forest" />
              <span>Gyan Mandir Yog Center</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-brand-forest dark:text-brand-offwhite leading-[1.15] tracking-tight"
            >
              Quiet Your Mind, <br />
              <span className="text-brand-sage italic font-medium">
                Restore Your Balance
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-base sm:text-lg text-brand-forest/80 dark:text-brand-beige/80 max-w-xl mx-auto leading-relaxed font-light"
            >
              Step into a calm, nature-inspired sanctuary. Practice classical yoga, breathing, and meditation designed for physical recovery and inner peace.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button onClick={() => handleOpenModal("beginner-yoga")} variant="primary">
                Join Our Classes
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-offwhite">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ABOUT INTRODUCTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest dark:text-brand-offwhite leading-tight">
                Authentic Practice for Wellness and Balance
              </h2>
              <p className="text-brand-forest/80 dark:text-brand-beige/80 leading-relaxed text-sm sm:text-base font-light">
                Gyan Mandir Yog Center is dedicated to physical, mental, and spiritual well-being through classical, authentic yoga practices. We provide a space designed for complete rejuvenation, using natural textures, soft tones, and plenty of breathing room.
              </p>
              <p className="text-brand-forest/80 dark:text-brand-beige/80 leading-relaxed text-sm sm:text-base font-light">
                Our classes emphasize safety, anatomical alignment, and a calm mental state, guiding you step-by-step from foundational stretches to deep meditation.
              </p>
              <div className="pt-2">
                <Link to="/about">
                  <Button variant="outline" className="px-5 py-2.5">
                    Read Our Full Philosophy
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-3xl overflow-hidden shadow-sm border border-brand-sage/20"
            >
              <img
                src={localImages.about}
                alt="Peaceful yoga meditation"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* BENEFITS SUMMARY */}
        <section className="bg-brand-beige/50 dark:bg-brand-forest/10 py-24 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest dark:text-brand-offwhite">
                Cultivate Daily Serenity
              </h2>
              <p className="text-brand-forest/70 dark:text-brand-beige/70 text-sm">
                Quiet the background noise of life and experience organic wellness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Mindful Balance",
                  desc: "Align your physical movements with breath control to quiet down the nervous system and decrease daily cortisol.",
                  icon: GiMeditation
                },
                {
                  title: "Natural Space",
                  desc: "Practice in a quiet retreat styled with organic green tones, soft lighting, and natural ventilation.",
                  icon: GiTreeBranch
                },
                {
                  title: "Traditional Lineages",
                  desc: "Learn from lineages focused on safety and restoration, making yoga accessible to elders, kids, and therapists alike.",
                  icon: GiLotus
                }
              ].map((benefit, idx) => (
                <Card key={idx} className="bg-brand-offwhite dark:bg-brand-forest/20 p-8 space-y-4 border border-brand-sage/10 text-center flex flex-col items-center">
                  <div className="p-3 bg-brand-beige dark:bg-brand-forest text-brand-forest dark:text-brand-sage rounded-2xl">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-forest dark:text-brand-offwhite font-serif">
                    {benefit.title}
                  </h3>
                  <p className="text-brand-forest/70 dark:text-brand-beige/70 text-sm leading-relaxed font-light">
                    {benefit.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED CLASSES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest dark:text-brand-offwhite">
                Featured Classes
              </h2>
              <p className="text-brand-forest/75 dark:text-brand-beige/75 text-sm">
                Beginner or advanced, select from our programs tailored to your state of health.
              </p>
            </div>
            <Link to="/classes">
              <Button variant="outline" className="group text-xs">
                View All Programs <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredClasses.map((cls) => {
              const Icon = cls.icon;
              return (
                <Card key={cls.id} className="flex flex-col justify-between h-full bg-brand-offwhite dark:bg-brand-forest/20 border border-brand-sage/10 p-5 rounded-3xl">
                  <div className="space-y-4">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-full h-44 object-cover rounded-2xl"
                    />
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-brand-beige dark:bg-brand-forest/40 text-brand-forest dark:text-brand-sage rounded-xl">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 bg-brand-sage/20 text-brand-forest dark:text-brand-sage rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {cls.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-brand-forest dark:text-brand-offwhite">
                      {cls.title}
                    </h3>
                    <p className="text-brand-forest/75 dark:text-brand-beige/75 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {cls.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-sage/10 mt-6 flex items-center justify-between">
                    <span className="text-xs font-medium text-brand-forest/60 dark:text-brand-beige/60">
                      {cls.duration}
                    </span>
                    <Button onClick={() => handleOpenModal(cls.id)} className="px-4 py-2 text-xs">
                      Join Now
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* TESTIMONIAL PREVIEW */}
        <section className="bg-brand-beige/30 py-24 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest dark:text-brand-offwhite">
                Feedback from Our Community
              </h2>
              <p className="text-brand-forest/70 dark:text-brand-beige/70 text-sm">
                Read about real experiences of peace and flexibility. We omit profile pictures to respect student privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((t) => (
                <Card key={t.id} className="bg-brand-offwhite dark:bg-brand-forest/20 p-8 border border-brand-sage/10 rounded-3xl flex flex-col justify-between h-full">
                  <p className="text-brand-forest/75 dark:text-brand-beige/75 italic text-sm leading-relaxed font-light">
                    "{t.review}"
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-brand-sage/15 mt-6">
                    <div>
                      <h4 className="font-bold text-brand-forest dark:text-brand-offwhite font-serif text-xs uppercase tracking-wider">
                        {t.name}
                      </h4>
                      <p className="text-[10px] text-brand-forest/50 dark:text-brand-beige/50">
                        {t.role}
                      </p>
                    </div>
                    <div className="flex text-brand-sage text-xs">
                      {"★".repeat(t.rating)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link to="/testimonials">
                <Button variant="outline">View All Reviews</Button>
              </Link>
            </div>
          </div>
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
