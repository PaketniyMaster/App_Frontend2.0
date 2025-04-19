import { useState } from "react";
import { register as registerService } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { register } from "../features/user/userSlice";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";

function RegisterPage() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        if (!username || !password) return toast.error(t("register.fill_fields"));
        try {
            setLoading(true);
            const data = await registerService(username, password);
            dispatch(register({ name: username, token: data.token }));
            toast.success(t("register.success"));
            navigate("/login");
        } catch {
            toast.error(t("register.error"));
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleRegister();
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <BackButton />
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">{t("register.title")}</h2>
                <input
                    type="text"
                    placeholder={t("register.username")}
                    className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-700 text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    type="password"
                    placeholder={t("register.password")}
                    className="w-full p-2 my-2 border border-gray-600 rounded bg-gray-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 disabled:bg-gray-400"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? t("register.loading") : t("register.button")}
                </button>
                <p className="text-center mt-2">
                    {t("register.have_account")}{" "}
                    <a href="/login" className="text-blue-500">
                        {t("register.login")}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
