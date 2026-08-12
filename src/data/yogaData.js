import { 
  GiMeditation, GiLotus, GiHeartBeats, GiWaterDrop, 
  GiRibbonShield, GiGymBag, GiInnerSelf, GiLaurels, GiSprout 
} from "react-icons/gi";

// Local image imports
import img1 from "../assets/images/image 1.jpg";
import img2 from "../assets/images/image 2.jpg";
import img3 from "../assets/images/image 3.jpg";
import img4 from "../assets/images/image 4.jpg";
import img5 from "../assets/images/image 5.jpg";
import img6 from "../assets/images/image 6.jpg";
import img7 from "../assets/images/image 7.jpg";
import img8 from "../assets/images/image 8.jpg";

export const localImages = {
  hero: img3,
  about: img2,
  instructorDeepak: img1,
  contactBg: img7,
  gallery: [img1, img2, img3, img4, img5, img6, img7, img8]
};

export const classesData = [
  {
    id: "beginner-yoga",
    title: "Beginner Yoga",
    icon: GiLotus,
    image: img4,
    description: "Perfect for newcomers. Focuses on foundational postures (asanas), breathing techniques (pranayama), and safe alignment to build strength and flexibility.",
    duration: "60 Minutes",
    difficulty: "Beginner",
    schedule: "Mon, Wed, Fri | Morning & Evening",
    instructor: "Deepak Mama",
    benefits: [
      "Improves basic body flexibility and strength",
      "Reduces physical stiffness and back strain",
      "Teaches correct breathing and conscious relaxation"
    ]
  },
  {
    id: "advanced-yoga",
    title: "Advanced Yoga",
    icon: GiLaurels,
    image: img5,
    description: "An intensive practice featuring advanced asanas, core stability, arm balances, inversions, and deeper breath control.",
    duration: "75 Minutes",
    difficulty: "Advanced",
    schedule: "Tue, Thu, Sat | Morning & Evening",
    instructor: "Deepak Mama",
    benefits: [
      "Builds extreme core strength and balance",
      "Deepens mental discipline and stamina",
      "Explores advanced bandhas and mudras"
    ]
  },
  {
    id: "pranayama",
    title: "Pranayama (Breathwork)",
    icon: GiWaterDrop,
    image: img6,
    description: "Dedicated to the ancient science of vital breath regulation. Learn techniques to purify and energize the nervous system.",
    duration: "45 Minutes",
    difficulty: "All Levels",
    schedule: "Mon, Wed, Fri | Morning",
    instructor: "Instructor Name",
    benefits: [
      "Increases lung capacity and oxygenates the blood",
      "Calms the sympathetic nervous system",
      "Balances left and right hemispheres of the brain"
    ]
  },
  {
    id: "meditation",
    title: "Meditation & Mindfulness",
    icon: GiMeditation,
    image: img7,
    description: "Cultivate inner stillness and mental clarity. Includes guided meditation, mantra chanting, and yoga nidra to calm a restless mind.",
    duration: "45 Minutes",
    difficulty: "All Levels",
    schedule: "Tue, Thu, Sun | Evening",
    instructor: "Deepak Mama",
    benefits: [
      "Significantly lowers stress and cortisol levels",
      "Enhances focus and emotional resilience",
      "Promotes better sleep quality"
    ]
  },
  {
    id: "weight-loss-yoga",
    title: "Weight Loss & Core Yoga",
    icon: GiGymBag,
    image: img8,
    description: "A dynamic Vinyasa flow designed to boost metabolism, burn calories, tone muscles, and strengthen the core.",
    duration: "60 Minutes",
    difficulty: "Intermediate",
    schedule: "Mon, Tue, Thu | Evening",
    instructor: "Instructor Name",
    benefits: [
      "Stimulates metabolism and aids healthy weight loss",
      "Tones abdominal muscles, glutes, and thighs",
      "Improves cardiovascular endurance"
    ]
  },
  {
    id: "womens-yoga",
    title: "Women's Wellness Yoga",
    icon: GiInnerSelf,
    image: img4,
    description: "Tailored yoga sequences focusing on female hormonal balance, pelvic strength, and easing monthly cycles.",
    duration: "60 Minutes",
    difficulty: "All Levels",
    schedule: "Wed, Fri | Mid-day",
    instructor: "Instructor Name",
    benefits: [
      "Regulates hormonal cycles and relieves discomfort",
      "Strengthens pelvic floor muscles",
      "Provides relief from lower back pressure"
    ]
  },
  {
    id: "senior-citizen-yoga",
    title: "Senior Gentle Yoga",
    icon: GiRibbonShield,
    image: img5,
    description: "Slow-paced, gentle sessions incorporating chair support, joints relaxation, and slow stretching to ensure safety and comfort.",
    duration: "50 Minutes",
    difficulty: "Gentle",
    schedule: "Mon, Wed, Fri | Morning",
    instructor: "Deepak Mama",
    benefits: [
      "Improves joint mobility and eases stiffness",
      "Enhances blood circulation and balance",
      "Provides a safe environment for elders"
    ]
  },
  {
    id: "kids-yoga",
    title: "Kids Creative Yoga",
    icon: GiSprout,
    image: img6,
    description: "Fun, game-oriented sessions utilizing animal-based poses and storytelling to channel children's energy and improve focus.",
    duration: "45 Minutes",
    difficulty: "Beginner",
    schedule: "Sat, Sun | Afternoon",
    instructor: "Instructor Name",
    benefits: [
      "Develops healthy posture and physical coordination",
      "Improves attention span and creative thinking",
      "Builds self-esteem and collaboration skills"
    ]
  },
  {
    id: "yoga-therapy",
    title: "Therapeutic Yoga",
    icon: GiHeartBeats,
    image: img8,
    description: "Individualized posture adjustments and gentle breathing techniques focused on rehabilitation for chronic back pain or injury recovery.",
    duration: "60 Minutes",
    difficulty: "All Levels",
    schedule: "Tue, Thu | Morning",
    instructor: "Deepak Mama",
    benefits: [
      "Relieves chronic lumbar, neck, and shoulder strain",
      "Supports physical recovery from muscle injuries",
      "Offers personalized guidance under therapeutic care"
    ]
  }
];

