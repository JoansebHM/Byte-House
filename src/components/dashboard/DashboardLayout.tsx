import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const DashboardLayout = ({ children, activeSection, setActiveSection }: DashboardLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col md:flex-row font-inconsolata">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
                <div className="hidden md:block">
                    <Header />
                </div>
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
