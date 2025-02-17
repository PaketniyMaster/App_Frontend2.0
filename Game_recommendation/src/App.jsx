import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./components/authForm";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/login" element={<AuthForm type="login" />} />
                    <Route path="/register" element={<AuthForm type="register" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
