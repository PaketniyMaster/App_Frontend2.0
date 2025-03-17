const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Получение токена из localStorage
export function getToken() {
    return localStorage.getItem("token");
}

// Сохранение токена
export function saveToken(token) {
    localStorage.setItem("token", token);
}

// Удаление токена (выход пользователя)
export function removeToken() {
    localStorage.removeItem("token");
}

// Проверка авторизации пользователя
export function isAuthenticated() {
    return !!getToken();
}

// Вход пользователя
export async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username, password, grant_type: "password" }),
        });

        if (!response.ok) {
            throw new Error("Ошибка входа");
        }

        const data = await response.json();
        saveToken(data.access_token);
        return data;
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        throw error;
    }
}

export async function register(username, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка регистрации:", errorData);
        throw new Error(errorData.detail || "Ошибка регистрации");
    }

    return await response.json();
}
// Выход пользователя
export function logout() {
    removeToken();
}

// Получение информации о текущем пользователе
export async function fetchUserProfile() {
    try {
        const token = getToken();
        if (!token) return null;

        const response = await fetch(`${API_URL}/auth/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Ошибка получения профиля");

        return await response.json();
    } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        return null;
    }
}

// Поиск игр (с проверкой токена)
export async function searchGames(query) {
    const token = getToken();
    if (!token) return [];

    try {
        const response = await fetch(`${API_URL}/games/search?query=${encodeURIComponent(query)}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Ошибка поиска");

        return await response.json();
    } catch (error) {
        console.error("Ошибка поиска игр:", error);
        return [];
    }
}
