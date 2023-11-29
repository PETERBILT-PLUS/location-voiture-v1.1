import { Outlet } from "react-router-dom"
import { useAdminMutation } from "../Configuration/api";

function VerifyAdmin() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default VerifyAdmin;