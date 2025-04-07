import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, fetchUserProfile } from "../services/auth";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login as setToken, setName } from "../features/user/userSlice";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!username || !password) return toast.error("Введите логин и пароль");
        try {
            setLoading(true);
            const tokenData = await login(username, password);
            const userData = await fetchUserProfile();
    
            if (userData && tokenData?.access_token) {
                dispatch(setToken(tokenData.access_token));
                dispatch(setName(userData.username)); // или userData.name — зависит от API
                navigate("/");
            } else {
                throw new Error("Не удалось получить данные пользователя");
            }
        } catch (error) {
            toast.error("Ошибка входа! Проверьте логин и пароль.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Вход</h2>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className="w-full p-2 border rounded mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 border rounded mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Вход..." : "Войти"}
                </button>
            </div>
            <p className="text-center mt-2">
                Нет аккаунта?{" "}
                <a href="/register" className="text-blue-500">
                    Зарегистрироваться
                </a>
            </p>
        </div>
    );
}

export default LoginPage;
