import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUser } from "/src/services/auth";
import { useAuth } from "/src/context/AuthContext";
import { toast } from "react-hot-toast";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(username, password);
            const userData = await getUser();
            setUser(userData);
            navigate("/");
        } catch (error) {
            toast.error("Ошибка входа! Проверьте логин и пароль.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen flex-grow bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Вход</h2>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className="w-full p-2 border rounded mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 border rounded mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleLogin}
                >
                    Войти
                </button>
            </div>
            <p className="text-center mt-2">Уже есть аккаунт? <a href="/register" className="text-blue-500">Зарегистрироваться</a></p>
        </div>
    );
}

export default LoginPage;
