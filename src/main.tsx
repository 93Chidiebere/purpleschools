import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Automatically reload page when a dynamic chunk fails to load due to a new Vercel deployment
window.addEventListener("vite:preloadError", () => {
  window.location.reload();
});

window.addEventListener("error", (e) => {
  if (e.message && (e.message.includes("Failed to fetch dynamically imported module") || e.message.includes("dynamically imported module"))) {
    window.location.reload();
  }
}, true);

createRoot(document.getElementById("root")!).render(<App />);
