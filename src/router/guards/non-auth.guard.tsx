import React, {ReactElement} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

interface NonAuthGuardProps {
    element: ReactElement;
}

const NonAuthGuard: React.FC<NonAuthGuardProps> = ({element}) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        element
    );
};

export default NonAuthGuard;
