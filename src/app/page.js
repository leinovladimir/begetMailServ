"use client";
import React, { useContext, useEffect } from "react";
import TokenSaver from "@/comp/Tocken";
import TockenView from "@/comp/TockenView";
import { TokenContext } from "@/app/TockenContext";

export default function Home() {
  const { token } = useContext(TokenContext);

  return (
    <main className="container mt-5">
      <TokenSaver />
      {token ? <TockenView /> : <h1>Вставьте токен</h1>}
      {/* <TockenView /> */}
    </main>
  );
}
