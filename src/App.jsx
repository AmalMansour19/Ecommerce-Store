
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        return savedTheme === "dark";
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {
      // The app can still run if browser storage is unavailable.
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <AppRoutes
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </AuthProvider>
  );
}

export default App;
