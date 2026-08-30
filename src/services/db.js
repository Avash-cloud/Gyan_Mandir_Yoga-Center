import { createClient } from "@supabase/supabase-js";

import { 
  classesData, 
  scheduleData, 
  testimonialsData, 
  galleryData, 
  localImages 
} from "../data/yogaData";

import { 
  GiMeditation, GiLotus, GiHeartBeats, GiWaterDrop, 
  GiRibbonShield, GiGymBag, GiInnerSelf, GiLaurels, GiSprout 
} from "react-icons/gi";

// Map component icons to string keys for serialization
const getIconName = (iconComponent) => {
  if (iconComponent === GiMeditation) return "GiMeditation";
  if (iconComponent === GiLotus) return "GiLotus";
  if (iconComponent === GiHeartBeats) return "GiHeartBeats";
  if (iconComponent === GiWaterDrop) return "GiWaterDrop";
  if (iconComponent === GiRibbonShield) return "GiRibbonShield";
  if (iconComponent === GiGymBag) return "GiGymBag";
  if (iconComponent === GiInnerSelf) return "GiInnerSelf";
  if (iconComponent === GiLaurels) return "GiLaurels";
  if (iconComponent === GiSprout) return "GiSprout";
  return "GiLotus";
};

// Supabase environment variables detection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// Local storage fallback helpers
const loadTable = (key, defaultVal = []) => {
  const data = localStorage.getItem(`gm_${key}`);
  return data ? JSON.parse(data) : defaultVal;
};

const saveTable = (key, data) => {
  localStorage.setItem(`gm_${key}`, JSON.stringify(data));
};

// Activity logging helper
const logActivity = async (action, details = "") => {
  const admin = localStorage.getItem("gm_current_user") 
    ? JSON.parse(localStorage.getItem("gm_current_user")).username 
    : "System";

  const logData = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    action,
    details,
    admin,
    date: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      await supabase.from("activity_logs").insert([logData]);
    } catch (err) {
      console.error("Failed to log activity to Supabase", err);
    }
  } else {
    const logs = loadTable("activity_logs");
    logs.unshift(logData);
    saveTable("activity_logs", logs);
  }
};

