import { useState } from "react";
import SEO from "../components/SEO";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { testimonialsData } from "../data/yogaData";

export default function Testimonials() {
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    review: "",
    rating: 5
  });
  const [reviewsList, setReviewsList] = useState(testimonialsData);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setError("");

    if (!newReview.name.trim()) {
      setError("Please provide your name.");
      return;
    }
    if (!newReview.review.trim()) {
      setError("Please write your review.");
      return;
    }

    const reviewToAdd = {
      id: reviewsList.length + 1,
      name: newReview.name,
      role: newReview.role || "Yoga Practitioner",
      rating: newReview.rating,
      review: newReview.review
    };

    setReviewsList((prev) => [reviewToAdd, ...prev]);
    setSuccess(true);
    setNewReview({ name: "", role: "", review: "", rating: 5 });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <>
      <SEO 
        title="Student Testimonials & Reviews" 
        description="Read real wellness success stories from practitioners at Gyan Mandir. Read reviews on core mobility improvements, back pain recovery, and stress relief."
      />

      <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Yogi Success Stories & Reviews
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Read about physical recovery, mental calm, and healthy routines developed by our dedicated yoga and meditation community. We omit profile pictures to respect the privacy of our practitioners.
          </p>
        </section>

        {/* Reviews Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((t) => (
            <Card key={t.id} className="bg-brand-offwhite dark:bg-brand-forest/20 border border-brand-sage/10 p-8 rounded-3xl flex flex-col justify-between h-full">
              <p className="text-brand-forest/75 dark:text-brand-beige/75 italic text-sm sm:text-base leading-relaxed font-light">
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
        </section>

        {/* Review Submission Form */}
        <section className="max-w-2xl mx-auto bg-brand-beige/40 dark:bg-brand-forest/10 p-8 rounded-3xl border border-brand-sage/20 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl font-bold text-brand-forest dark:text-brand-offwhite">
              Share Your Journey
            </h3>
            <p className="text-brand-forest/70 dark:text-brand-beige/70 text-xs sm:text-sm font-light">
              Has practicing yoga improved your physical or mental health? We would love to hear your thoughts.
            </p>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newReview.name}
                  onChange={handleChange}
                  placeholder="e.g. Student Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-brand-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={newReview.role}
                  onChange={handleChange}
                  placeholder="e.g. Practitioner"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-brand-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage"
                />
              </div>
            </div>

            {/* Stars Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-1.5 text-2xl text-brand-sage">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className="hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                  >
                    {star <= newReview.rating ? "★" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-brand-forest mb-1.5">
                Your Review *
              </label>
              <textarea
                name="review"
                value={newReview.review}
                onChange={handleChange}
                rows="4"
                placeholder="How has your sleep, focus, or flexibility changed since starting yoga here?"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-sage/20 bg-brand-offwhite text-sm focus:outline-none focus:ring-2 focus:ring-brand-sage resize-none"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && (
              <p className="text-brand-forest text-sm font-semibold text-center">
                ✓ Thank you! Your testimonial has been posted.
              </p>
            )}

            <Button type="submit" variant="primary" className="w-full">
              Post Testimonial
            </Button>
          </form>
        </section>

      </div>
    </>
  );
}
