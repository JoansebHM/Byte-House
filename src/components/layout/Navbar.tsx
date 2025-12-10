import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useSettings();

    return (
        <nav className="border-b border-black dark:border-white px-40 py-4 sticky top-0 bg-white dark:bg-black z-30 flex justify-between items-center transition-colors duration-300">
            <div className="flex items-center gap-3 font-bold font-bitcount tracking-widest text-black dark:text-white">
                <img src="/logo-light.png" alt="BYTE HOUSE" className="h-10 w-auto dark:hidden" />
                <img src="/logo-dark.png" alt="BYTE HOUSE" className="h-10 w-auto hidden dark:block" />
                <span className="font-semibold">BYTE HOUSE</span>
            </div>
            <div className="flex items-center gap-6 font-bold text-sm md:text-base text-black dark:text-white">
                <Link to="/" className="hover:underline">
                    INICIO
                </Link>
                <Link to="/about" className="hover:underline">
                    NOSOTROS
                </Link>
                <Link to="/contact" className="hover:underline">
                    CONTACTO
                </Link>
                <Link to="/faq" className="hover:underline">
                    PREGUNTAS
                </Link>
                <button
                    onClick={toggleDarkMode}
                    className="p-1 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    aria-label="Toggle Dark Mode"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
