import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-inconsolata p-4">
      <div className="text-center flex flex-col items-center">
        <div className="mb-8 animate-in fade-in zoom-in duration-500">
          <img
            src="/logo-light.png"
            alt="BYTE HOUSE"
            className="h-32 md:h-48 w-auto dark:hidden"
          />
          <img
            src="/logo-dark.png"
            alt="BYTE HOUSE"
            className="h-32 md:h-48 w-auto hidden dark:block"
          />
        </div>

        <h1 className="text-8xl md:text-9xl font-seimbold font-bitcount tracking-widest mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-widest uppercase">
          Página no encontrada
        </h2>
        <p className="text-lg mb-12 max-w-md mx-auto opacity-80">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-8 py-4 border-2 border-black dark:border-white font-bold text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 uppercase tracking-widest"
        >
          <ArrowLeft size={24} />
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default NotFound;
