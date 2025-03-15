import { useEffect } from "react";
import { initData } from "@twa-dev/sdk";

const TelegramApp = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Растягивает на весь экран
    tg.ready(); // Сообщает Telegram, что Web App готов
    console.log("Пользователь:", initData.user);
  }, []);

  const sendData = () => {
    window.Telegram.WebApp.sendData("Привет из Web App!");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Мой Telegram Web App</h1>
      <button onClick={sendData} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg">
        Отправить данные
      </button>
    </div>
  );
};

export default TelegramApp;
