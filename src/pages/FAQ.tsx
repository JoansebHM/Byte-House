import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/UI/FloatingWhatsApp";
import { FAQS } from "../data/mockData";
import { Plus } from "lucide-react";

const FAQ = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-inconsolata flex flex-col transition-colors duration-300">
            <Navbar />
            <FloatingWhatsApp />

            <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-light font-bitcount mb-16 text-center tracking-widest uppercase">
                    Preguntas Frecuentes
                </h1>

                <div className="space-y-6">
                    {FAQS.map((faq, index) => (
                        <details
                            key={index}
                            className="group border border-black dark:border-white bg-transparent open:bg-gray-50 dark:open:bg-gray-900 duration-300"
                        >
                            <summary className="flex cursor-pointer items-center justify-between p-6 list-none font-bold text-lg md:text-xl select-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                                <span>{faq.question}</span>
                                <Plus
                                    className="transition-transform duration-300 group-open:rotate-45"
                                    size={24}
                                />
                            </summary>
                            <div className="p-6 pt-2 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 border-t border-black dark:border-white opacity-0 group-open:opacity-100 transition-opacity duration-500 delay-100">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQ;
