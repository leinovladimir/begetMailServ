"use client";

import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "@/app/TockenContext";

function TokenSaver() {
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const savedToken = localStorage.getItem("beget_jwtToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [token]);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const saveToken = () => {
    localStorage.setItem("beget_jwtToken", token);
  };

  const deleteToken = () => {
    localStorage.removeItem("beget_jwtToken");
    setToken("");
  };

  return (
    <>
      {token && (
        <div>
          <div className="text-muted">
            Текущий токен: ****{token.slice(-6)}
            <button
              className="btn btn-sm btn-danger mx-3"
              onClick={deleteToken}
            >
              Удалить токен
            </button>
          </div>{" "}Í˛
        </div>
      )}
      {!token && (
        <div className="mb-3">
          <label htmlFor="exampleInputToken1" className="form-label">
            Вставьте токен для доступа к API
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputToken1"
            value={token}
            onChange={handleTokenChange}
          />
          {/* <button className="btn btn-success" onClick={saveToken}>
            Сохранить токен
          </button> */}
        </div>
      )}
    </>
  );
}

export default TokenSaver;
