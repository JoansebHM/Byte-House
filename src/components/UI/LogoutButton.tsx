import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { supabase } from "../../supabase/supabase";

interface LogoutButtonProps {
  isCollapsed?: boolean;
  className?: string;
}

const LogoutButton = ({ isCollapsed, className = "" }: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`cursor-pointer flex items-center gap-3 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg w-full ${
        isCollapsed ? "justify-center" : ""
      } ${className}`}
      title="Cerrar Sesión"
    >
      <LogOut size={20} />
      {!isCollapsed && (
        <span className="font-bold font-inconsolata">CERRAR SESIÓN</span>
      )}
    </button>
  );
};

export default LogoutButton;
