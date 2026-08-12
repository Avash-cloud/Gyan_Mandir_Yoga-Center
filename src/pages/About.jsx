import { motion } from "framer-motion";
import { GiLotus, GiMeditation, GiMountainRoad } from "react-icons/gi";
import SEO from "../components/SEO";
import Card from "../components/ui/Card";
import { localImages } from "../data/yogaData";

const timelineEvents = [
  {
    year: "2014",
    title: "Foundation of Gyan Mandir",
    desc: "Established with the core goal of preserving authentic, traditional yoga methodologies in Kathmandu."
  },
  {
    year: "2018",
    title: "Eco-Friendly Space",
    desc: "Moved to our calm lane in Samakhusi, designing spaces with natural wood and open air flow."
  },
  {
    year: "2022",
    title: "Therapeutic Adaptations",
    desc: "Expanded into specialized therapeutic yoga to support students recovering from back pain and respiratory strain."
  },
  {
    year: "2026",
    title: "A Premium Wellness Retreat",
    desc: "Continues to serve as a trustworthy sanctuary for classical wellness and stress relief."
  }
];

const instructors = [
  {
    name: "Deepak Mama",
    role: "Lead Yoga Instructor",
    certs: "Authentic Master of Classical Yoga lineages",
    bio: "Deepak Mama guides students through safe alignments, breath control (pranayama), and meditation. His traditional approach fosters deep recovery and mental peace.",
    image: localImages.instructorDeepak,
    isLead: true
  },
  {
    name: "Instructor Name",
    role: "Yoga Instructor",
    certs: "Certifications Placeholder",
    bio: "Placeholder description for additional instructors. This content will be customized with credentials and background details later.",
    image: null, // Gracefully omitted to display a clean placeholder area
    isLead: false
  },
  {
    name: "Instructor Name",
    role: "Meditation Guide",
    certs: "Certifications Placeholder",
    bio: "Placeholder description for additional instructors. This content will be customized with credentials and background details later.",
    image: null,
    isLead: false
  }
];

export default function About() {
  return (
    <>
      <SEO 
        title="About Our Center & Deepak Mama" 
        description="Learn about the legacy of Gyan Mandir Yog Center and our lead yoga instructor, Deepak Mama."
      />

      <div className="space-y-32 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Our Story & Legacy
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Gyan Mandir Yog Center is dedicated to physical, mental, and spiritual well-being through authentic classical practices. We maintain a calm, nature-inspired environment that respects the traditional lineages of yoga.
          </p>
        </section>

        {/* Core Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "To deliver classical yoga safely and transparently, focusing on physical alignment, stress relief, and breathing regulation.",
              icon: GiLotus
            },
            {
              title: "Our Vision",
              desc: "To foster a trustworthy retreat sanctuary that balances daily wellness with traditional spiritual lineages.",
              icon: GiMountainRoad
            },
            {
              title: "Our Philosophy",
              desc: "Yoga is a complete path of self-care. It integrates physical poses, breathing exercises, and silence to quiet the mind.",
              icon: GiMeditation
            }
          ].map((item, idx) => (
            <Card key={idx} className="bg-brand-offwhite dark:bg-brand-forest/20 text-center p-8 border border-brand-sage/10 rounded-3xl flex flex-col items-center">
              <div className="p-3 bg-brand-beige dark:bg-brand-forest text-brand-forest dark:text-brand-sage rounded-2xl mb-4">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-forest dark:text-brand-offwhite">
                {item.title}
              </h3>
              <p className="text-brand-forest/70 dark:text-brand-beige/70 text-xs sm:text-sm leading-relaxed mt-2 font-light">
                {item.desc}
              </p>
            </Card>
          ))}
        </section>

        {/* Space Concept */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-brand-beige/35 dark:bg-brand-forest/10 p-8 sm:p-12 rounded-3xl border border-brand-sage/10 transition-colors">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-brand-forest dark:text-brand-offwhite">
              The Peaceful Sanctuary
            </h2>
            <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
              Our spaces are built to feel like entering a silent wellness retreat. We prioritize clean wooden textures, soft sand and sage green tones, and natural airflow. The absence of digital distractions makes it a true sanctuary.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-sm">
            <img
              src={localImages.about}
              alt="Yoga session in natural light"
              className="w-full h-80 object-cover"
            />
          </div>
        </section>

        {/* INSTRUCTORS SECTION */}
        <section className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-brand-forest dark:text-brand-offwhite">
              Our Instructors
            </h2>
            <p className="text-brand-forest/70 dark:text-brand-beige/70 text-sm">
              Deepak Mama leads the yoga programs, supported by qualified instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((ins, idx) => (
              <Card key={idx} className="bg-brand-offwhite dark:bg-brand-forest/20 p-6 border border-brand-sage/10 rounded-3xl flex flex-col justify-between h-full">
                <div className="space-y-4">
                  {ins.image ? (
                    <img
                      src={ins.image}
                      alt={ins.name}
                      className="w-full h-64 object-cover rounded-2xl border border-brand-sage/10"
                    />
                  ) : (
                    /* Clean Placeholder Area with comment */
                    <div className="w-full h-64 bg-brand-beige/60 dark:bg-brand-forest/40 border-2 border-dashed border-brand-sage/30 rounded-2xl flex flex-col items-center justify-center text-center p-6">
                      {/* COMMENT: Replace this area with real photo of additional instructors when available */}
                      <span className="text-xs uppercase tracking-widest text-brand-forest/50 dark:text-brand-beige/50 font-semibold">
                        Instructor Photo Placeholder
                      </span>
                      <span className="text-[10px] text-brand-forest/40 dark:text-brand-beige/40 mt-1">
                        (Upload photo to src/assets/images/)
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-bold font-serif text-xl text-brand-forest dark:text-brand-offwhite leading-tight">
                      {ins.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-sage dark:text-brand-olive mt-1">
                      {ins.role}
                    </p>
                  </div>
                  <p className="text-brand-forest/60 dark:text-brand-beige/60 text-xs italic leading-tight">
                    <strong>Credentials:</strong> {ins.certs}
                  </p>
                  <p className="text-brand-forest/80 dark:text-brand-beige/80 text-xs sm:text-sm leading-relaxed font-light">
                    {ins.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-brand-forest dark:text-brand-offwhite">
              Our Timeline
            </h2>
            <p className="text-brand-forest/70 dark:text-brand-beige/70 text-sm">
              The steady growth of our classical yoga community.
            </p>
          </div>

          <div className="relative border-l border-brand-sage ml-4 sm:ml-32 space-y-10">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-10">
                <div className="absolute right-full mr-10 top-0.5 hidden sm:block">
                  <span className="font-serif text-xl font-bold text-brand-forest dark:text-brand-sage">
                    {evt.year}
                  </span>
                </div>
                <span className="absolute -left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-brand-sage border-2 border-brand-offwhite" />
                <span className="font-serif text-base font-bold text-brand-forest dark:text-brand-sage sm:hidden block mb-1">
                  {evt.year}
                </span>
                <div className="bg-brand-offwhite dark:bg-brand-forest/20 p-6 rounded-2xl border border-brand-sage/10 shadow-sm max-w-xl">
                  <h3 className="font-bold text-brand-forest dark:text-brand-offwhite font-serif text-base">
                    {evt.title}
                  </h3>
                  <p className="text-brand-forest/70 dark:text-brand-beige/70 text-xs sm:text-sm leading-relaxed font-light mt-1">
                    {evt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