// Seeding standard values into LocalStorage fallback
const seedLocalDB = () => {
  if (!localStorage.getItem("gm_classes")) {
    const formattedClasses = classesData.map(cls => ({
      ...cls,
      icon: getIconName(cls.icon),
      published: true
    }));
    saveTable("classes", formattedClasses);
  }
  if (!localStorage.getItem("gm_schedule")) {
    const formattedSchedule = scheduleData.map((sch, index) => ({
      id: `sch-${index + 1}`,
      ...sch
    }));
    saveTable("schedule", formattedSchedule);
  }
  if (!localStorage.getItem("gm_testimonials")) {
    const formattedTestimonials = testimonialsData.map(test => ({
      ...test,
      approved: true
    }));
    saveTable("testimonials", formattedTestimonials);
  }
  if (!localStorage.getItem("gm_gallery")) {
    const formattedGallery = galleryData.map(pic => ({
      ...pic,
      published: true
    }));
    saveTable("gallery", formattedGallery);
  }
  if (!localStorage.getItem("gm_instructors")) {
    const initialInstructors = [
      {
        id: "deepak-mama",
        name: "Deepak Mama",
        role: "Lead Yoga Instructor",
        credentials: "Classical Yoga Teacher",
        bio: "Deepak is the founder and lead instructor at Gyan Mandir. He has dedicated over 15 years to practicing and teaching classical yoga, with a focus on alignment, breathwork, and individual therapeutic attention.",
        image: localImages.instructorDeepak
      },
      {
        id: "instructor-dummy",
        name: "Instructor Name",
        role: "Yoga & Breathwork Teacher",
        credentials: "Certified Pranayama Instructor",
        bio: "Specialist in ancient breathwork techniques and meditation. Committed to helping practitioners quiet the mind and balance body systems.",
        image: localImages.gallery[5] || ""
      }
    ];
    saveTable("instructors", initialInstructors);
  }
  if (!localStorage.getItem("gm_site_settings")) {
    const initialSettings = {
      about: {
        mission: "To preserve and share authentic classical yoga through disciplined, accessible practice that supports daily well-being.",
        vision: "A welcoming sanctuary where traditional yoga and mindfulness practices meet the needs of modern everyday life, fostering self-awareness and holistic health.",
        philosophy: "We remain grounded in classical yoga traditions. We believe meaningful transformation happens gradually through consistency, awareness, breath, and patient practice.",
        sanctuaryTitle: "Designed for quietness, presence, and practice.",
        sanctuaryDesc: "Our environment is intentionally understated. Natural textures, soft tones, open airflow, and uncluttered spaces help create the feeling of stepping away from the noise of everyday life."
      },
      timeline: [
        { id: "t1", year: "2014", title: "The Beginning", description: "Gyan Mandir was founded with a simple intention: to preserve and share authentic classical yoga through disciplined, accessible practice." },
        { id: "t2", year: "2018", title: "A Space for Stillness", description: "The center established its peaceful home in Samakhusi, creating a natural environment designed around simplicity, airflow, quietness, and mindful practice." },
        { id: "t3", year: "2022", title: "Yoga for Everyday Well-being", description: "Our practice expanded to include carefully adapted therapeutic approaches for students seeking support with mobility, breathing, stress, and physical recovery." },
        { id: "t4", year: "2026", title: "A Living Tradition", description: "Today, Gyan Mandir continues to grow as a welcoming sanctuary where traditional yoga meets the needs of modern everyday life." }
      ],
      contact: {
        address: "Aapgachi, Itahari, Nepal",
        phone: "+977 980-0000000 (Sample Phone)",
        email: "info@gyanmandir.org.np",
        whatsapp: "https://wa.me/9779800000000",
        facebook: "https://www.facebook.com/p/Gyan-Mandir-Yog-Center-100075722265452/",
        googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14256.702951755106!2d87.2712616!3d26.6879196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6b0020d9b74d%3A0xdbddaac3aca39d80!2sGyan%20Mandir%20yog%20Center!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
        directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=26.6879148,87.2738365"
      },
      seo: {
        titleSuffix: "Gyan Mandir Yog Center",
        homeTitle: "Gyan Mandir Yog Center - Pure Classical Yoga & Meditation",
        homeDesc: "Experience pure classical yoga, breathwork (pranayama), and deep meditation at Gyan Mandir Yog Center. Highly certified teachers, calming natural environment, and traditional practices.",
        aboutTitle: "About Gyan Mandir | Our Story, Philosophy & Instructors",
        aboutDesc: "Discover the story, philosophy, teaching approach, and people behind Gyan Mandir, a classical yoga and wellness center in Kathmandu.",
        classesTitle: "Our Classes & Programs | Yoga for All Levels",
        classesDesc: "Explore our diverse yoga and meditation classes including Beginner, Advanced, Pranayama, Therapeutic Yoga, and Senior Gentle Yoga at Gyan Mandir.",
        scheduleTitle: "Class Timetable & Schedule | Plan Your Practice",
        scheduleDesc: "View our weekly schedule of morning and evening batches. Book your class time at Gyan Mandir Yoga Center.",
        galleryTitle: "Photo Gallery | A Glimpse inside our Sanctuary",
        galleryDesc: "Browse images of our peaceful yoga sanctuary, community events, workshops, and International Yoga Day celebrations at Gyan Mandir.",
        contactTitle: "Contact Us | Find the Sanctuary",
        contactDesc: "Get in touch with Gyan Mandir Yog Center. Find our location in Itahari, Nepal, contact numbers, email address, and send us your inquiries."
      }
    };
    saveTable("site_settings", initialSettings);
  }
  if (!localStorage.getItem("gm_admins")) {
    const initialAdmins = [
      { id: "admin-1", username: "admin", passwordHash: "password", role: "Super Admin", createdAt: new Date().toISOString() }
    ];
    saveTable("admins", initialAdmins);
  }
  if (!localStorage.getItem("gm_contact_messages")) {
    const initialMessages = [
      { id: "msg-1", name: "Ram Kumar", email: "ram@example.com", subject: "Class Info", message: "Namaste, I want to inquire about the fees and batch availability for the Beginner Yoga class starting next week. Thank you.", date: new Date(Date.now() - 3600000 * 2).toISOString(), read: false, starred: true, archived: false },
      { id: "msg-2", name: "Sita Kumari", email: "sita@example.com", subject: "Private Yoga Therapy", message: "Hello, do you provide home-based private yoga therapy for lower back pain recovery? I was referred by a friend.", date: new Date(Date.now() - 3600000 * 24).toISOString(), read: true, starred: false, archived: false }
    ];
    saveTable("contact_messages", initialMessages);
  }
  if (!localStorage.getItem("gm_activity_logs")) {
    const initialLogs = [
      { id: "log-1", action: "Database initialized", details: "System successfully seeded default parameters, schedule, classes, and admin user.", admin: "System", date: new Date().toISOString() }
    ];
    saveTable("activity_logs", initialLogs);
  }
  if (!localStorage.getItem("gm_media_library")) {
    const initialMedia = [
      { id: "media-img1", name: "Image 1 - Lead Instructor", url: localImages.instructorDeepak },
      { id: "media-img2", name: "Image 2 - About Page Sanctuary", url: localImages.about },
      { id: "media-img3", name: "Image 3 - Home Page Hero", url: localImages.hero },
      { id: "media-img4", name: "Image 4 - Beginner Yoga Banner", url: localImages.gallery[3] },
      { id: "media-img5", name: "Image 5 - Advanced Yoga Banner", url: localImages.gallery[4] },
      { id: "media-img6", name: "Image 6 - Pranayama Banner", url: localImages.gallery[5] },
      { id: "media-img7", name: "Image 7 - Meditation Banner", url: localImages.gallery[6] },
      { id: "media-img8", name: "Image 8 - Weight Loss Banner", url: localImages.gallery[7] }
    ];
    saveTable("media_library", initialMedia);
  }
};