export const scheduleData = [
  { time: "06:00 AM - 06:45 AM", monday: "Pranayama", tuesday: "Advanced Yoga", wednesday: "Pranayama", thursday: "Advanced Yoga", friday: "Pranayama", saturday: "Advanced Yoga", sunday: "Rest" },
  { time: "07:00 AM - 08:00 AM", monday: "Beginner Yoga", tuesday: "Therapeutic Yoga", wednesday: "Beginner Yoga", thursday: "Therapeutic Yoga", friday: "Beginner Yoga", saturday: "Special Workshop", sunday: "Rest" },
  { time: "08:30 AM - 09:20 AM", monday: "Senior Gentle Yoga", tuesday: "Personal Therapy", wednesday: "Senior Gentle Yoga", thursday: "Personal Therapy", friday: "Senior Gentle Yoga", saturday: "Spiritual Satsang", sunday: "Rest" },
  { time: "10:00 AM - 11:00 AM", monday: "Rest", tuesday: "Rest", wednesday: "Women's Yoga", thursday: "Rest", friday: "Women's Yoga", saturday: "Teacher Training", sunday: "Rest" },
  { time: "04:00 PM - 04:45 PM", monday: "Rest", tuesday: "Rest", wednesday: "Rest", thursday: "Rest", friday: "Rest", saturday: "Kids Yoga", sunday: "Kids Yoga" },
  { time: "05:30 PM - 06:30 PM", monday: "Beginner Yoga", tuesday: "Weight Loss Yoga", wednesday: "Beginner Yoga", thursday: "Weight Loss Yoga", friday: "Beginner Yoga", saturday: "Rest", sunday: "Rest" },
  { time: "06:30 PM - 07:30 PM", monday: "Weight Loss Yoga", tuesday: "Advanced Yoga", wednesday: "Weight Loss Yoga", thursday: "Advanced Yoga", friday: "Weight Loss Yoga", saturday: "Advanced Yoga", sunday: "Rest" },
  { time: "07:30 PM - 08:15 PM", monday: "Rest", tuesday: "Meditation", wednesday: "Rest", thursday: "Meditation", friday: "Rest", saturday: "Rest", sunday: "Meditation" }
];

export const testimonialsData = [
  {
    id: 1,
    name: "Student Name",
    role: "Yoga Practitioner",
    rating: 5,
    review: "Joining the Beginner Yoga and Pranayama classes changed my life. The focus on posture and relaxation cured my chronic stiffness. The environment is extremely patient and welcoming."
  },
  {
    id: 2,
    name: "Student Name",
    role: "Gentle Yoga Member",
    rating: 5,
    review: "The Senior Gentle Yoga sessions are fantastic. The instructors design them so we can use chair support. My joint mobility has improved significantly, and I feel energized."
  },
  {
    id: 3,
    name: "Student Name",
    role: "Meditation Practitioner",
    rating: 5,
    review: "The meditation and breathing classes here act as my sanctuary. I've learned breathing tools that help me stay centered during stressful workdays. Truly a wellness goldmine."
  }
];

