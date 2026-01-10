import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X, LogIn } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabase";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Verificar sesión de admin
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: "INICIO", path: "/" },
    { name: "NOSOTROS", path: "/about" },
    { name: "CONTACTO", path: "/contact" },
    { name: "PREGUNTAS", path: "/faq" },
    isAuthenticated
      ? { name: "DASHBOARD", path: "/dashboard", icon: <LogIn /> }
      : { name: "INGRESAR", path: "/login", icon: <LogIn /> },
  ];

  return (
    <nav className="border-b border-black dark:border-white px-6 md:px-40 py-4 sticky top-0 bg-white dark:bg-black z-30 flex justify-between items-center transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3 font-bold font-bitcount tracking-widest text-black dark:text-white z-50 relative">
        <img
          src="/logo-light.png"
          alt="BYTE HOUSE"
          className="h-8 md:h-10 w-auto dark:hidden"
        />
        <img
          src="/logo-dark.png"
          alt="BYTE HOUSE"
          className="h-8 md:h-10 w-auto hidden dark:block"
        />
        <span className="font-semibold text-lg md:text-xl">BYTE HOUSE</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 font-bold text-base text-black dark:text-white">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:underline flex items-center gap-1"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
            {link.icon}
          </Link>
        ))}

        <button
          onClick={toggleDarkMode}
          className="p-1 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-black dark:text-white z-50 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col justify-center items-center gap-8 text-black dark:text-white animate-in fade-in slide-in-from-top-10 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-2xl font-bold font-bitcount tracking-widest flex items-center gap-2 hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
              {link.icon}
            </Link>
          ))}

          <button
            onClick={toggleDarkMode}
            className="mt-4 p-4 border-2 border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={32} /> : <Moon size={32} />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
