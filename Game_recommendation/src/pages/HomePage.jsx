import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function HomePage() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Шапка */}
            <header className="w-screen fixed top-0 left-0 flex justify-between items-center p-4 bg-gray-800 shadow-md">
                {/* Левый пустой блок для выравнивания */}
                <div className="flex-1"></div>

                {/* Поиск в центре */}
                <div className="flex-1 flex justify-center">
                    <input 
                        type="text" 
                        placeholder="Поиск..." 
                        className="border rounded px-4 py-2 w-1/3 bg-gray-700 text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Приветствие и кнопка выхода справа */}
                <div className="flex-1 flex justify-end space-x-4">
                    {user && <span className="text-lg">Добро пожаловать, {user.username}!</span>}
                    {user ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                            Выйти
                        </button>
                    ) : (
                        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/login">
                            Войти
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
}

export default HomePage;
