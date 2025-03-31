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

// Проверка авторизации пользователя (учёт загрузки токена)
export function isAuthenticated() {
    const token = getToken();
    return Boolean(token);
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

// Регистрация пользователя
export async function register(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Ошибка регистрации");
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        throw error;
    }
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

        if (response.status === 401) {
            console.warn("Токен истек. Очищаем localStorage.");
            removeToken();
            localStorage.clear();
            return null;
        }

        if (!response.ok) throw new Error("Ошибка получения профиля");

        return await response.json();
    } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
        return null;
    }
}

// Поиск игр (с проверкой токена)
export async function searchGames({ query, tags, min_rating, max_rating }) {
    const token = getToken();
    if (!token) {
        console.warn("Токен не найден, доступ к поиску ограничен");
        return [];
    }

    try {
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        if (tags) params.append("tags", tags);
        if (min_rating) params.append("min_rating", min_rating);
        if (max_rating) params.append("max_rating", max_rating);

        console.log("Отправляем запрос:", params.toString());

        const response = await fetch(`${API_URL}/games/search?${params.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка поиска: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка поиска игр:", error.message);
        return [];
    }
}
