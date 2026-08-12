import { useState } from "react";
import { Link } from "react-router-dom";
import { GiLotus } from "react-icons/gi";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubsubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubsubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-brand-forest text-brand-offwhite dark:bg-zinc-950 border-t border-brand-sage/10 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GiLotus className="w-10 h-10 text-brand-sage" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wide text-white leading-tight">
                Gyan Mandir
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-sage font-medium">
                Yog Center
              </span>
            </div>
          </div>
          <p className="text-brand-beige/80 text-sm leading-relaxed max-w-xs font-light">
            Dedicated to physical, mental, and spiritual well-being through authentic classical practices in a peaceful retreat sanctuary.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[
              { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
              { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
              { icon: FaWhatsapp, href: "https://wa.me/[WhatsApp Link Placeholder]", label: "WhatsApp" },
              { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full bg-brand-forest/60 border border-brand-sage/20 hover:bg-brand-sage hover:text-brand-forest transition-colors text-white"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-brand-sage mb-5">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-brand-beige/85">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About Us" },
              { path: "/classes", label: "Our Classes" },
              { path: "/schedule", label: "Timetable" },
              { path: "/gallery", label: "Gallery" },
              { path: "/blog", label: "Yoga Blog" },
              { path: "/faq", label: "FAQs" },
              { path: "/contact", label: "Contact Us" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="hover:text-brand-sage transition-colors flex items-center gap-1.5 font-light"
                >
                  <span className="text-xs text-brand-sage/50">✦</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-brand-sage mb-5">Contact Details</h4>
          <ul className="space-y-4 text-sm text-brand-beige/85 font-light">
            <li className="flex items-start gap-3">
              <FiMapPin className="w-5 h-5 text-brand-sage mt-0.5 shrink-0" />
              <span>[Address Placeholder]</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="w-5 h-5 text-brand-sage shrink-0" />
              <span>[Phone Number Placeholder]</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="w-5 h-5 text-brand-sage shrink-0" />
              <span>[Email Placeholder]</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-brand-sage mb-5">Newsletter</h4>
          <p className="text-brand-beige/80 text-sm mb-4 font-light">
            Subscribe to receive yoga tips, Ayurvedic guidelines, and schedules.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-brand-forest/40 border border-brand-sage/20 rounded-xl text-white placeholder-brand-beige/55 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage focus:border-transparent transition-all"
              />
            </div>
            {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
            {subscribed && (
              <p className="text-brand-sage text-xs mt-1">
                Thank you for subscribing! Check your inbox soon.
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-brand-sage text-brand-forest font-semibold rounded-xl text-sm hover:bg-white hover:text-brand-forest transition-all shadow-md cursor-pointer active:scale-[0.98]"
            >
              Subscribe Now
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-sage/10 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-beige/65 gap-4">
        <div>
          © {new Date().getFullYear()} Gyan Mandir Yog Center. All rights reserved.
        </div>
        <div className="flex items-center gap-6 font-light">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
