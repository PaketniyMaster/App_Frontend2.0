import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/auth";
const API_URL = import.meta.env.VITE_API_URL + "/auth";


export async function login(username, password) {
    try {
        const response = await axios.post(`${API_URL}/token`, new URLSearchParams({ username, password }));
        localStorage.setItem("token", response.data.access_token);
        return response.data;
    } catch (error) {
        console.error("Ошибка входа:", error.response?.data || error.message);
        throw error;
    }
}

export async function register(username, email, password) {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password });
        localStorage.setItem("token", response.data.access_token);
        return response.data;
    } catch (error) {
        console.error("Ошибка регистрации:", error.response?.data || error.message);
        throw error;
    }
}

export async function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const response = await axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch {
        return null;
    }
}
