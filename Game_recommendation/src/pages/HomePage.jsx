import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl font-bold">Добро пожаловать, {user.username}!</h1>
                    <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={() => { logout(); navigate("/login"); }}>Выйти</button>
                </div>
            ) : (
                <a className="text-blue-500 text-xl" href="/login">Войти</a>
            )}
        </div>
    );
}

export default HomePage;
