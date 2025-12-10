import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface SettingsContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    // Inicializar con la preferencia del sistema o true por defecto si se prefiere
    const [darkMode, setDarkMode] = useState(false);

    // Aplicar la clase "dark" al html/body cuando cambie el estado
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <SettingsContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
