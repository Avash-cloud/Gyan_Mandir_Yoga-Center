import { useEffect } from "react";

export default function SEO({ title, description }) {
  useEffect(() => {
    // Page Title
    document.title = title 
      ? `${title} | Gyan Mandir Yog Center` 
      : "Gyan Mandir Yog Center - Pure Classical Yoga & Meditation";

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || "Experience pure classical yoga, breathwork (pranayama), and deep meditation at Gyan Mandir Yog Center. Highly certified teachers, calming natural environment, and traditional practices.";

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title 
      ? `${title} | Gyan Mandir Yog Center` 
      : "Gyan Mandir Yog Center - Classical Yoga & Meditation";

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || "Experience pure classical yoga, breathwork (pranayama), and deep meditation at Gyan Mandir Yog Center. Highly certified teachers, calming natural environment, and traditional practices.";

    // OG Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement("meta");
      ogImg.setAttribute("property", "og:image");
      document.head.appendChild(ogImg);
    }
    ogImg.content = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800";

    // OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.content = "website";
  }, [title, description]);

  return null;
}
