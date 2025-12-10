import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
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
                    CONTACTO
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <p className="text-xl">
                            ¿Tienes alguna duda o proyecto en mente? Escríbenos.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 border border-black dark:border-white">
                                <Mail size={24} />
                                <span className="text-lg">info@bytehouse.com</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-black dark:border-white">
                                <Phone size={24} />
                                <span className="text-lg">+1 234 567 890</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-black dark:border-white">
                                <MapPin size={24} />
                                <span className="text-lg">Ciudad Tecnológica, Calle 1</span>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">NOMBRE</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">EMAIL</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">MENSAJE</label>
                            <textarea
                                rows={5}
                                className="w-full p-3 border border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-900 transition-colors"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white font-bold hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
                        >
                            ENVIAR MENSAJE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
