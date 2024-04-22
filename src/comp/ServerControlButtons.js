import React from "react";

const ServerControlButtons = ({ vpsId, status, handleButtonClick }) => {
  return (
    <>

      {status !== "RUNNING"   && (
        <button
          className="btn btn-success btn-sm mx-2"
          onClick={() => handleButtonClick(`vps/server/${vpsId}/start`, "POST")}
        >
          Запустить
        </button>
      )}
      {status === "RUNNING" && (
        <button
          className="btn btn-warning btn-sm mx-2"
          onClick={() =>
            handleButtonClick(`vps/server/${vpsId}/reboot`, "POST")
          }
        >
          Перезагрузить
        </button>
      )}
      {["RUNNING", "RESTARTING", "STARTING"].includes(status) && (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleButtonClick(`vps/server/${vpsId}/stop`, "POST")}
        >
          Остановить
        </button>
      )}
      <button
        className="btn btn-danger btn-sm mx-2"
        onClick={() => handleButtonClick(`vps/server/${vpsId}/remove`, "POST")}
      >
        Удалить сервер
      </button>
    </>
  );
};

export default ServerControlButtons;
