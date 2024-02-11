import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function SecurePath() {
    const currentUser = useSelector((state) => state.user.user.currentUser);
    return (
        <>
            {currentUser ? <Outlet /> : <Navigate to="/login"/>}
        </>
    );
}

export default SecurePath;