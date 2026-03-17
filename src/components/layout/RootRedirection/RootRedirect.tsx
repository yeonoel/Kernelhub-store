import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/connection" replace />;
    }

    switch (user?.role) {
        case 'seller':
            return <Navigate to={`/dashboard/${user.slugStore}`} replace />;
        case 'super_admin':
            return <Navigate to="/admin" replace />;
        default:
            return <Navigate to="/connection" replace />;
    }
};

export default RootRedirect;