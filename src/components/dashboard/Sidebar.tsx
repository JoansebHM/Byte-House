import { useState } from "react";
import { Package, ChevronLeft, ChevronRight, Menu, Sun, Moon } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useSettings } from "../../context/SettingsContext";

interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({
    activeSection,
    setActiveSection,
    isCollapsed,
    setIsCollapsed,
}: SidebarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useSettings();

    const menuItems = [
        { id: "products", label: "PRODUCTOS", icon: Package },
        // Add more sections here
    ];

    return (
        <>
            {/* Mobile Header / Strip */}
            <div className="md:hidden w-full bg-white dark:bg-black border-b border-black dark:border-white p-4 flex justify-between items-center z-50 sticky top-0">
                <div className="font-bitcount font-bold text-xl text-black dark:text-white">
                    DASHBOARD
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-black dark:text-white"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[60px] left-0 w-full bg-white dark:bg-black border-b border-black dark:border-white z-40 flex flex-col p-4 shadow-xl animate-in slide-in-from-top-5">
                    <nav className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${activeSection === item.id
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-inconsolata font-bold">{item.label}</span>
                            </button>
                        ))}
                        <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                        <div className="flex items-center justify-between p-2">
                            <span className="font-inconsolata font-bold text-black dark:text-white">TEMA</span>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 border border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                        <LogoutButton />
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex flex-col border-r border-black dark:border-white bg-white dark:bg-black text-black dark:text-white transition-all duration-300 h-screen sticky top-0 ${isCollapsed ? "w-20" : "w-64"
                    }`}
            >
                <div className="p-4 flex items-center justify-between border-b border-black dark:border-white h-16">
                    {!isCollapsed && (
                        <span className="font-bitcount font-bold text-xl tracking-widest truncate">
                            BYTE HOUSE
                        </span>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors ${isCollapsed ? "mx-auto" : ""
                            }`}
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className={`flex-1 p-2 space-y-2 mt-4 ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto'}`}>
                    {menuItems.map((item) => (
                        <div key={item.id} className="relative group/item">
                            <button
                                onClick={() => setActiveSection(item.id)}
                                className={`flex items-center gap-3 p-3 rounded-md transition-colors w-full ${activeSection === item.id
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                    } ${isCollapsed ? "justify-center" : ""}`}
                            >
                                <item.icon size={20} />
                                {!isCollapsed && (
                                    <span className="font-inconsolata font-bold">{item.label}</span>
                                )}
                            </button>

                            {/* Hover Tooltip when collapsed */}
                            {isCollapsed && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold font-inconsolata rounded opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-xl border border-white dark:border-black">
                                    {item.label}
                                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-transparent border-r-black dark:border-r-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-2 border-t border-black dark:border-white space-y-2">
                    {!isCollapsed ? (
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center gap-3 p-3 w-full rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            <span className="font-inconsolata font-bold">
                                {darkMode ? "MODO CLARO" : "MODO OSCURO"}
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center justify-center p-3 w-full rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                            title={darkMode ? "Modo Claro" : "Modo Oscuro"}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}
                    <LogoutButton isCollapsed={isCollapsed} />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
