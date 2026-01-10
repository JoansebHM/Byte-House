import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProductSection from "../components/dashboard/ProductSection";

function Dashboard() {
    const [activeSection, setActiveSection] = useState("products");

    const renderContent = () => {
        switch (activeSection) {
            case "products":
                return <ProductSection />;
            default:
                return <ProductSection />;
        }
    };

    return (
        <DashboardLayout
            activeSection={activeSection}
            setActiveSection={setActiveSection}
        >
            {renderContent()}
        </DashboardLayout>
    );
}

export default Dashboard;

