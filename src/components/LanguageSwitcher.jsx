// src/components/LanguageSwitcher.jsx
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  // Ensure the current language persists on load
  useEffect(() => {
    const stored = localStorage.getItem("i18nextLng");
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ne" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm font-medium transition-colors bg-transparent border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-offwhite dark:border-brand-sage dark:text-brand-sage dark:hover:bg-brand-sage dark:hover:text-brand-forest rounded"
      aria-label={t("language.toggle")}
    >
      {i18n.language === "en" ? "English" : "नेपाली"}
    </button>
  );
}
