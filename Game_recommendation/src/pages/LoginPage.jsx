import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, fetchUserProfile } from "../services/auth";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login as setToken, setName } from "../features/user/userSlice";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";

function LoginPage() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!username || !password) return toast.error(t("login.fill_fields"));
        try {
            setLoading(true);
            const tokenData = await login(username, password);
            const userData = await fetchUserProfile();

            if (userData && tokenData?.access_token) {
                dispatch(setToken(tokenData.access_token));
                dispatch(setName(userData.username));
                navigate("/");
            } else {
                throw new Error();
            }
        } catch {
            toast.error(t("login.error"));
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <BackButton />
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">{t("login.title")}</h2>
                <input
                    type="text"
                    placeholder={t("login.username")}
                    className="w-full p-2 border border-gray-600 rounded mb-2 bg-gray-700 text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    type="password"
                    placeholder={t("login.password")}
                    className="w-full p-2 border border-gray-600 rounded mb-2 bg-gray-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? t("login.loading") : t("login.button")}
                </button>
            </div>
            <p className="text-center mt-2">
                {t("login.no_account")}{" "}
                <a href="/register" className="text-blue-500">
                    {t("login.register")}
                </a>
            </p>
        </div>
    );
}

export default LoginPage;
