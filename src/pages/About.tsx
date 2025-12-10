import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata p-4 md:p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 mb-12 hover:underline"
                >
                    <ArrowLeft size={20} />
                    VOLVER
                </button>

                <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">
                    SOBRE NOSOTROS
                </h1>

                <div className="space-y-8 text-lg md:text-xl leading-relaxed border-l-4 border-black dark:border-white pl-6 md:pl-12">
                    <p>
                        En <span className="font-bold">BYTE HOUSE</span>, no solo vendemos
                        tecnología; curamos herramientas para creadores, gamers y
                        profesionales que exigen excelencia.
                    </p>
                    <p>
                        Nuestra estética minimalista y brutalista refleja nuestra filosofía:
                        sin distracciones, solo rendimiento puro. Cada producto en nuestro
                        catálogo ha sido seleccionado manualmente por su calidad de
                        construcción y especificaciones técnicas.
                    </p>
                    <p>
                        Somos una tienda local con visión global, comprometidos con el
                        soporte directo y personalizado. Cuando nos contactas, hablas con un
                        experto, no con un bot.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-2">CALIDAD</h3>
                        <p>Solo las mejores marcas y componentes probados.</p>
                    </div>
                    <div className="p-6 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-2">DISEÑO</h3>
                        <p>Estética superior para tu setup.</p>
                    </div>
                    <div className="p-6 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                        <h3 className="text-2xl font-bold mb-2">SOPORTE</h3>
                        <p>Asistencia técnica dedicada post-venta.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
