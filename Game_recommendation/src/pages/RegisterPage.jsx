import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        debugger
        console.log("📢 Кнопка регистрации нажата!");
        try {
            await register(username, email, password);
            navigate("/login");
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };
    

    return (
        <div className="flex min-h-screen flex-grow items-center justify-center  bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">Регистрация</h2>
                <input className="w-full p-2 my-2 border rounded" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input className="w-full p-2 my-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full p-2 my-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-green-500 text-white p-2 rounded mt-4" onClick={handleRegister}>Зарегистрироваться</button>
                <p className="text-center mt-2">Уже есть аккаунт? <a href="/login" className="text-blue-500">Войти</a></p>
            </div>
        </div>
    );
}

export default RegisterPage;
