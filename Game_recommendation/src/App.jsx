import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { initData } from "@twa-dev/sdk";

function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.expand();
            tg.ready();
            setUserData(initData?.user || "Нет данных");
        } else {
            console.log("Telegram WebApp недоступен. Тестируем локально.");
            setUserData("Локальный тест");
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/login" element={<LoginPage type="login" />} />
                    <Route path="/register" element={<RegisterPage type="register" />} />
                    <Route path="/" element={<HomePage type="home" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
