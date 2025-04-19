import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-gray-800 text-white text-sm font-semibold flex items-center justify-center shadow-lg hover:bg-gray-700 transition"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
}

export default LanguageSwitcher;
