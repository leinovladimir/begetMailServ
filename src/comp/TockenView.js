"use cleint";
import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "@/app/TockenContext";
import { VpsTable } from "@/comp/VpsList";
import ServerControlButtons from "@/comp/ServerControlButtons";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import Status from "@/comp/VpsStatus";

toastConfig({
  duration: 5000,
  theme: "dark",
  className: "custom-toast",
  clickClosable: true,
  position: "bottom-right",
  maxVisibleToasts: 10,
});

const TockenView = () => {
  const [vpsList, setVpsList] = useState([]);
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.beget.com/v1/vps/server/list",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // data.vps фильтруй по Slug которые содержат "robot"
        let robots = data.vps.filter((vps) => vps.slug.includes("robot"));
        setVpsList(robots);
      } catch (error) {
        toast("Токен неправильный");
        console.error("Error fetching server list:", error);
      }
    };

    const interval = setInterval(() => {
      if (token) {
        fetchData();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [token]);

  const handleButtonClick = async (apiMethod, method) => {
    console.log("Button clicked:", apiMethod);
    toast(`Выполняется действие с сервером (${apiMethod})`);
    try {
      const response = await fetch(`https://api.beget.com/v1/${apiMethod}`, {
        method: method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data.vps);
      setVpsList(data.vps);
      toast(`Действие с сервером (${apiMethod}) выполнено`, {
        className: "danger",
      });
    } catch (error) {
      toast("Ошибка выполнения действия с сервером");
      console.error("Error fetching server list:", error);
    }
  };

  const handleCreateButtonClick = async () => {
    try {
      let ransd7num = Math.floor(Math.random() * 10000000);
      let randomSlug = "Robot_" + ransd7num;
      toast(`Создание сервера (${randomSlug})`, { duration: 10000 });
      const response = await fetch("https://api.beget.com/v1/vps/server", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: randomSlug,
          hostname: "robot-creator-6",
          slug: randomSlug,
          description:
            "VPS for robotic applications development using snapshot robot_v6_19_04_2024",
          configuration_id: "simple_v4",
          configuration_params: {
            cpu_count: 1,
            disk_size: 10240,
            memory: 1024,
          },
          software: {
            id: 0,
            variable: {},
          },
          snapshot_id: "26022",
          ssh_keys: [14815, 14476],
          password: "StrongP@ss1!",
          beget_ssh_access_allowed: true,
          private_networks: [],
          link_slug: randomSlug,
          license_id: 0,
          region: "ru1",
        }),
      });
      const data = await response.json();
      // мне нужен tost что задание создано

      console.log(data);
      // Handle the response data as needed
      toast(`Сервер (${randomSlug}) создан`);
    } catch (error) {
      toast(`Ошибка создания сервера ${randomSlug}`);
      console.error("Error creating server:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary my-5"
        onClick={() => handleCreateButtonClick()}
      >
        Создать новый сервер для заданий
      </button>
      {vpsList.length > 0 ? (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Название</th>
              <th>Статус</th>
              <th>IP Адресс</th>
              <th>Ссылка для входа</th>
            </tr>
          </thead>
          <tbody>
            {vpsList.map((vps) => (
              <tr key={vps.id}>
                <td>{vps.display_name}</td>
                <td><Status vpsStatus={vps.status} /> </td>
                <td>{vps.ip_address}</td>
                <td>
                  {vps.status === "RUNNING" && (
                    <a target="_blank" href={`http://${vps.ip_address}/login`}>
                      Login
                    </a>
                  )}
                </td>
                <td>
                  <ServerControlButtons
                    vpsId={vps.id}
                    status={vps.status}
                    handleButtonClick={handleButtonClick}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Серверов для заданий нет, нажмите кнопку "Создать новый сервер"</p>
      )}
    </div>
  );
};

export default TockenView;
