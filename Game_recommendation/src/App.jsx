import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GameDetail from "./pages/GameDetail";
import { useEffect, useState } from "react";
import { initData } from "@twa-dev/sdk";
import LanguageSwitcher from "./components/LanguageSwitcher";

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
        <Router>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/login" element={<LoginPage type="login" />} />
                <Route path="/register" element={<RegisterPage type="register" />} />
                <Route path="/" element={<HomePage type="home" />} />
                <Route path="/game/:id" element={<GameDetail />} />
            </Routes>
            <LanguageSwitcher />
        </Router>
    );
}

export default App;
