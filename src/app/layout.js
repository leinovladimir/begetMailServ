import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "@/comp/BootstClient";
import TokenProvider from "./TockenContext.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <TokenProvider>
        <body>{children}</body>
        <BootstrapClient />
      </TokenProvider>
    </html>
  );
}
