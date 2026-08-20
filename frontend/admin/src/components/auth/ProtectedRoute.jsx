import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

    const accessToken = localStorage.getItem("admin_access");

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;