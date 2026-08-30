import { useState, useEffect, useMemo } from "react";
import {
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";

import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { db } from "../services/db";
import { localImages } from "../data/yogaData";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Gyan+Mandir+yog+Center/@26.6879196,87.2712616,675m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ef6b0020d9b74d:0xdbddaac3aca39d80!8m2!3d26.6879148!4d87.2738365!16s%2Fg%2F11xt9cqkl6?entry=ttu";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=26.6879148,87.2738365";

const FACEBOOK_URL =
  "https://www.facebook.com/p/Gyan-Mandir-Yog-Center-100075722265452/";

const contactItems = [
  {
    icon: FiMapPin,
    label: "Visit the Center",
    title: "Gyan Mandir Yog Center",
    description: "Aapgachi, Itahari, Nepal",
  },
  {
    icon: FiPhone,
    label: "Phone",
    title: "Contact the Center",
    description: "Phone number not publicly verified",
  },
  {
    icon: FiMail,
    label: "Email",
    title: "Email",
    description: "Email address not publicly verified",
  },
];

const inputBase =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-sm text-brand-forest placeholder:text-brand-forest/35 outline-none transition-all duration-200 dark:bg-zinc-950 dark:text-brand-offwhite dark:placeholder:text-brand-beige/30";

const getInputClass = (hasError) =>
  `${inputBase} ${
    hasError
      ? "border-red-400 ring-2 ring-red-400/10 focus:border-red-500"
      : "border-brand-sage/20 hover:border-brand-sage/40 focus:border-brand-sage focus:ring-4 focus:ring-brand-sage/10"
  }`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const data = await db.site_settings.get();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load contact settings:", err);
      }
    };
    fetchContactSettings();
  }, []);

  const dynamicContactItems = useMemo(() => {
    return [
      {
        icon: FiMapPin,
        label: "Visit the Center",
        title: "Gyan Mandir Yog Center",
        description: settings?.contact?.address || "Aapgachi, Itahari, Nepal",
      },
      {
        icon: FiPhone,
        label: "Phone",
        title: "Contact the Center",
        description: settings?.contact?.phone || "Phone number not publicly verified",
      },
      {
        icon: FiMail,
        label: "Email",
        title: "Email",
        description: settings?.contact?.email || "Email address not publicly verified",
      },
    ];
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (success) {
      setSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length < 2) {
      newErrors.name = "Your name should contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!subject) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!message) {
      newErrors.message = "Please enter your message.";
    } else if (message.length < 10) {
      newErrors.message =
        "Your message should contain at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Save contact message to our dynamic local storage database
    await db.contact_messages.create({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSubmitting(false);
    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    window.setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <>
      <SEO
        title="Contact Gyan Mandir Yog Center"
        description="Contact Gyan Mandir Yog Center in Aapgachi, Itahari. Find our location, directions, social channels, and send us a message about yoga classes and wellness programs."
      />

      <main className="pb-24">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-sage/10 blur-3xl" />
            <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-brand-beige/30 blur-3xl dark:bg-brand-sage/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-sage/20 bg-brand-beige/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-forest dark:bg-brand-forest/20 dark:text-brand-sage">
                <FiMessageCircle className="h-3.5 w-3.5" />
                We would love to hear from you
              </div>

              <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-brand-forest sm:text-5xl lg:text-6xl dark:text-brand-offwhite">
                Connect With
                <span className="block animate-gold-shine">
                  Gyan Mandir
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-forest/70 dark:text-brand-beige/70 sm:text-base">
                Whether you are beginning your yoga journey, looking for a
                suitable class, or simply want to visit our center, we are
                here to help you find the right next step.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTACT INFORMATION
        ========================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {dynamicContactItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.label}
                  className="group relative overflow-hidden rounded-3xl border border-brand-sage/15 bg-brand-offwhite p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-sage/30 hover:shadow-lg hover:shadow-brand-forest/5 dark:bg-brand-forest/20"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand-sage/5 blur-2xl transition-all group-hover:bg-brand-sage/10" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-beige text-brand-forest dark:bg-brand-forest dark:text-brand-sage">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-sage">
                        {item.label}
                      </p>

                      <h2 className="mt-1 font-serif text-lg font-bold text-brand-forest dark:text-brand-offwhite">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-brand-forest/60 dark:text-brand-beige/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            MAIN CONTACT AREA
        ========================================================== */}
        <section className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* =====================================================
                LEFT — LOCATION
            ====================================================== */}
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-sage">
                  Find Us
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-brand-forest dark:text-brand-offwhite sm:text-4xl">
                  Come Practice With Us
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-brand-forest/65 dark:text-brand-beige/65">
                  Our center is located in Aapgachi, Itahari. Use the map
                  below to view our exact location and get directions from
                  wherever you are.
                </p>
              </div>

              {/* Map */}
              <Card className="overflow-hidden rounded-[2rem] border border-brand-sage/15 bg-brand-offwhite p-2 shadow-sm dark:bg-brand-forest/20">
                <div className="relative h-[360px] overflow-hidden rounded-[1.6rem] bg-brand-beige/30 sm:h-[430px]">
                  <iframe
                    title="Gyan Mandir Yog Center location on Google Maps"
                    src={settings?.contact?.googleMapsUrl || "https://www.google.com/maps?q=26.6879148,87.2738365&z=17&output=embed"}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />

                  {/* Map label */}
                  <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)]">
                    <div className="rounded-2xl border border-white/30 bg-brand-forest/90 px-4 py-3 text-white shadow-xl backdrop-blur-md">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-brand-sage/20 p-2 text-brand-sage">
                          <FiMapPin className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-serif text-sm font-bold">
                            Gyan Mandir Yog Center
                          </p>

                          <p className="mt-0.5 text-[11px] text-white/70">
                            {settings?.contact?.address || "Aapgachi, Itahari, Nepal"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Location actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={settings?.contact?.directionsUrl || DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-forest px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-brand-sage dark:text-brand-forest"
                >
                  <FiMapPin className="h-4 w-4" />
                  Get Directions
                  <FiArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={settings?.contact?.googleMapsUrl || GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-brand-sage/20 bg-brand-offwhite px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-forest transition-all hover:border-brand-sage hover:bg-brand-beige/40 dark:bg-brand-forest/20 dark:text-brand-offwhite"
                >
                  <FiExternalLink className="h-4 w-4" />
                  Open Google Maps
                </a>
              </div>

              {/* Quick support */}
              <Card
                className="relative overflow-hidden rounded-3xl border border-brand-sage/15 p-7"
                style={{
                  backgroundImage: `linear-gradient(rgba(244,239,222,0.94), rgba(244,239,222,0.94)), url("${localImages.contactBg}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="dark:hidden" />

                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sage">
                    Stay Connected
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-bold text-brand-forest">
                    Prefer a quick conversation?
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-brand-forest/65">
                    Connect with the center through our social channels for
                    updates, announcements, and general enquiries.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={settings?.contact?.whatsapp || "https://wa.me/9779800000000"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      WhatsApp
                    </a>

                    <a
                      href={settings?.contact?.facebook || FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      aria-label="Visit Gyan Mandir Facebook page"
                    >
                      <FaFacebook className="h-4 w-4" />
                      Facebook
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* =====================================================
                RIGHT — FORM
            ====================================================== */}
            <Card className="rounded-[2rem] border border-brand-sage/15 bg-brand-offwhite p-6 shadow-sm sm:p-8 lg:sticky lg:top-24 dark:bg-brand-forest/20">
              <div className="border-b border-brand-sage/10 pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-sage">
                  Enquiry
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-brand-forest dark:text-brand-offwhite">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-sm leading-6 text-brand-forest/60 dark:text-brand-beige/60">
                  Tell us what you would like to know. We will use the
                  information you provide to respond to your enquiry.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-7 space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-bold text-brand-forest dark:text-brand-offwhite"
                  >
                    Full Name
                    <span className="ml-1 text-brand-sage">*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "name-error" : undefined
                    }
                    className={getInputClass(errors.name)}
                  />

                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-2 text-xs font-medium text-red-500"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-bold text-brand-forest dark:text-brand-offwhite"
                  >
                    Email Address
                    <span className="ml-1 text-brand-sage">*</span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    className={getInputClass(errors.email)}
                  />

                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-2 text-xs font-medium text-red-500"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-xs font-bold text-brand-forest dark:text-brand-offwhite"
                  >
                    Subject
                    <span className="ml-1 text-brand-sage">*</span>
                  </label>

                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                    className={getInputClass(errors.subject)}
                  />

                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="mt-2 text-xs font-medium text-red-500"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-brand-forest dark:text-brand-offwhite"
                    >
                      Message
                      <span className="ml-1 text-brand-sage">*</span>
                    </label>

                    <span className="text-[10px] text-brand-forest/40 dark:text-brand-beige/40">
                      {formData.message.length}/1000
                    </span>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your question, preferred class, or anything else you would like to know..."
                    rows={6}
                    maxLength={1000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${getInputClass(
                      errors.message
                    )} resize-none`}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-xs font-medium text-red-500"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Success */}
                {success && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-2xl border border-brand-sage/20 bg-brand-beige/60 p-4 dark:bg-brand-forest/40"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-sage text-brand-forest">
                      <FiCheck className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-brand-forest dark:text-brand-offwhite">
                        Message prepared successfully
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-brand-forest/60 dark:text-brand-beige/60">
                        Thank you for contacting Gyan Mandir. We appreciate
                        your enquiry.
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl py-4 text-sm font-bold"
                >
                  {isSubmitting ? "Preparing Message..." : "Send Message"}
                </Button>

                <p className="text-center text-[10px] leading-5 text-brand-forest/40 dark:text-brand-beige/40">
                  By submitting this form, you agree to provide the
                  information necessary for us to respond to your enquiry.
                </p>
              </form>
            </Card>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}
        <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-forest px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-sage/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-brand-beige/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sage/15 text-brand-sage">
                <FiClock className="h-5 w-5" />
              </div>

              <h2 className="mt-5 font-serif text-3xl font-bold text-brand-offwhite sm:text-4xl">
                Ready to Begin Your Practice?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-brand-beige/70">
                Explore our yoga programs and find a practice that fits your
                current level, goals, and routine.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/classes"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-sage px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-forest transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explore Classes
                  <FiArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={settings?.contact?.directionsUrl || DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  <FiMapPin className="h-4 w-4" />
                  Find the Center
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}