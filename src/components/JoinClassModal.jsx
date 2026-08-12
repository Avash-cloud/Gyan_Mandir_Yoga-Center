import { useState, useEffect } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { classesData } from "../data/yogaData";

export default function JoinClassModal({ isOpen, onClose, selectedClassId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "",
    shift: "morning",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedClassId) {
      setFormData((prev) => ({ ...prev, classType: selectedClassId }));
    }
  }, [selectedClassId, isOpen]);

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

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";

    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\+?[0-9]{7,15}$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number.";

    if (!formData.classType) newErrors.classType = "Please select a class.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        classType: "",
        shift: "morning",
        message: ""
      });
      onClose();
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enroll in Class">
      {submitted ? (
        <div className="text-center py-8 space-y-3">
          <div className="w-16 h-16 bg-brand-sage/20 text-brand-forest rounded-full flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h4 className="text-xl font-bold font-serif text-brand-forest">
            Request Sent
          </h4>
          <p className="text-xs sm:text-sm text-brand-forest/80 font-light">
            Thank you, <strong className="font-semibold">{formData.name}</strong>. We will contact you via phone or email shortly to confirm your batch start date.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Student Name"
              className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@placeholder.com"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Placeholder"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                Select Class *
              </label>
              <select
                name="classType"
                value={formData.classType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage cursor-pointer"
              >
                <option value="">-- Choose Class --</option>
                {classesData.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.title}
                  </option>
                ))}
              </select>
              {errors.classType && <p className="text-red-500 text-xs mt-1">{errors.classType}</p>}
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                Preferred Shift
              </label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage cursor-pointer"
              >
                <option value="morning">Morning Shift</option>
                <option value="evening">Evening Shift</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
              History / Comments
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              placeholder="Note down health requirements here..."
              className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage resize-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full">
              Send Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
