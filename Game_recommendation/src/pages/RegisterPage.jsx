import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password) return toast.error("Введите логин и пароль");
        try {
            setLoading(true);
            await register(username, password);
            toast.success("Регистрация успешна. Выполните вход.");
            navigate("/login");
        } catch (error) {
            toast.error("Ошибка регистрации. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleRegister();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">Регистрация</h2>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    className="w-full p-2 my-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 my-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 disabled:bg-gray-400"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
                <p className="text-center mt-2">
                    Уже есть аккаунт?{" "}
                    <a href="/login" className="text-blue-500">
                        Войти
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
