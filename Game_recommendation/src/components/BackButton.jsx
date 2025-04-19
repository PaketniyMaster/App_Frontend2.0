import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {t("back.button")}
    </button>
  );
}

export default BackButton;
