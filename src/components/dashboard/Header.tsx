import { User } from "lucide-react";

const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 border-b border-black dark:border-white bg-white dark:bg-black">
            <h1 className="text-2xl font-bold font-inconsolata text-black dark:text-white">
                PANEL DE CONTROL
            </h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <User size={18} className="text-black dark:text-white" />
                    <span className="font-bold font-inconsolata text-sm text-black dark:text-white">
                        Santi Bedoya
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