export const blogData = [
  {
    id: "benefits-of-yoga",
    title: "Benefits of Yoga",
    excerpt: "Discover how just 20 minutes of daily yoga can boost physical flexibility, mental health, and emotional balance.",
    category: "Yoga",
    readTime: "6 min read",
    date: "July 01, 2026",
    image: img4,
    content: `Yoga is not just a form of physical exercise; it is an ancient system of holistic wellness designed to harmonize the body, mind, and spirit. In our fast-paced lives, dedicating even 20 minutes daily to yoga can trigger profound transformations.
    
    1. **Enhanced Flexibility and Balance**: Chronic sitting causes muscles to stiffen. Yoga gently stretches muscles, lubricates joint capsules, and strengthens stabilizing muscles.
    
    2. **Muscle Toning and Strength**: Unlike training which isolates muscle groups, yoga poses utilize your own body weight to engage multiple systems.
    
    3. **Natural Stress Reduction**: Practicing asanas combined with conscious breathing activates the parasympathetic nervous system (rest and digest).`
  },
  {
    id: "importance-of-meditation",
    title: "Importance of Meditation",
    excerpt: "Explore the changes that occur during regular meditation and how it reduces anxiety, improves attention, and regulates emotions.",
    category: "Meditation",
    readTime: "5 min read",
    date: "June 25, 2026",
    image: img5,
    content: `For centuries, yogis have spoken of meditation as the gateway to supreme peace. Today, modern science validates these claims, proving that meditation physically restructures brain regions responsible for stress.
    
    1. **Shrinks the Fear Center**: Mindfulness meditation decreases density in the amygdala, lessening feelings of threat and anxiety.
    
    2. **Thickens the Focus Center**: The prefrontal cortex regulates decision-making and emotional balance, which expands through meditation.
    
    3. **Deactivates Wandering Loops**: Meditation quietens default mode networks, keeping you grounded.`
  },
  {
    id: "healthy-lifestyle-tips",
    title: "Healthy Lifestyle Tips",
    excerpt: "Revitalize your health by incorporating traditional daily habits into your current busy routine.",
    category: "Workshops",
    readTime: "8 min read",
    date: "June 18, 2026",
    image: img6,
    content: `In Yoga, health is defined as the perfect equilibrium of bodily energies, mental clarity, and proper metabolic function. This balance is maintained through simple daily habits.
    
    1. **Early Rise**: Waking up near sunrise exposes you to clean atmospheric energy.
    
    2. **Mindful Ingestion**: Fill half of your stomach with wholesome food, one-quarter with clean water, and leave one-quarter empty for the movement of air.
    
    3. **Daily Reflection**: Take 10 minutes at sunset to scan your thoughts and release anxieties.`
  },
  {
    id: "breathing-exercises",
    title: "Breathing Exercises",
    excerpt: "Need quick relief from stress? These simple exercises can be performed at your desk to calm your nerves in minutes.",
    category: "Events",
    readTime: "4 min read",
    date: "June 10, 2026",
    image: img7,
    content: `Breath is the bridge between your physical body and mind. When you are stressed, your breath becomes shallow. By changing your breathing pattern, you can signal safety to your nervous system.
    
    1. **Alternate Nostril Breathing (Nadi Shodhana)**: Balances energy hemispheres.
    
    2. **Box Breathing**: Inhale, hold, exhale, hold for 4 seconds each.
    
    3. **Humming Bee Breath (Bhramari)**: Vibration calms the brain and releases insomnia.`
  }
];

export const faqData = [
  {
    id: "beginner-join",
    question: "Can beginners join?",
    answer: "Absolutely! Most of our classes are friendly to absolute beginners. We have dedicated sessions where postures are broken down step-by-step."
  },
  {
    id: "what-to-bring",
    question: "What should I bring?",
    answer: "Please bring a reusable water bottle, a small towel, and your personal yoga mat. Comfortable, stretchy athletic clothing is recommended."
  },
  {
    id: "age-limit",
    question: "Is there an age limit?",
    answer: "Yoga is for everyone! We have students ranging from kids to senior citizens. Our instructors customize exercises to ensure comfort."
  },
  {
    id: "online-classes",
    question: "Do you offer online classes?",
    answer: "Yes, we run interactive, live-streamed online yoga and meditation sessions so you can join from the comfort of your home."
  },
  {
    id: "trial-classes",
    question: "Trial classes?",
    answer: "Yes! We offer a single complimentary trial class to all new students so you can experience the space and meet our lead instructor."
  },
  {
    id: "membership-fees",
    question: "Fees?",
    answer: "We offer flexible membership plans including drop-in classes, multi-class packs, and unlimited monthly passes. Details are available at our front desk."
  }
];

export const galleryData = [
  { id: 1, category: "Yoga", title: "Asana Practice", image: img1 },
  { id: 2, category: "Meditation", title: "Dhyana Meditation", image: img2 },
  { id: 3, category: "Events", title: "Community Gathering", image: img3 },
  { id: 4, category: "International Yoga Day", title: "Sunrise Mass Yoga", image: img4 },
  { id: 5, category: "Workshops", title: "Alignment Practice", image: img5 },
  { id: 6, category: "Yoga", title: "Vinyasa Core Flow", image: img6 },
  { id: 7, category: "Meditation", title: "Sunset Mindful Session", image: img7 },
  { id: 8, category: "Events", title: "International Celebration", image: img8 }
];
