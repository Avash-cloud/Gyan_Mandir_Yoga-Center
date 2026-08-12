import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import SEO from "../components/SEO";
import { faqData } from "../data/yogaData";

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions" 
        description="Got questions about classes, schedules, memberships, or dress code? Read our FAQ to learn everything about starting yoga at Gyan Mandir."
      />

      <div className="space-y-16 py-12 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-darkgreen dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about starting your physical recovery and mindfulness practices with us.
          </p>
        </section>

        {/* Accordions */}
        <section className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-base sm:text-lg font-bold text-brand-darkgreen dark:text-white hover:text-brand-emerald dark:hover:text-brand-green cursor-pointer transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="p-1 rounded-full bg-brand-lightgreen dark:bg-zinc-800 text-brand-darkgreen dark:text-brand-green shrink-0 ml-4">
                    {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>

      </div>
    </>
  );
}
