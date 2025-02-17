import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex justify-center items-center min-h-screen flex-grow bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Вход" : "Регистрация"}
        </h2>
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Имя"
              className="w-full p-2 border rounded-lg"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-2 border rounded-lg"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600 cursor-pointer" onClick={toggleForm}>
          {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </p>
      </div>
    </div>
  );
}
