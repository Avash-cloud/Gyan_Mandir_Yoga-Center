import { useState } from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { localImages } from "../data/yogaData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email Address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <>
      <SEO 
        title="Contact Us & Map Location" 
        description="Get in touch with Gyan Mandir Yog Center. Find phone number, email address, WhatsApp links, and Google Map directions placeholders."
      />

      <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Connect With Our Center
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Have questions about schedules, fees, or class levels? Write to us or call us using our placeholders.
          </p>
        </section>

        {/* Contact Info & Form Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Details & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: FiMapPin, title: "Address", desc: "[Address Placeholder]" },
                { icon: FiPhone, title: "Call Us", desc: "[Phone Number Placeholder]" },
                { icon: FiMail, title: "Email Us", desc: "[Email Placeholder]" }
              ].map((item, idx) => (
                <Card key={idx} className="bg-brand-offwhite dark:bg-brand-forest/20 text-center p-6 border border-brand-sage/10 rounded-2xl flex flex-col items-center justify-center space-y-2">
                  <div className="p-2.5 bg-brand-beige dark:bg-brand-forest text-brand-forest dark:text-brand-sage rounded-full">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-brand-forest dark:text-brand-offwhite">
                    {item.title}
                  </h4>
                  <p className="text-xs text-brand-forest/70 dark:text-brand-beige/70 font-light break-all">
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>

            {/* Direct Chat Links */}
            <Card className="bg-brand-offwhite dark:bg-brand-forest/20 border border-brand-sage/10 p-6 rounded-3xl space-y-4 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 z-0" 
                style={{ backgroundImage: `url("${localImages.contactBg}")` }}
              />
              <div className="relative z-10 space-y-3">
                <h3 className="font-serif text-lg font-bold text-brand-forest dark:text-brand-offwhite">
                  Instant Chat Support
                </h3>
                <p className="text-brand-forest/70 dark:text-brand-beige/70 text-xs sm:text-sm leading-relaxed font-light">
                  Connect with our front desk staff instantly via WhatsApp or message us on Facebook. (Details to be updated).
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://wa.me/[WhatsApp Link Placeholder]"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                  >
                    <FaWhatsapp className="w-5 h-5" /> [WhatsApp Link Placeholder]
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#156bec] text-white rounded-full font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                  >
                    <FaFacebook className="w-5 h-5" /> Visit Facebook Page
                  </a>
                </div>
              </div>
            </Card>

            {/* Map Frame Placeholder */}
            <div className="w-full h-72 rounded-3xl overflow-hidden shadow-sm border border-brand-sage/20 bg-brand-beige/40 flex flex-col items-center justify-center text-center p-6">
              {/* COMMENT: Replace src with authentic Google Map embed URL in the future */}
              <span className="text-xs uppercase tracking-widest text-brand-forest/60 dark:text-brand-beige/60 font-semibold">
                Google Maps Embed Placeholder
              </span>
              <span className="text-[10px] text-brand-forest/40 dark:text-brand-beige/40 mt-1">
                (Update iframe tag with source directions)
              </span>
              <div className="w-16 h-16 border-2 border-dashed border-brand-sage rounded-full flex items-center justify-center text-xl text-brand-sage mt-4">
                🗺️
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-brand-offwhite dark:bg-brand-forest/20 p-8 border border-brand-sage/15 rounded-3xl space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-brand-forest dark:text-brand-offwhite">
                Send Us a Message
              </h3>
              <p className="text-brand-forest/70 dark:text-brand-beige/70 text-sm font-light">
                Write to us using the contact form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Name Placeholder"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@placeholder.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Class Details"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                  Message Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {success && (
                <div className="p-3 bg-brand-beige dark:bg-zinc-800 border border-brand-sage/20 text-brand-forest dark:text-brand-sage rounded-xl text-center text-sm font-semibold">
                  ✓ Message Sent! Thank you. We will contact you soon.
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full py-3.5">
                Send Message
              </Button>
            </form>
          </Card>

        </section>

      </div>
    </>
  );
}
