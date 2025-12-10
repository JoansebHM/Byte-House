import { Facebook, Instagram, ShieldIcon, X } from "lucide-react";
import Clock from "../UI/Clock";

const Footer = () => {
  return (
    <footer className="border-t border-black dark:border-white bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Info */}
        <div className="space-y-4">
          <h4 className="font-bold text-xl mb-4">BYTE HOUSE</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Tu destino premium para hardware de alto rendimiento. Calidad
            obsesiva, diseño brutalista.
          </p>
          <div className="flex items-center gap-2 font-bold border border-black dark:border-white p-2 w-fit">
            <ShieldIcon /> PAGOS SEGUROS
          </div>
        </div>

        {/* Column 2: Hours & Contact */}
        <div className="space-y-4">
          <h4 className="font-bold text-xl mb-4">HORARIOS</h4>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
              <span>LUN - VIE</span>
              <span>9:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
              <span>SABADO</span>
              <span>10:00 AM - 4:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
              <span>DOMINGO</span>
              <span>CERRADO</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Live Clock & Socials */}
        <div className="space-y-6 flex flex-col items-start md:items-end">
          <Clock />
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <Facebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <Instagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              <X />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center">
        <p className="font-inconsolata text-xs text-gray-500">
          © {new Date().getFullYear()} BYTE HOUSE. TODOS LOS DERECHOS
          RESERVADOS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
