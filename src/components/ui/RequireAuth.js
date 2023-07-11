import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const authenticated = useSelector((state) => state.user.authenticated);
  const location = useLocation();

  return (
    <div>
      {authenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
}
