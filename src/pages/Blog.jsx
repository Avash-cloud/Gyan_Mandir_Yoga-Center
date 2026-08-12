import { useState } from "react";
import { FiClock, FiEye } from "react-icons/fi";
import SEO from "../components/SEO";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { blogData } from "../data/yogaData";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <SEO 
        title="Yogic Wisdom & Articles" 
        description="Read articles from our Gurus on the benefits of yoga, science of meditation, Ayurvedic daily routine, and breathing techniques."
      />

      <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-forest dark:text-brand-offwhite">
            Yoga & Wellness Blog
          </h1>
          <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed font-light">
            Gain wellness insights, spiritual knowledge, and breathing practices straight from our lead Gurus.
          </p>
        </section>

        {/* Blog Post Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogData.map((post) => (
            <Card key={post.id} className="bg-brand-offwhite dark:bg-brand-forest/20 overflow-hidden flex flex-col justify-between h-full border border-brand-sage/10 rounded-3xl p-5">
              <div className="space-y-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover rounded-2xl border border-brand-sage/10"
                />
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-brand-sage">
                  <span>{post.category}</span>
                  <span className="text-brand-forest/30 dark:text-brand-beige/30">•</span>
                  <span className="text-brand-forest/60 dark:text-brand-beige/60">{post.date}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-forest dark:text-brand-offwhite leading-tight">
                  {post.title}
                </h3>
                <p className="text-brand-forest/80 dark:text-brand-beige/80 text-sm leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom stats & trigger */}
              <div className="pt-6 border-t border-brand-sage/10 mt-6 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-brand-forest/60 dark:text-brand-beige/60 font-medium">
                  <FiClock className="w-4 h-4" /> {post.readTime}
                </span>
                <Button onClick={() => setSelectedPost(post)} className="text-xs px-4 py-2 flex items-center gap-1.5">
                  <FiEye className="w-4 h-4" /> Read Article
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Modal for Article Detail */}
        {selectedPost && (
          <Modal
            isOpen={!!selectedPost}
            onClose={() => setSelectedPost(null)}
            title={selectedPost.title}
          >
            <div className="space-y-6 pb-6">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-56 sm:h-64 object-cover rounded-2xl border border-brand-sage/10"
              />
              
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-brand-sage">
                <span>{selectedPost.category}</span>
                <span className="text-zinc-300">•</span>
                <span>{selectedPost.date}</span>
                <span className="text-zinc-300">•</span>
                <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
              </div>

              {/* Styled article body */}
              <div className="text-brand-forest/80 dark:text-brand-beige/80 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-light">
                {selectedPost.content}
              </div>

              <div className="pt-4 border-t border-brand-sage/10 flex justify-end">
                <Button onClick={() => setSelectedPost(null)} variant="outline" className="px-5 py-2">
                  Close Article
                </Button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </>
  );
}
