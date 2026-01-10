import { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProductSection from "../components/dashboard/products/ProductSection";
import BrandSection from "../components/dashboard/brands/BrandSection";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("products");

  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return <ProductSection />;

      case "brands":
        return <BrandSection />;
      case "categories":
        return <div>Category Section Coming Soon...</div>;
      case "reviews":
        return <div>Review Section Coming Soon...</div>;
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
