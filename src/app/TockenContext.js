"use client";
import React, { createContext, useState, useContext } from "react";

export const TokenContext = createContext();

export default function TokenProvider({ children }) {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

// 4. Используйте useContext в любом месте вашего приложения, где вам нужен доступ к токену
