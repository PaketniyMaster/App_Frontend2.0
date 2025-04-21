import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:scale-105"
    >
      {t("back.button")}
    </button>
  );
}

export default BackButton;
