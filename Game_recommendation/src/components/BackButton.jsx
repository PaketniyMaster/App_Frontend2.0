import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Назад
    </button>
  );
}

export default BackButton;
