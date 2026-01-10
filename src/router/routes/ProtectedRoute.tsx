import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { toast } from "react-hot-toast";

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const isAuth = !!data.session;
      setAuthenticated(isAuth);
      setLoading(false);

      if (!isAuth) {
        toast.error("Primero debe iniciar sesión");
      }
    });
  }, [location.pathname]);

  if (loading) return null;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
