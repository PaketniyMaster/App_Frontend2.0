import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
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
