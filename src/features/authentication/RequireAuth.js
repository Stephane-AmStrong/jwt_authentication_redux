import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginPayload } from "./authenticationSlice";



export default function RequireAuth(props) {
    const token = useSelector(selectLoginPayload)
    const location = useLocation()


    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} />

        /*
        auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : auth?.user
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
        */
    )
}
