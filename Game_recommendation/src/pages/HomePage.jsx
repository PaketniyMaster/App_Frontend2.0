import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function HomePage() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold">Добро пожаловать, {user.username}!</h1>
                    <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            ) : (
                <Link className="text-blue-500 text-xl" to="/login">Войти</Link>
            )}
        </div>
    );
}

export default HomePage;
