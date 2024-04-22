import React from "react";

const Status = ({ vpsStatus }) => {
  const statusTranslations = {
    UNKNOWN: "Неизвестно 🤷‍♂️",
    CREATING: "Создается 🛠",
    RUNNING: "Работает 🏃‍♂️",
    STOPPING: "Останавливается ⏹",
    RESTARTING: "Перезагружается 🔁",
    REMOVING: "Удаляется 🗑",
    REMOVED: "Удален 🚫",
    STOPPED: "Остановлен ⏸",
    STARTING: "Запускается 🚀",
    RECONFIGURING: "Переконфигурируется ⚙️",
    REINSTALLING: "Переустанавливается 🔄",
  };

  return <>{statusTranslations[vpsStatus] || "Статус не определен 🛑"}</>;
};

export default Status;
