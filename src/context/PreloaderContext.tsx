import { createContext, useContext, useState, type ReactNode } from "react";

interface PreloaderContextType {
    hasSeenPreloader: boolean;
    setHasSeenPreloader: (seen: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(
    undefined
);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
    const [hasSeenPreloader, setHasSeenPreloaderState] = useState(() => {
        return localStorage.getItem("hasSeenPreloader") === "true";
    });

    const setHasSeenPreloader = (seen: boolean) => {
        setHasSeenPreloaderState(seen);
        localStorage.setItem("hasSeenPreloader", String(seen));
    };

    return (
        <PreloaderContext.Provider
            value={{ hasSeenPreloader, setHasSeenPreloader }}
        >
            {children}
        </PreloaderContext.Provider>
    );
};

export const usePreloaderContext = () => {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error(
            "usePreloaderContext must be used within a PreloaderProvider"
        );
    }
    return context;
};
