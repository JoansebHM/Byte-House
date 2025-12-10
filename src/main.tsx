import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { PreloaderProvider } from "./context/PreloaderContext.tsx";
import { SettingsProvider } from "./context/SettingsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PreloaderProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </PreloaderProvider>
  </StrictMode>
);