// Seed Local DB if Supabase is not configured
if (!isSupabaseConfigured) {
  seedLocalDB();
}

// Unified hybrid database service with promises
export const db = {
  isCloud: isSupabaseConfigured,

  classes: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("classes").select("*").order("title", { ascending: true });
        if (error) throw error;
        return data || [];
      }
      return loadTable("classes");
    },
    getById: async (id) => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("classes").select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        return data;
      }
      return loadTable("classes").find(c => c.id === id);
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: data.id || `class-${Date.now()}`
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("classes").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin created class", `Created class "${newItem.title}"`);
        return inserted;
      } else {
        const list = loadTable("classes");
        list.push(newItem);
        saveTable("classes", list);
        await logActivity("Admin created class", `Created class "${newItem.title}"`);
        return newItem;
      }
    },
    update: async (id, data) => {
      if (isSupabaseConfigured) {
        const { data: updated, error } = await supabase.from("classes").update(data).eq("id", id).select().single();
        if (error) throw error;
        await logActivity("Admin edited class", `Updated class details for "${updated.title}"`);
        return updated;
      } else {
        const list = loadTable("classes");
        const index = list.findIndex(c => c.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...data };
        saveTable("classes", list);
        await logActivity("Admin edited class", `Updated class "${list[index].title}"`);
        return list[index];
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("classes").select("title").eq("id", id).maybeSingle();
        const { error } = await supabase.from("classes").delete().eq("id", id);
        if (error) throw error;
        await logActivity("Admin deleted class", `Deleted class "${record?.title || id}"`);
        return true;
      } else {
        const list = loadTable("classes");
        const item = list.find(c => c.id === id);
        const filtered = list.filter(c => c.id !== id);
        saveTable("classes", filtered);
        if (item) await logActivity("Admin deleted class", `Deleted class "${item.title}"`);
        return true;
      }
    }
  },

  schedule: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("schedule").select("*").order("id", { ascending: true });
        if (error) throw error;
        return data || [];
      }
      return loadTable("schedule");
    },
    update: async (id, data) => {
      if (isSupabaseConfigured) {
        const { data: updated, error } = await supabase.from("schedule").update(data).eq("id", id).select().single();
        if (error) throw error;
        await logActivity("Admin edited schedule", `Updated schedule slot for time "${updated.time}"`);
        return updated;
      } else {
        const list = loadTable("schedule");
        const index = list.findIndex(s => s.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...data };
        saveTable("schedule", list);
        await logActivity("Admin edited schedule", `Updated schedule slot for time "${list[index].time}"`);
        return list[index];
      }
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: data.id || `sch-${Date.now()}`
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("schedule").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin added schedule slot", `Created schedule slot for time "${newItem.time}"`);
        return inserted;
      } else {
        const list = loadTable("schedule");
        list.push(newItem);
        saveTable("schedule", list);
        await logActivity("Admin added schedule slot", `Created schedule slot for time "${newItem.time}"`);
        return newItem;
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("schedule").select("time").eq("id", id).maybeSingle();
        const { error } = await supabase.from("schedule").delete().eq("id", id);
        if (error) throw error;
        await logActivity("Admin deleted schedule slot", `Deleted schedule slot for time "${record?.time || id}"`);
        return true;
      } else {
        const list = loadTable("schedule");
        const item = list.find(s => s.id === id);
        const filtered = list.filter(s => s.id !== id);
        saveTable("schedule", filtered);
        if (item) await logActivity("Admin deleted schedule slot", `Deleted schedule slot for time "${item.time}"`);
        return true;
      }
    }
  },

  instructors: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("instructors").select("*").order("name", { ascending: true });
        if (error) throw error;
        return data || [];
      }
      return loadTable("instructors");
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: data.id || `inst-${Date.now()}`
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("instructors").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin added instructor profile", `Added profile for "${newItem.name}"`);
        return inserted;
      } else {
        const list = loadTable("instructors");
        list.push(newItem);
        saveTable("instructors", list);
        await logActivity("Admin added instructor profile", `Added profile for "${newItem.name}"`);
        return newItem;
      }
    },
    update: async (id, data) => {
      if (isSupabaseConfigured) {
        const { data: updated, error } = await supabase.from("instructors").update(data).eq("id", id).select().single();
        if (error) throw error;
        await logActivity("Admin edited instructor profile", `Updated profile for "${updated.name}"`);
        return updated;
      } else {
        const list = loadTable("instructors");
        const index = list.findIndex(i => i.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...data };
        saveTable("instructors", list);
        await logActivity("Admin edited instructor profile", `Updated profile for "${list[index].name}"`);
        return list[index];
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("instructors").select("name").eq("id", id).maybeSingle();
        const { error } = await supabase.from("instructors").delete().eq("id", id);
        if (error) throw error;
        await logActivity("Admin deleted instructor profile", `Deleted profile for "${record?.name || id}"`);
        return true;
      } else {
        const list = loadTable("instructors");
        const item = list.find(i => i.id === id);
        const filtered = list.filter(i => i.id !== id);
        saveTable("instructors", filtered);
        if (item) await logActivity("Admin deleted instructor profile", `Deleted profile for "${item.name}"`);
        return true;
      }
    }
  },

  gallery: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("gallery").select("*").order("id", { ascending: false });
        if (error) throw error;
        return data || [];
      }
      return loadTable("gallery");
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: Number(data.id) || Date.now()
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("gallery").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin uploaded photo", `Uploaded photo "${newItem.title}" to gallery`);
        return inserted;
      } else {
        const list = loadTable("gallery");
        list.push(newItem);
        saveTable("gallery", list);
        await logActivity("Admin uploaded photo", `Uploaded photo "${newItem.title}" to gallery`);
        return newItem;
      }
    },
    update: async (id, data) => {
      if (isSupabaseConfigured) {
        const { data: updated, error } = await supabase.from("gallery").update(data).eq("id", Number(id) || id).select().single();
        if (error) throw error;
        await logActivity("Admin updated photo", `Updated photo details for "${updated.title}"`);
        return updated;
      } else {
        const list = loadTable("gallery");
        const index = list.findIndex(g => g.id === Number(id) || g.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...data };
        saveTable("gallery", list);
        await logActivity("Admin updated photo", `Updated photo details for "${list[index].title}"`);
        return list[index];
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("gallery").select("title").eq("id", Number(id) || id).maybeSingle();
        const { error } = await supabase.from("gallery").delete().eq("id", Number(id) || id);
        if (error) throw error;
        await logActivity("Admin deleted photo", `Deleted photo "${record?.title || id}"`);
        return true;
      } else {
        const list = loadTable("gallery");
        const item = list.find(g => g.id === Number(id) || g.id === id);
        const filtered = list.filter(g => g.id !== Number(id) && g.id !== id);
        saveTable("gallery", filtered);
        if (item) await logActivity("Admin deleted photo", `Deleted photo "${item.title}"`);
        return true;
      }
    }
  },

  testimonials: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("testimonials").select("*").order("id", { ascending: false });
        if (error) throw error;
        return data || [];
      }
      return loadTable("testimonials");
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: data.id || Date.now()
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("testimonials").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin added testimonial", `Created testimonial for "${newItem.name}"`);
        return inserted;
      } else {
        const list = loadTable("testimonials");
        list.push(newItem);
        saveTable("testimonials", list);
        await logActivity("Admin added testimonial", `Created testimonial for "${newItem.name}"`);
        return newItem;
      }
    },
    update: async (id, data) => {
      if (isSupabaseConfigured) {
        const { data: updated, error } = await supabase.from("testimonials").update(data).eq("id", Number(id) || id).select().single();
        if (error) throw error;
        await logActivity("Admin updated testimonial", `Updated testimonial approval status for "${updated.name}"`);
        return updated;
      } else {
        const list = loadTable("testimonials");
        const index = list.findIndex(t => t.id === Number(id) || t.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...data };
        saveTable("testimonials", list);
        await logActivity("Admin updated testimonial", `Updated testimonial approval status for "${list[index].name}"`);
        return list[index];
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("testimonials").select("name").eq("id", Number(id) || id).maybeSingle();
        const { error } = await supabase.from("testimonials").delete().eq("id", Number(id) || id);
        if (error) throw error;
        await logActivity("Admin deleted testimonial", `Deleted testimonial by "${record?.name || id}"`);
        return true;
      } else {
        const list = loadTable("testimonials");
        const item = list.find(t => t.id === Number(id) || t.id === id);
        const filtered = list.filter(t => t.id !== Number(id) && t.id !== id);
        saveTable("testimonials", filtered);
        if (item) await logActivity("Admin deleted testimonial", `Deleted testimonial by "${item.name}"`);
        return true;
      }
    }
  },

  contact_messages: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("contact_messages").select("*").order("date", { ascending: false });
        if (error) throw error;
        return data || [];
      }
      return loadTable("contact_messages");
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: `msg-${Date.now()}`,
        date: data.date || new Date().toISOString(),
        read: false,
        starred: false,
        archived: false
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("contact_messages").insert([newItem]).select().single();
        if (error) throw error;
        return inserted;
      } else {
        const list = loadTable("contact_messages");
        list.unshift(newItem);
        saveTable("contact_messages", list);
        return newItem;
      }
    },
    update: async (id, data) => {
      if (isSupabaseConfigured) {
        const { data: updated, error } = await supabase.from("contact_messages").update(data).eq("id", id).select().single();
        if (error) throw error;
        return updated;
      } else {
        const list = loadTable("contact_messages");
        const index = list.findIndex(m => m.id === id);
        if (index === -1) return null;
        list[index] = { ...list[index], ...data };
        saveTable("contact_messages", list);
        return list[index];
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("contact_messages").select("name").eq("id", id).maybeSingle();
        const { error } = await supabase.from("contact_messages").delete().eq("id", id);
        if (error) throw error;
        await logActivity("Admin deleted inquiry", `Deleted contact inquiry from "${record?.name || id}"`);
        return true;
      } else {
        const list = loadTable("contact_messages");
        const item = list.find(m => m.id === id);
        const filtered = list.filter(m => m.id !== id);
        saveTable("contact_messages", filtered);
        if (item) await logActivity("Admin deleted inquiry", `Deleted contact inquiry from "${item.name}"`);
        return true;
      }
    }
  },

  site_settings: {
    get: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;
        
        // Construct back the settings JSON structure
        const settings = {};
        (data || []).forEach(row => {
          settings[row.key] = row.value;
        });
        return settings;
      }
      return loadTable("site_settings", {});
    },
    update: async (data) => {
      if (isSupabaseConfigured) {
        for (const [key, value] of Object.entries(data)) {
          const { error } = await supabase.from("site_settings").upsert({ key, value });
          if (error) throw error;
        }
        await logActivity("Admin edited site settings", "Updated site layout settings or contact details");
        return data;
      } else {
        const settings = loadTable("site_settings", {});
        const updated = { ...settings, ...data };
        saveTable("site_settings", updated);
        await logActivity("Admin edited site settings", "Updated site layout settings or contact details");
        return updated;
      }
    }
  },

  admins: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("admins").select("*").order("username", { ascending: true });
        if (error) throw error;
        return data || [];
      }
      return loadTable("admins");
    },
    create: async (data) => {
      const newItem = {
        ...data,
        id: `admin-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("admins").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin added administrator", `Created admin account for "${newItem.username}"`);
        return inserted;
      } else {
        const list = loadTable("admins");
        list.push(newItem);
        saveTable("admins", list);
        await logActivity("Admin added administrator", `Created admin account for "${newItem.username}"`);
        return newItem;
      }
    },
    updatePassword: async (id, oldPassword, newPassword) => {
      if (isSupabaseConfigured) {
        const { data: user, error } = await supabase.from("admins").select("*").eq("id", id).single();
        if (error || !user) return { success: false, message: "User not found" };
        if (user.passwordHash !== oldPassword) {
          return { success: false, message: "Incorrect current password" };
        }
        
        const { error: updateErr } = await supabase.from("admins").update({ passwordHash: newPassword }).eq("id", id);
        if (updateErr) throw updateErr;
        await logActivity("Admin changed password", `Updated password for "${user.username}"`);
        return { success: true };
      } else {
        const list = loadTable("admins");
        const index = list.findIndex(a => a.id === id);
        if (index === -1) return { success: false, message: "User not found" };
        if (list[index].passwordHash !== oldPassword) {
          return { success: false, message: "Incorrect current password" };
        }
        list[index].passwordHash = newPassword;
        saveTable("admins", list);
        await logActivity("Admin changed password", `Updated password for "${list[index].username}"`);
        return { success: true };
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: list } = await supabase.from("admins").select("*");
        if ((list || []).length <= 1) {
          return { success: false, message: "Cannot delete the last admin account." };
        }
        const record = list.find(a => a.id === id);
        const { error } = await supabase.from("admins").delete().eq("id", id);
        if (error) throw error;
        await logActivity("Admin removed administrator", `Deleted admin account for "${record?.username || id}"`);
        return { success: true };
      } else {
        const list = loadTable("admins");
        const item = list.find(a => a.id === id);
        if (list.length <= 1) {
          return { success: false, message: "Cannot delete the last admin account." };
        }
        const filtered = list.filter(a => a.id !== id);
        saveTable("admins", filtered);
        if (item) await logActivity("Admin removed administrator", `Deleted admin account for "${item.username}"`);
        return { success: true };
      }
    },
    login: async (username, password) => {
      if (isSupabaseConfigured) {
        const { data: user, error } = await supabase.from("admins").select("*").eq("username", username).single();
        if (error || !user || user.passwordHash !== password) {
          await logActivity("Failed login attempt", `Failed login attempt for username "${username}"`);
          return { success: false, message: "Invalid username or password" };
        }
        const sessionUser = { id: user.id, username: user.username, role: user.role };
        localStorage.setItem("gm_current_user", JSON.stringify(sessionUser));
        await logActivity("Admin logged in", `Successful login for username "${user.username}"`);
        return { success: true, user: sessionUser };
      } else {
        const list = loadTable("admins");
        const user = list.find(a => a.username.toLowerCase() === username.toLowerCase() && a.passwordHash === password);
        if (user) {
          const sessionUser = { id: user.id, username: user.username, role: user.role };
          localStorage.setItem("gm_current_user", JSON.stringify(sessionUser));
          await logActivity("Admin logged in", `Successful login for username "${user.username}"`);
          return { success: true, user: sessionUser };
        }
        await logActivity("Failed login attempt", `Failed login attempt for username "${username}"`);
        return { success: false, message: "Invalid username or password" };
      }
    },
    logout: async () => {
      const user = localStorage.getItem("gm_current_user");
      if (user) {
        const parsed = JSON.parse(user);
        await logActivity("Admin logged out", `Successful logout for username "${parsed.username}"`);
      }
      localStorage.removeItem("gm_current_user");
    },
    getCurrentUser: () => {
      const user = localStorage.getItem("gm_current_user");
      return user ? JSON.parse(user) : null;
    }
  },

  media_library: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("media_library").select("*").order("name", { ascending: true });
        if (error) throw error;
        return data || [];
      }
      return loadTable("media_library");
    },
    create: async (name, url) => {
      const newItem = {
        id: `media-${Date.now()}`,
        name,
        url
      };
      if (isSupabaseConfigured) {
        const { data: inserted, error } = await supabase.from("media_library").insert([newItem]).select().single();
        if (error) throw error;
        await logActivity("Admin uploaded photo to Media Library", `Uploaded "${name}"`);
        return inserted;
      } else {
        const list = loadTable("media_library");
        list.push(newItem);
        saveTable("media_library", list);
        await logActivity("Admin uploaded photo to Media Library", `Uploaded "${name}"`);
        return newItem;
      }
    },
    delete: async (id) => {
      if (isSupabaseConfigured) {
        const { data: record } = await supabase.from("media_library").select("name").eq("id", id).maybeSingle();
        const { error } = await supabase.from("media_library").delete().eq("id", id);
        if (error) throw error;
        await logActivity("Admin deleted photo from Media Library", `Removed "${record?.name || id}"`);
        return true;
      } else {
        const list = loadTable("media_library");
        const item = list.find(m => m.id === id);
        const filtered = list.filter(m => m.id !== id);
        saveTable("media_library", filtered);
        if (item) await logActivity("Admin deleted photo from Media Library", `Removed "${item.name}"`);
        return true;
      }
    }
  },

  activity_logs: {
    getAll: async () => {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from("activity_logs").select("*").order("date", { ascending: false });
        if (error) throw error;
        return data || [];
      }
      return loadTable("activity_logs");
    },
    clear: async () => {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from("activity_logs").delete().neq("id", "none");
        if (error) throw error;
        await logActivity("Cleared activity logs", "Logs were cleared by admin.");
        return true;
      } else {
        saveTable("activity_logs", []);
        await logActivity("Cleared activity logs", "Logs were cleared by admin.");
        return true;
      }
    }
  },

  reset: async () => {
    if (isSupabaseConfigured) {
      // Re-seed Supabase database table contents
      // Note: Typically you run a seed script, but this handles it inline
      await supabase.from("classes").delete().neq("id", "none");
      const formattedClasses = classesData.map(cls => ({ ...cls, icon: getIconName(cls.icon), published: true }));
      await supabase.from("classes").insert(formattedClasses);

      await supabase.from("schedule").delete().neq("id", "none");
      const formattedSchedule = scheduleData.map((sch, i) => ({ id: `sch-${i + 1}`, ...sch }));
      await supabase.from("schedule").insert(formattedSchedule);

      await supabase.from("testimonials").delete().neq("id", 0);
      const formattedTestimonials = testimonialsData.map(t => ({ ...t, approved: true }));
      await supabase.from("testimonials").insert(formattedTestimonials);

      await supabase.from("gallery").delete().neq("id", 0);
      const formattedGallery = galleryData.map(p => ({ ...p, published: true }));
      await supabase.from("gallery").insert(formattedGallery);

      // Re-seed settings
      await supabase.from("site_settings").delete().neq("key", "none");
      // Seed key rows
      const seedSettings = [
        { key: "about", value: {
          mission: "To preserve and share authentic classical yoga through disciplined, accessible practice that supports daily well-being.",
          vision: "A welcoming sanctuary where traditional yoga and mindfulness practices meet the needs of modern everyday life, fostering self-awareness and holistic health.",
          philosophy: "We remain grounded in classical yoga traditions. We believe meaningful transformation happens gradually through consistency, awareness, breath, and patient practice.",
          sanctuaryTitle: "Designed for quietness, presence, and practice.",
          sanctuaryDesc: "Our environment is intentionally understated. Natural textures, soft tones, open airflow, and uncluttered spaces help create the feeling of stepping away from the noise of everyday life."
        }},
        { key: "timeline", value: [
          { id: "t1", year: "2014", title: "The Beginning", description: "Gyan Mandir was founded with a simple intention: to preserve and share authentic classical yoga through disciplined, accessible practice." },
          { id: "t2", year: "2018", title: "A Space for Stillness", description: "The center established its peaceful home in Samakhusi, creating a natural environment designed around simplicity, airflow, quietness, and mindful practice." },
          { id: "t3", year: "2022", title: "Yoga for Everyday Well-being", description: "Our practice expanded to include carefully adapted therapeutic approaches for students seeking support with mobility, breathing, stress, and physical recovery." },
          { id: "t4", year: "2026", title: "A Living Tradition", description: "Today, Gyan Mandir continues to grow as a welcoming sanctuary where traditional yoga meets the needs of modern everyday life." }
        ]},
        { key: "contact", value: {
          address: "Aapgachi, Itahari, Nepal",
          phone: "+977 980-0000000 (Sample Phone)",
          email: "info@gyanmandir.org.np",
          whatsapp: "https://wa.me/9779800000000",
          facebook: "https://www.facebook.com/p/Gyan-Mandir-Yog-Center-100075722265452/",
          googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14256.702951755106!2d87.2712616!3d26.6879196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6b0020d9b74d%3A0xdbddaac3aca39d80!2sGyan%20Mandir%20yog%20Center!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp",
          directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=26.6879148,87.2738365"
        }},
        { key: "seo", value: {
          titleSuffix: "Gyan Mandir Yog Center",
          homeTitle: "Gyan Mandir Yog Center - Pure Classical Yoga & Meditation",
          homeDesc: "Experience pure classical yoga, breathwork (pranayama), and deep meditation at Gyan Mandir Yog Center. Highly certified teachers, calming natural environment, and traditional practices.",
          aboutTitle: "About Gyan Mandir | Our Story, Philosophy & Instructors",
          aboutDesc: "Discover the story, philosophy, teaching approach, and people behind Gyan Mandir, a classical yoga and wellness center in Kathmandu.",
          classesTitle: "Our Classes & Programs | Yoga for All Levels",
          classesDesc: "Explore our diverse yoga and meditation classes including Beginner, Advanced, Pranayama, Therapeutic Yoga, and Senior Gentle Yoga at Gyan Mandir.",
          scheduleTitle: "Class Timetable & Schedule | Plan Your Practice",
          scheduleDesc: "View our weekly schedule of morning and evening batches. Book your class time at Gyan Mandir Yoga Center.",
          galleryTitle: "Photo Gallery | A Glimpse inside our Sanctuary",
          galleryDesc: "Browse images of our peaceful yoga sanctuary, community events, workshops, and International Yoga Day celebrations at Gyan Mandir.",
          contactTitle: "Contact Us | Find the Sanctuary",
          contactDesc: "Get in touch with Gyan Mandir Yog Center. Find our location in Itahari, Nepal, contact numbers, email address, and send us your inquiries."
        }}
      ];
      for (const row of seedSettings) {
        await supabase.from("site_settings").insert([row]);
      }

      await logActivity("Database reset to defaults", "Admin triggered standard data reset in Supabase");
      return true;
    } else {
      localStorage.removeItem("gm_classes");
      localStorage.removeItem("gm_schedule");
      localStorage.removeItem("gm_testimonials");
      localStorage.removeItem("gm_gallery");
      localStorage.removeItem("gm_instructors");
      localStorage.removeItem("gm_site_settings");
      localStorage.removeItem("gm_admins");
      localStorage.removeItem("gm_contact_messages");
      localStorage.removeItem("gm_activity_logs");
      localStorage.removeItem("gm_media_library");
      seedLocalDB();
      await logActivity("Database reset to defaults", "Admin triggered standard data reset");
      return true;
    }
  }
};
